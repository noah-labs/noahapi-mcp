# Flow MCP

Flow blockchain tools for Model Context Protocol (MCP). This MCP server provides tools for interacting with the Flow blockchain, including:

- Flow balance checking
- Token balance querying
- COA (Cadence Owned Account) information retrieval

## Features

- Real-time Flow blockchain interaction
- Support for both mainnet and testnet
- Type-safe tool definitions using Zod
- Comprehensive test coverage
- Built with Bun for optimal performance

## Installation

```bash
# Using bun
bun install flow-mcp

# Using npm
npm install flow-mcp

# Using yarn
yarn add flow-mcp
```

## Usage

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { flowBalanceTool, tokenBalanceTool, coaAccountTool } from 'flow-mcp';

const server = new McpServer({
  name: "flow-mcp",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {
      flowBalanceTool,
      tokenBalanceTool,
      coaAccountTool
    }
  }
});

server.start();
```

## Available Tools

### Flow Balance Tool
Get the FLOW token balance for any Flow address:

```typescript
const result = await flowBalanceTool.handler({
  address: "0x1234...",
  network: "mainnet"
});
```

### Token Balance Tool
Get the balance of any fungible token for a Flow address:

```typescript
const result = await tokenBalanceTool.handler({
  address: "0x1234...",
  network: "mainnet",
  tokenIdentifier: "A.1654653399040a61.FlowToken.Vault"
});
```

### COA Account Tool
Get Cadence Owned Account information for a Flow address:

```typescript
const result = await coaAccountTool.handler({
  address: "0x1234...",
  network: "mainnet",
  include_evm_address: true
});
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build the project
bun run build

# Start the server
bun start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

## ✨ Key Features

- Bun for fast testing and development
- Biome for linting and formatting
- Automated version management with standard-version
- Clean, maintainable project structure

## 📂 Project Structure

```
mcp-starter/
├── src/
│   ├── tools/          # MCP tools implementation
│   ├── utils/          # Shared utilities
│   ├── main.ts         # Server entry point
│   └── types.ts        # Shared type definitions
├── tests/              # Test files
├── biome.json          # Linting configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## ⚙️ Configuration

### Creating New Tools

The project includes a script to help create new MCP tools:

```bash
bun run scripts/create-tool.ts <tool-name>
```

This will:
1. Create a new tool directory under `src/tools/<tool-name>`
2. Generate the basic tool structure including:
   - index.ts (main implementation)
   - schema.ts (JSON schema for tool parameters)
   - test.ts (test file)
3. Update the tools index file to export the new tool

Example:
```bash
bun run scripts/create-tool.ts weather
```

## 🛠️ Development

- **Run tests**: `bun test`
- **Format code**: `bun run format`
- **Lint code**: `bun run lint`
- **Build project**: `bun run build`

To add your development MCP server to Claude Desktop:

1. Build the project:
   ```bash
   bun run build
   ```
2. Add to your Claude Desktop config:
   ```json
   // You only need the argument if you need to pass arguments to your server
   {
     "mcpServers": {
       "your-server-name": {
         "command": "node",
         "args": ["/path/to/your/project/dist/main.js", "some_argument"]
       }
     }
   }
   ```

## 📜 Version Management

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated version management. Run `bun run release` to create a new version.

### Commit Message Format
- `feat`: New feature (bumps minor version)
- `fix`: Bug fix (bumps patch version)
- `BREAKING CHANGE`: Breaking change (bumps major version)

## 📦 Publishing to npm

1. Ensure you're logged in to npm:
   ```bash
   npm login
   ```
2. Build the project:
   ```bash
   bun run build
   ```
3. Publish the package:
   ```bash
   npm publish
   ```
Remember to update the version number using `bun run release` before publishing new versions.

## Installing from npm (after publishing)

Add to your Claude Desktop config:
```json
// You only need the argument if you need to pass arguments to your server
{
  "mcpServers": {
    "your-server-name": {
      "command": "npx",
      "args": ["-y", "your-package-name", "some_argument"]
    }
  }
}
