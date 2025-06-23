import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const TOOLS_DIR = join(process.cwd(), 'src', 'tools', 'noah');

function updateToolFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8');
  
  // Skip if already updated
  if (content.includes('getNoahApiClient')) {
    console.log(`Skipping ${filePath} - already updated`);
    return;
  }
  
  // Add import for Noah API client
  let updatedContent = content.replace(
    'import type { ToolRegistration } from "@/types/tools";',
    'import type { ToolRegistration } from "@/types/tools";\nimport { getNoahApiClient } from "@/utils/noah-api-client";'
  );
  
  // Replace placeholder implementation with actual API call
  const placeholderPattern = /export const \w+ = async \(args: \w+\): Promise<string> => \{[\s\S]*?\/\/ This is a placeholder implementation[\s\S]*?return JSON\.stringify\([\s\S]*?\};\n/;
  
  if (placeholderPattern.test(updatedContent)) {
    // Extract function name and schema type
    const functionMatch = updatedContent.match(/export const (\w+) = async/);
    const schemaMatch = updatedContent.match(/args: (\w+)\): Promise<string>/);
    
    if (functionMatch && schemaMatch) {
      const functionName = functionMatch[1];
      const schemaType = schemaMatch[1];
      
      // Extract path from comment
      const pathMatch = updatedContent.match(/\/\/ Path: ([^\n]+)/);
      const methodMatch = updatedContent.match(/\/\/ Method: ([^\n]+)/);
      
      if (pathMatch && methodMatch) {
        const path = pathMatch[1].trim();
        const method = methodMatch[1].trim();
        
        // Create new implementation
        const newImplementation = `export const ${functionName} = async (args: ${schemaType}): Promise<string> => {
  const client = getNoahApiClient();
  
  ${method === 'GET' ? 
    `const result = await client.get('${path}');` :
    method === 'POST' ?
    `const result = await client.post('${path}', args);` :
    method === 'PUT' ?
    `const result = await client.put('${path}', args);` :
    `const result = await client.delete('${path}');`
  }
  
  return JSON.stringify(result, null, 2);
};`;
        
        updatedContent = updatedContent.replace(placeholderPattern, newImplementation + '\n');
      }
    }
  }
  
  writeFileSync(filePath, updatedContent);
  console.log(`Updated ${filePath}`);
}

function processDirectory(dirPath: string): void {
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item === 'index.ts') {
      updateToolFile(fullPath);
    }
  }
}

console.log('Updating Noah tools to use actual API...');
processDirectory(TOOLS_DIR);
console.log('Done!'); 