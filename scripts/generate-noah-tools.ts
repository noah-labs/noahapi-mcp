#!/usr/bin/env bun

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

interface OpenAPISpec {
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, any>;
  };
}

interface Parameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'body';
  required?: boolean;
  schema: any;
  description?: string;
}

interface Endpoint {
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: any;
  responses: Record<string, any>;
  tags?: string[];
}

function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}

function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function sanitizeToolName(path: string, method: string): string {
  // Remove path parameters and clean up the path
  const cleanPath = path
    .replace(/\{[^}]+\}/g, '') // Remove path parameters like {CustomerID}
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(/\/+/g, '-') // Replace slashes with dashes
    .replace(/[^a-zA-Z0-9-]/g, '') // Remove special characters
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  return `${method}-${cleanPath}`.toLowerCase();
}

function escapeDescription(desc: string): string {
  return desc
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

function generateZodSchema(schema: any, components?: Record<string, any>): string {
  if (!schema) return 'z.unknown()';

  // Handle $ref
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    if (components && components[refName]) {
      return generateZodSchema(components[refName], components);
    }
    return 'z.string()'; // fallback
  }

  switch (schema.type) {
    case 'string':
      if (schema.enum) {
        const enumValues = schema.enum.map((v: string) => `"${v}"`).join(', ');
        return `z.enum([${enumValues}])`;
      }
      return 'z.string()';
    case 'number':
    case 'integer':
      return 'z.number()';
    case 'boolean':
      return 'z.boolean()';
    case 'array':
      const itemSchema = generateZodSchema(schema.items, components);
      return `z.array(${itemSchema})`;
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([key, prop]: [string, any]) => {
            const propSchema = generateZodSchema(prop, components);
            const isRequired = schema.required?.includes(key);
            const optional = isRequired ? '' : '.optional()';
            const description = prop.description ? `.describe("${escapeDescription(prop.description)}")` : '';
            return `  ${key}: ${propSchema}${optional}${description}`;
          })
          .join(',\n');
        return `z.object({\n${props}\n})`;
      }
      return 'z.record(z.unknown())';
    default:
      return 'z.unknown()';
  }
}

function generateParameterSchema(parameters: Parameter[], components?: Record<string, any>): string {
  if (!parameters || parameters.length === 0) {
    return 'z.object({})';
  }

  const props = parameters
    .filter(param => param.in !== 'header') // Skip headers like Api-Signature
    .map(param => {
      const zodSchema = generateZodSchema(param.schema, components);
      const optional = param.required ? '' : '.optional()';
      const description = param.description ? `.describe("${escapeDescription(param.description)}")` : '';
      return `  ${param.name}: ${zodSchema}${optional}${description}`;
    })
    .join(',\n');

  return `z.object({\n${props}\n})`;
}

function generateRequestBodySchema(requestBody: any, components?: Record<string, any>): string {
  if (!requestBody?.content?.['application/json']?.schema) {
    return '';
  }

  const schema = requestBody.content['application/json'].schema;
  return generateZodSchema(schema, components);
}

