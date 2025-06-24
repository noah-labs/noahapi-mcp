# Noah Business API MCP Server Configuration Guide

This guide shows you how to set up the Noah Business API MCP server for use with Claude Desktop and other MCP clients.

## Prerequisites

- Node.js 20+ installed
- Claude Desktop app (for Claude integration)
- Noah Business API account and API key

## Getting Your Noah API Key

1. **Sign up for Noah Business**: Visit [Noah Business Portal](https://business.noah.com) and create an account
2. **Complete verification**: Follow the KYC/verification process
3. **Generate API Key**: In your dashboard, navigate to "API Settings" and create a new API key
4. **Environment Selection**: 
   - Use **sandbox** for development and testing
   - Use **production** for live transactions

## Installation Methods

### Method 1: NPM Package (Recommended)

Add the following to your Claude Desktop configuration:

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

### Method 2: Local Development

For development or when building from source:

```json
{
  "mcpServers": {
    "noah-dev": {
      "command": "node",
      "args": ["/path/to/noah-business-api-mcp/dist/index.js"],
      "env": {
        "NOAH_API_KEY": "your-api-key-here",
        "NOAH_API_BASE_URL": "https://api.sandbox.noah.com/v1",
        "NOAH_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

## Configuration File Locations

Your MCP configuration file should be located at:

- **macOS**: `~/Library/Application Support/Claude/mcp_settings.json`
- **Windows**: `%APPDATA%/Claude/mcp_settings.json`
- **Linux**: `~/.config/Claude/mcp_settings.json`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NOAH_API_KEY` | ✅ Yes | - | Your Noah Business API key |
| `NOAH_ENVIRONMENT` | ❌ No | `sandbox` | Environment: `sandbox` or `production` |
| `NOAH_API_BASE_URL` | ❌ No | Auto-detected | API base URL (usually auto-configured) |

## Complete Configuration Examples

### Production Environment

```json
{
  "mcpServers": {
    "noah": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "apikey_prod_...",
        "NOAH_ENVIRONMENT": "production"
      }
    }
  }
}
```

### Sandbox Environment (Testing)

```json
{
  "mcpServers": {
    "noah": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "apikey_sandbox_...",
        "NOAH_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

### Multiple Environments

You can configure both sandbox and production:

```json
{
  "mcpServers": {
    "noah-sandbox": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "apikey_sandbox_...",
        "NOAH_ENVIRONMENT": "sandbox"
      }
    },
    "noah-production": {
      "command": "npx",
      "args": ["-y", "@outblock/noah-business-api-mcp"],
      "env": {
        "NOAH_API_KEY": "apikey_prod_...",
        "NOAH_ENVIRONMENT": "production"
      }
    }
  }
}
```

## Verifying Installation

After adding the configuration:

1. **Restart Claude Desktop** completely
2. **Check for the Noah tools** in Claude's interface
3. **Test basic functionality** by asking Claude to check your account balances

Example test prompt:
> "Can you check my Noah account balances?"

## Available Tools

Once configured, you'll have access to these Noah Business API tools:

### Core Operations
- **Balance Management**: `get_balances`
- **Customer Management**: `get_customers`, `put_customers`
- **Pricing**: `get_prices`, `get_internal_prices`
- **Transactions**: `get_transactions`, `post_transactions_sell`

### Payment Methods
- **Channels**: `get_channels_sell`, `get_channels_sell_countries`
- **Payment Methods**: `get_payment_methods`, `post_internal_fiat_payment_methods`

### Checkout & Workflows
- **Hosted Checkout**: `post_checkout_payin_fiat`, `post_checkout_payin_crypto`
- **Workflows**: `post_workflows_bank_deposit_to_onchain_address`

### Advanced Features
- **Forms**: `get_channels_form` (Dynamic payment method forms)
- **Onboarding**: `post_customers_hosted_onboarding`
- **Sandbox Testing**: `post_sandbox_fiat_deposit_simulate`

## Troubleshooting

### Common Issues

**1. "Command not found" errors**
- Ensure Node.js 20+ is installed
- Restart Claude Desktop after configuration changes

**2. "API key invalid" errors**
- Verify your API key is correct
- Check you're using the right environment (sandbox vs production)
- Ensure your Noah Business account is verified

**3. "No tools available" errors**
- Restart Claude Desktop completely
- Check the configuration file syntax
- Verify the file is in the correct location

**4. "Connection failed" errors**
- Check your internet connection
- Verify the API endpoints are accessible
- Try using sandbox environment first

### Debug Mode

For troubleshooting, you can run the server directly:

```bash
# Set environment variables
export NOAH_API_KEY="your-api-key"
export NOAH_ENVIRONMENT="sandbox"

# Run the server
npx @outblock/noah-business-api-mcp
```

### Getting Help

- **GitHub Issues**: [Noah Business API MCP Issues](https://github.com/outblock/noah-business-api-mcp/issues)
- **Noah Support**: Contact through your Noah Business portal
- **Documentation**: Refer to the [Noah Business API documentation](https://docs.noah.com)

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use sandbox for development** and testing
3. **Rotate API keys regularly** in production
4. **Monitor API usage** through the Noah Business dashboard
5. **Use different API keys** for different environments

## What's Next?

Once configured, you can:

- Ask Claude to check account balances
- Create and manage customers
- Get real-time pricing information
- Set up payment workflows
- Process transactions
- Manage payment methods

Example prompts to try:
- "What's my current BTC balance?"
- "Show me the latest pricing for USD to BTC"
- "Create a new customer record"
- "What payment channels are available for selling BTC?"

---

**Need help?** Check our [GitHub repository](https://github.com/outblock/noah-business-api-mcp) for more examples and documentation. 