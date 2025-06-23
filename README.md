# @outblock/noah-business-api-mcp

Noah Business API tools for Model Context Protocol (MCP). This package provides a set of tools for interacting with the Noah Business API through the Model Context Protocol.

## Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
quick-start.bat
```

**macOS/Linux:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

### Option 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Configure Cursor** (see [Cursor Setup Guide](CURSOR_SETUP.md))

## Features

- Customer management and onboarding
- Payment method management
- Transaction processing
- Price queries
- Checkout workflows
- Fiat payment processing
- Crypto payment processing

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
    "noah-business-api": {
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

### Customer Management

Manage customer information and onboarding:

```ts
{
  name: 'get_customers',
  input: {
    // Customer query parameters
  }
}
```

### Payment Methods

Manage payment methods:

```ts
{
  name: 'get_payment_methods',
  input: {
    // Payment method parameters
  }
}
```

### Transactions

Process and manage transactions:

```ts
{
  name: 'get_transactions',
  input: {
    // Transaction parameters
  }
}
```

### Checkout

Handle checkout workflows:

```ts
{
  name: 'post_checkout_payin_crypto',
  input: {
    // Checkout parameters
  }
}
```

## 📂 Project Structure

```text
noah-business-api-mcp/
├── src/
│   ├── tools/          # MCP tools implementation
│   │   └── noah/       # Noah Business API tools
│   ├── utils/          # Shared utilities
│   ├── prompts/        # MCP prompts
│   └── types/          # Type definitions
├── scripts/            # Build and utility scripts
├── biome.json         # Linting configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## 🛠️ Development

This project uses FastMCP for development and testing. FastMCP provides a streamlined development experience for MCP servers.

```bash
# Install dependencies
npm install

# Format code
npm run format

# Run tests
npm test

# Build
npm run build

# Start server
npm run start

# Start server with SSE
npm run start:sse

# Update tools (if API spec changes)
npm run update-tools
```

To add your development MCP server to Claude Desktop:

1. Build the project:

   ```bash
   npm run build
   ```

2. Add to your Claude Desktop config:

   ```json
   {
     "mcpServers": {
       "noah-business-api": {
         "command": "node",
         "args": ["/path/to/your/project/dist/index.js"]
       }
     }
   }
   ```

## Environment Variables

Set the following environment variables for Noah Business API access:

```bash
NOAH_API_KEY=your_api_key_here
NOAH_API_URL=https://api.noah.com
```

## Available Tools

The MCP server provides access to all Noah Business API endpoints:

### Customer Management
- `get_customers` - Retrieve customer details
- `post_customers_hosted_onboarding` - Create hosted onboarding session
- `put_customers` - Update customer information

### Payment Methods
- `get_payment_methods` - List payment methods
- `get_internal_fiat_payment_methods` - Get internal fiat payment methods
- `post_internal_fiat_payment_methods` - Create internal fiat payment method

### Transactions
- `get_transactions` - List transactions
- `post_transactions_sell` - Create sell transaction
- `post_transactions_sell_prepare` - Prepare sell transaction

### Checkout
- `post_checkout_payin_crypto` - Crypto payment checkout
- `post_checkout_payin_fiat` - Fiat payment checkout
- `post_checkout_payout_fiat` - Fiat payout checkout
- `post_checkout_manage` - Manage checkout

### Balances & Prices
- `get_balances` - Get account balances
- `get_prices` - Get current prices
- `get_internal_prices` - Get internal prices

### Workflows
- `post_workflows_bank_deposit_to_onchain_address` - Bank deposit workflow
- `post_hosted_workflows_bank_deposit_to_onchain_address` - Hosted bank deposit workflow

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support, please open an issue on GitHub or contact the Outblock team.

## Documentation

- [Cursor Setup Guide](CURSOR_SETUP.md) - Detailed setup instructions for Cursor
- [Noah Business API Documentation](https://docs.noah.com) - Official API documentation
