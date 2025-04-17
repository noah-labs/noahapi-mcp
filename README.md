# @outblock/flow-mcp

Flow blockchain tools for Model Context Protocol (MCP). This package provides a set of tools for interacting with the Flow blockchain through the Model Context Protocol.

## Features

- Get FLOW balance for any address
- Get token balance for any Flow token
- Get COA account information
- Get contract source code
- Get detailed account information including storage stats

## Installation

```bash
# Using npm
npm install @outblock/flow-mcp

# Using bun
bun add @outblock/flow-mcp
```

## MCP Configuration

To use this tool with Claude, add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "flow": {
      "command": "npx",
      "args": ["-y", "@outblock/flow-mcp"]
    }
  }
}
```

You can find your MCP configuration at:
- macOS: `~/Library/Application Support/Claude/mcp.json`
- Windows: `%APPDATA%/Claude/mcp.json`
- Linux: `~/.config/Claude/mcp.json`

After adding the configuration, restart Claude to load the new MCP server.

## Usage

This package provides a CLI tool and can be used as a library:

### As CLI

```bash
# Get FLOW balance
flow-mcp mcp_flow_mcp_get_flow_balance --address 0xf233dcee88fe0abe

# Get account info
flow-mcp mcp_flow_mcp_get_account_info --address 0xf233dcee88fe0abe

# Get contract source
flow-mcp mcp_flow_mcp_get_contract --address 0xf233dcee88fe0abe --contractName FungibleToken
```

### As Library

```typescript
import { createTools } from '@outblock/flow-mcp';

const tools = createTools();

// Get FLOW balance
const flowBalanceTool = tools.find(t => t.name === 'mcp_flow_mcp_get_flow_balance');
const balance = await flowBalanceTool.handler({ address: '0xf233dcee88fe0abe' });

// Get account info
const accountInfoTool = tools.find(t => t.name === 'mcp_flow_mcp_get_account_info');
const info = await accountInfoTool.handler({ address: '0xf233dcee88fe0abe' });

// Get contract source
const getContractTool = tools.find(t => t.name === 'mcp_flow_mcp_get_contract');
const contract = await getContractTool.handler({
  address: '0xf233dcee88fe0abe',
  contractName: 'FungibleToken'
});
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build
bun run build

# Lint
bun run lint
```

## License

MIT License - see LICENSE for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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
