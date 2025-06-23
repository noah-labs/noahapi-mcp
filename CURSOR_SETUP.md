# Noah Business API MCP - Cursor Setup Guide

This guide will help you connect the Noah Business API MCP server to Cursor.

## Prerequisites

1. **Noah Business API Access**: You need a valid Noah Business API key
2. **Node.js**: Version 20 or higher
3. **Cursor**: Latest version with MCP support

## Setup Steps

### 1. Build the MCP Server

First, build the MCP server:

```bash
npm install
npm run build
```

### 2. Configure Cursor MCP Settings

Open Cursor and go to Settings (Ctrl/Cmd + ,), then search for "MCP" or navigate to the MCP section.

Add the following configuration to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "noah-business-api": {
      "command": "node",
      "args": ["/path/to/your/noahapi-mcp/dist/index.js"],
      "env": {
        "NOAH_API_KEY": "your_actual_noah_api_key_here",
        "NOAH_API_URL": "https://api.noah.com"
      }
    }
  }
}
```

**Important**: Replace `/path/to/your/noahapi-mcp` with the actual path to your project directory.

### 3. Environment Variables

Set the following environment variables:

- `NOAH_API_KEY`: Your Noah Business API key (required)
- `NOAH_API_URL`: Noah API base URL (defaults to https://api.noah.com)

### 4. Restart Cursor

After adding the MCP configuration, restart Cursor to load the new MCP server.

## Available Tools

Once connected, you'll have access to all Noah Business API endpoints as MCP tools:

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

## Usage Examples

### Get Account Balances
```
Use the get_balances tool to retrieve all balances for the Business User's account.
```

### Create a Customer
```
Use the post_customers_hosted_onboarding tool to create a new customer with hosted onboarding.
```

### Process a Crypto Payment
```
Use the post_checkout_payin_crypto tool to process a cryptocurrency payment.
```

## Troubleshooting

### Common Issues

1. **"NOAH_API_KEY environment variable is required"**
   - Make sure you've set the `NOAH_API_KEY` environment variable in your MCP configuration

2. **"Cannot find module" errors**
   - Run `npm install` and `npm run build` to ensure all dependencies are installed

3. **MCP server not loading**
   - Check that the path in your MCP configuration is correct
   - Ensure the `dist/index.js` file exists after building

4. **API errors**
   - Verify your Noah API key is valid
   - Check that you're using the correct API URL

### Debug Mode

To run the MCP server in debug mode, you can start it manually:

```bash
cd noahapi-mcp
npm run build
node dist/index.js
```

This will start the server in stdio mode, which you can use for debugging.

## Development

### Adding New Tools

To add new Noah API endpoints as MCP tools:

1. Create a new directory in `src/tools/noah/`
2. Add `index.ts` and `schema.ts` files
3. Follow the existing pattern for tool implementation
4. Add the tool to `src/tools/noah/index.ts`
5. Rebuild the project

### Testing

Test your MCP server locally:

```bash
npm run build
node dist/index.js
```

## Support

For issues with:
- **Noah Business API**: Contact Noah support
- **MCP Server**: Check the project repository
- **Cursor Integration**: Check Cursor documentation

## License

MIT License - see LICENSE file for details. 