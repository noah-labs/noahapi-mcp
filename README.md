# @noah-labs/noah-business-api-mcp

Noah Business API tools for Model Context Protocol (MCP). This package provides MCP tools for interacting with the Noah Business API.

## Prerequisites

- Business API key obtained from the Noah Business Dashboard
- This is a business-only API for onboarded businesses

## Installation

```bash
bun add @noah-labs/noah-business-api-mcp
```

## Configuration

Set the following environment variables:

```bash
# Required: Your Noah Business API key
export NOAH_API_KEY="your-api-key-here"

# Required: Environment (sandbox or production)
export NOAH_ENVIRONMENT="sandbox"  # or "production"
```

## MCP Configuration

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "noah": {
      "command": "bunx",
      "args": ["@noah-labs/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "your-api-key-here",
        "NOAH_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

### Configuration File Locations

- **Claude Desktop**: `~/Library/Application Support/Claude/mcp.json` (macOS)
- **Cursor**: Configure in your IDE's MCP settings
- **Other IDEs**: Refer to your IDE's MCP documentation

After adding the configuration, restart your MCP client.

## Features

- Balance management
- Customer management  
- Payment methods
- Transaction handling
- Channel management
- Pricing tools
- Workflow automation
- Checkout sessions

## Development

```bash
# Install dependencies
bun install

# Format code
bun run format

# Build
bun run build

# Development server
bun run dev
```

## License

MIT License
