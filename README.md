# @noah-labs/noah-business-api-mcp

Noah Business API tools for Model Context Protocol (MCP). This package provides MCP tools for interacting with the Noah Business API.

## Prerequisites

- Business API key obtained from the Noah Business Dashboard
- This is a business-only API for onboarded businesses

## MCP Configuration

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "noah": {
      "command": "npx", // or bunx
      "args": ["@noah-labs/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "your-api-key-here",
      }
    }
  }
}
```

### Environment variables

#### Required

- `NOAH_API_KEY`: API key created in the dashboard.

#### Optional

- `NOAH_ENVIRONMENT`: Possible values: `sandbox`, `production` (default: `sandbox`).
- `NOAH_API_BASE_URL`: Base path of the API, e.g., `https://api.sandbox.noah.com/v1`.


### Configuration File Locations

- **Claude Desktop**: `~/Library/Application Support/Claude/mcp.json` (macOS)
- **Cursor**: Configure in your IDE's MCP settings
- **Other IDEs**: Refer to your IDE's MCP documentation


### Example prompts

Create a customer onboarding session for `cust1234`, with return `https://example.com` for `USD` and `EUR`

Get payment details for customer `cust1234`

Show me ACH payout channels


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
