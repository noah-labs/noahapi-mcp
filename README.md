# @outblock/noah-business-api-mcp

Noah Business API tools for Model Context Protocol (MCP). This package provides a set of tools for interacting with the Noah Business API through the Model Context Protocol.

<a href="https://glama.ai/mcp/servers/@Outblock/noah-business-api-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Outblock/noah-business-api-mcp/badge" alt="Noah Business API MCP server" />
</a>

## Features

- Complete Noah Business API integration
- Balance management
- Customer management
- Payment methods
- Transaction handling
- Channel management
- Pricing tools
- Workflow automation

## Installation

```bash
# Using npm
npm install @outblock/noah-business-api-mcp

# Using bun
bun add @outblock/noah-business-api-mcp
```

## MCP Configuration

To use this tool with Claude, add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "noah": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"]
    }
  }
}
```

You can find your MCP configuration at:

- macOS: `~/Library/Application Support/Claude/mcp.json`
- Windows: `%APPDATA%/Claude/mcp.json`
- Linux: `~/.config/Claude/mcp.json`

After adding the configuration, restart Claude to load the new MCP server.

## Tools

This package includes a comprehensive set of tools for interacting with the Noah Business API:

### Balance Management
- Get account balances

### Customer Management
- Create and update customers
- Customer onboarding
- KYC workflows

### Payment Methods
- Manage fiat payment methods
- Dynamic form generation

### Transactions
- Create buy/sell transactions
- Transaction history
- Transaction preparation

### Channels
- Query supported channels
- Get channel-specific forms

### Pricing
- Real-time pricing information
- Fee calculations

### Workflows
- Bank deposit to onchain address
- Automated rules

## 📂 Project Structure

```text
noah-business-api-mcp/
├── src/
│   ├── tools/          # MCP tools implementation
│   │   └── noah/       # Noah Business API tools
│   ├── types/          # Type definitions
│   └── bin/           # CLI implementation
├── biome.json         # Linting configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## 🛠️ Development

This project uses FastMCP for development and testing. FastMCP provides a streamlined development experience for MCP servers.

```bash
# Install dependencies
bun install

# Format code
bun run format

# Run tests
bun test

# Run development server
bun run dev

# Inspect the server
bun run inspect

# Build
bun run build
```

To add your development MCP server to Claude Desktop:

1. Build the project:

   ```bash
   bun run build
   ```

2. Add to your Claude Desktop config:

   ```json
   {
     "mcpServers": {
       "noah-dev": {
         "command": "node",
         "args": ["/path/to/your/project/dist/index.js"]
       }
     }
   }
   ```

### Commit Message Format

- `feat`: New feature (bumps minor version)
- `fix`: Bug fix (bumps patch version)
- `BREAKING CHANGE`: Breaking change (bumps major version)

## 📜 Version Management

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated version management. Run `bun run release` to create a new version.

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

## License

MIT License - see LICENSE for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
