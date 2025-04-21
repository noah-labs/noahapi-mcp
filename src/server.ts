import { FastMCP } from "fastmcp";
import { createTools } from "./tools";

export function createServer() {
  // Initialize server
  const server = new FastMCP({
    name: "flow-mcp",
    version: "0.1.0",
  });

  // Register all tools
  const tools = createTools();
  for (const tool of tools) {
    server.addTool({
      name: tool.name,
      description: tool.description,
      parameters: tool.inputSchema,
      execute: async (args, context) => {
        const result = await tool.handler(args);
        if (typeof result.content[0].text === "string") {
          return result.content[0].text;
        }
        return JSON.stringify(result.content[0].text);
      },
    });
  }
  return server;
}

export function startServer(server: FastMCP, useSSE: boolean) {
  if (useSSE) {
    server.start({
      transportType: "sse",
      sse: {
        endpoint: "/sse",
        port: 8080,
      },
    });
  } else {
    server.start({
      transportType: "stdio",
    });
  }
}