function generateToolFile(endpoint: Endpoint, spec: OpenAPISpec): { schemaContent: string; indexContent: string; toolName: string } {
  const toolName = sanitizeToolName(endpoint.path, endpoint.method);
  const pascalToolName = toPascalCase(toolName);
  
  // Generate parameter schema
  const paramSchema = generateParameterSchema(endpoint.parameters || [], spec.components?.schemas);
  
  // Generate request body schema if present
  const requestBodySchema = endpoint.requestBody 
    ? generateRequestBodySchema(endpoint.requestBody, spec.components?.schemas)
    : '';

  // Combine parameter and body schemas
  let combinedSchema = paramSchema;
  if (requestBodySchema && requestBodySchema !== 'z.object({})') {
    // If we have both parameters and request body, merge them
    if (paramSchema !== 'z.object({})') {
      // Extract the properties from paramSchema (remove z.object({ and })
      const paramProps = paramSchema.slice(10, -2); // Remove 'z.object({\n' and '\n})'
      // Extract the properties from requestBodySchema
      const bodyProps = requestBodySchema.slice(10, -2); // Remove 'z.object({\n' and '\n})'
      
      if (paramProps.trim() && bodyProps.trim()) {
        combinedSchema = `z.object({\n${paramProps},\n${bodyProps}\n})`;
      } else if (bodyProps.trim()) {
        combinedSchema = requestBodySchema;
      } else {
        combinedSchema = paramSchema;
      }
    } else {
      combinedSchema = requestBodySchema;
    }
  }

  const schemaContent = `import { z } from "zod";

export const ${toCamelCase(toolName)}Schema = ${combinedSchema};

export type ${pascalToolName}Schema = z.infer<typeof ${toCamelCase(toolName)}Schema>;
`;

  const cleanDescription = (desc: string) => {
    return desc
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/`/g, '')
      .replace(/\*/g, '')
      .trim();
  };

  const toolDescription = cleanDescription(endpoint.description || endpoint.summary || `${endpoint.method.toUpperCase()} ${endpoint.path}`);
  const functionComment = cleanDescription(endpoint.summary || endpoint.description || `${endpoint.method.toUpperCase()} ${endpoint.path}`);

  // Generate the main tool file
  const indexContent = `import type { ToolRegistration } from "@/types/tools";
import { type ${pascalToolName}Schema, ${toCamelCase(toolName)}Schema } from "./schema";

/**
 * ${functionComment}
 */
export const ${toCamelCase(toolName)} = async (args: ${pascalToolName}Schema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: ${endpoint.method.toUpperCase()}
  // Path: ${endpoint.path}
  
  console.log('Noah API call:', { method: '${endpoint.method.toUpperCase()}', path: '${endpoint.path}', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "${endpoint.method.toUpperCase()} ${endpoint.path}",
    args
  });
};

export const ${toCamelCase(toolName)}Tool: ToolRegistration<${pascalToolName}Schema> = {
  name: "${toolName.replace(/-/g, '_')}",
  description: "${toolDescription}",
  inputSchema: ${toCamelCase(toolName)}Schema,
  handler: async (args: ${pascalToolName}Schema) => {
    try {
      const parsedArgs = ${toCamelCase(toolName)}Schema.parse(args);
      const result = await ${toCamelCase(toolName)}(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in ${toCamelCase(toolName)}Tool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: \`Error: \${(error as Error).message}\`,
          },
        ],
        isError: true,
      };
    }
  },
};
`;

  return { schemaContent, indexContent, toolName };
}

function main() {
  const specPath = join(process.cwd(), 'noah-business-api.generated.json');
  const toolsDir = join(process.cwd(), 'src', 'tools', 'noah');
  
  // Read the OpenAPI spec
  const specContent = readFileSync(specPath, 'utf-8');
  const spec: OpenAPISpec = JSON.parse(specContent);
  
  // Create noah tools directory
  if (!existsSync(toolsDir)) {
    mkdirSync(toolsDir, { recursive: true });
  }
  
  const endpoints: Endpoint[] = [];
  const toolNames: string[] = [];
  
  // Parse all endpoints
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, details] of Object.entries(methods)) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
        endpoints.push({
          path,
          method: method.toLowerCase(),
          ...details
        });
      }
    }
  }
  
  console.log(`Found ${endpoints.length} endpoints to generate tools for`);
  
  // Generate tools for each endpoint
  for (const endpoint of endpoints) {
    const { schemaContent, indexContent, toolName } = generateToolFile(endpoint, spec);
    
    // Create directory for this tool
    const toolDir = join(toolsDir, toolName);
    if (!existsSync(toolDir)) {
      mkdirSync(toolDir, { recursive: true });
    }
    
    // Write schema file
    writeFileSync(join(toolDir, 'schema.ts'), schemaContent);
    
    // Write index file
    writeFileSync(join(toolDir, 'index.ts'), indexContent);
    
    toolNames.push(toolName);
    console.log(`Generated tool: ${toolName}`);
  }
  
  // Generate index file for all Noah tools
  const imports = toolNames.map(name => 
    `import { ${toCamelCase(name)}Tool } from "./${name}/index.js";`
  ).join('\n');
  
  const exports = toolNames.map(name => `  ${toCamelCase(name)}Tool`).join(',\n');
  
  const indexFileContent = `${imports}
import type { ToolRegistration } from "../../types/tools.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createNoahTools = (): ToolRegistration<any>[] => {
  return [
${exports}
  ];
};

export default createNoahTools;
`;
  
  writeFileSync(join(toolsDir, 'index.ts'), indexFileContent);
  
  console.log(`\nGenerated ${toolNames.length} Noah Business API tools in ${toolsDir}`);
  console.log('Tools generated:', toolNames.join(', '));
}

if (import.meta.main) {
  main();
}