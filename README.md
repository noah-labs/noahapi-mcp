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

## Configuration

Before using the Noah Business API tools, you need to configure your API credentials:

### Environment Variables

Set the following environment variables:

```bash
# Required: Your Noah Business API key
export NOAH_API_KEY="your-api-key-here"

# Optional: API base URL (defaults to sandbox)
export NOAH_API_BASE_URL="https://sandbox-api.noah.com"

# Optional: Environment (defaults to sandbox)
export NOAH_ENVIRONMENT="sandbox"  # or "production"
```

### Getting API Credentials

1. Sign up for a Noah Business account at [Noah Business Portal](https://business.noah.com)
2. Navigate to API Settings in your dashboard
3. Generate an API key for your application
4. For development, use the sandbox environment
5. For production, switch to the production environment and use production API keys

### MCP Configuration with Environment Variables

To use this tool with Claude, add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "noah": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "your-api-key-here",
        "NOAH_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

## MCP Configuration

You can find your MCP configuration at:

- macOS: `~/Library/Application Support/Claude/mcp.json`
- Windows: `%APPDATA%/Claude/mcp.json`
- Linux: `~/.config/Claude/mcp.json`

After adding the configuration, restart Claude to load the new MCP server.

## Tools

This package includes a comprehensive set of tools for interacting with the Noah Business API:

### Balance Management
- **get_balances**: Get account balances for all supported cryptocurrencies

### Customer Management
- **get_customers**: Retrieve customer details by ID
- **put_customers**: Create or update customer records
- **post_customers_hosted_onboarding**: Create hosted onboarding sessions
- **get_internal_customers_onboarding**: Get customer onboarding details

### Payment Methods
- **get_payment_methods**: List customer payment methods
- **get_internal_fiat_payment_methods**: Get internal payment methods
- **post_internal_fiat_payment_methods**: Create new payment methods
- **delete_internal_fiat_payment_methods**: Remove payment methods

### Transactions
- **post_transactions_sell**: Create sell transactions
- **post_transactions_sell_prepare**: Prepare sell transactions
- **get_transactions**: Get transaction details by ID

### Channels
- **get_channels_sell**: Query supported sell channels
- **get_channels_sell_countries**: Get supported countries
- **get_channels_form**: Get dynamic forms for payment methods

### Pricing
- **get_prices**: Get real-time pricing information
- **get_internal_prices**: Get internal pricing data

### Workflows
- **post_workflows_bank_deposit_to_onchain_address**: Set up bank-to-crypto workflows
- **post_hosted_workflows_bank_deposit_to_onchain_address**: Create hosted workflow sessions

### Checkout Sessions
- **post_checkout_payin_fiat**: Create fiat payment sessions
- **post_checkout_payin_crypto**: Create crypto payment sessions
- **post_checkout_payout_fiat**: Create fiat payout sessions
- **post_checkout_manage**: Create payment method management sessions

## Usage Examples

### Get Account Balances

```typescript
// This will be called through Claude/MCP
{
  "tool": "get_balances",
  "arguments": {
    "PageSize": 10
  }
}
```

### Create a Customer

```typescript
{
  "tool": "put_customers", 
  "arguments": {
    "CustomerID": "customer-123",
    "body": {
      "Type": "Individual",
      "FullName": {
        "FirstName": "John",
        "LastName": "Doe"
      },
      "DateOfBirth": "1990-01-01",
      "Email": "john@example.com"
    }
  }
}
```

### Get Pricing Information

```typescript
{
  "tool": "get_prices",
  "arguments": {
    "SourceCurrency": "USD",
    "DestinationCurrency": "BTC",
    "SourceAmount": "100"
  }
}
```

## 📂 Project Structure

```text
noah-business-api-mcp/
├── src/
│   ├── tools/          # MCP tools implementation
│   │   └── noah/       # Noah Business API tools
│   ├── utils/          # Utility functions
│   │   ├── noah-client.ts  # HTTP client for Noah API
│   │   └── config.ts   # Configuration management
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
         "args": ["/path/to/your/project/dist/index.js"],
         "env": {
           "NOAH_API_KEY": "your-dev-api-key",
           "NOAH_ENVIRONMENT": "sandbox"
         }
       }
     }
   }
   ```

### Implementing New Tools

The project includes auto-generated tools based on the Noah Business API OpenAPI specification. To add a new tool:

1. Run the generator script:
   ```bash
   bun run scripts/generate-noah-tools.ts
   ```

2. Implement the actual API call in the generated tool file by replacing the placeholder with a real API call using the `noahClient`.

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

## Security

- Never commit API keys to version control
- Use environment variables for all sensitive configuration
- Use sandbox environment for development and testing
- Rotate API keys regularly

## License

MIT License - see LICENSE for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
