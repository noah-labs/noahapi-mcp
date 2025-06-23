# Noah Business API - Hosted Onboarding Runthrough

This guide walks you through the complete hosted onboarding process using the Noah Business API MCP tools.

## 🎯 Overview

The hosted onboarding process allows customers to complete their KYC (Know Your Customer) verification through a hosted interface provided by Noah. This eliminates the need to build your own onboarding forms and ensures compliance with regulatory requirements.

## 🛠️ Available Tools

### Core Onboarding Tools
- **`post_customers_hosted_onboarding`** - Create a hosted onboarding session for existing customers
- **`post_onboarding`** - Create a regular onboarding session
- **`post_onboarding_prefill`** - Prefill customer details for onboarding
- **`post_hosted_workflows_bank_deposit_to_onchain_address`** - Create hosted bank deposit workflow

### Supporting Tools
- **`get_customers`** - Retrieve customer details
- **`put_customers`** - Create or update customer records
- **`get_internal_customers_onboarding`** - Get customer onboarding status
- **`post_internal_customers_onboarding`** - Update customer onboarding details

## 🚀 Hosted Onboarding Workflow

### Step 1: Create or Retrieve Customer

First, ensure you have a customer record in your system:

```json
{
  "CustomerID": "customer-123",
  "Email": "customer@example.com",
  "FirstName": "John",
  "LastName": "Doe"
}
```

### Step 2: Create Hosted Onboarding Session

Use the `post_customers_hosted_onboarding` tool:

```json
{
  "CustomerID": "customer-123",
  "ReturnURL": "https://your-app.com/onboarding-complete",
  "FiatOptions": [
    { "FiatCurrencyCode": "USD" },
    { "FiatCurrencyCode": "EUR" }
  ]
}
```

**Response:**
```json
{
  "HostedURL": "https://onboarding.noah.com/session/abc123"
}
```

### Step 3: Redirect Customer

Redirect the customer to the `HostedURL` returned in the response. The customer will complete:
- Identity verification
- Address verification
- Document upload (if required)
- Terms and conditions acceptance

### Step 4: Handle Return

When the customer completes onboarding, they'll be redirected to your `ReturnURL` with parameters:
```
https://your-app.com/onboarding-complete?CheckoutSessionID=abc123&ExternalID=customer-123&Status=completed
```

### Step 5: Check Onboarding Status

Use `get_internal_customers_onboarding` to check the customer's onboarding status:

```json
{
  "ReturnURL": "https://your-app.com/onboarding-complete",
  "OnboardingCustomer": {
    "CustomerID": "customer-123",
    "UserID": "user-456",
    "Email": "customer@example.com",
    "KycReviewStatus": "Approved",
    "Consent": true,
    "Created": "2024-01-01T00:00:00Z"
  }
}
```

## 🔧 Configuration

### Environment Variables

Set these in your MCP configuration:

```json
{
  "mcpServers": {
    "noah-business-api": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "NOAH_API_KEY": "your_noah_api_key_here",
        "NOAH_API_URL": "https://api.sandbox.noah.com/v1"
      }
    }
  }
}
```

### API Base URLs

- **Sandbox**: `https://api.sandbox.noah.com/v1`
- **Production**: `https://api.noah.com`

## 📋 Tool Parameters

### post_customers_hosted_onboarding

**Required:**
- `CustomerID` (string) - Unique customer identifier
- `ReturnURL` (string) - URL to redirect after onboarding

**Optional:**
- `FiatOptions` (array) - Supported fiat currencies
  - `FiatCurrencyCode` - One of: USD, EUR, GBP, etc.

### post_onboarding

**Required:**
- `CustomerID` (string) - Unique customer identifier
- `ReturnURL` (string) - URL to redirect after onboarding

**Optional:**
- `FiatOptions` (array) - Supported fiat currencies

### post_onboarding_prefill

**Required:**
- `CustomerID` (string) - Unique customer identifier

**Optional:**
- `SumSubToken` (string) - SumSub token for prefill

## 🧪 Testing

### Test Script

Run the test script to verify your configuration:

```bash
# Replace with your actual API key
node test-hosted-onboarding-real.js
```

### Manual Testing

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the MCP server:**
   ```bash
   node dist/index.js
   ```

3. **Test with curl:**
   ```bash
   curl -X POST https://api.sandbox.noah.com/v1/customers/hosted-onboarding \
     -H "Content-Type: application/json" \
     -H "Api-Signature: your_api_key" \
     -d '{
       "CustomerID": "test-customer",
       "ReturnURL": "https://example.com/complete"
     }'
   ```

## 🔍 Troubleshooting

### Common Issues

1. **403 Forbidden (CloudFront)**
   - Check API base URL
   - Verify API key is correct
   - Ensure you're using the right environment (sandbox/production)

2. **404 Not Found**
   - Verify endpoint path is correct
   - Check API version in URL

3. **401 Unauthorized**
   - Verify API key is valid
   - Check API key format

4. **400 Bad Request**
   - Validate required parameters
   - Check parameter formats

### Debug Steps

1. **Verify API Key:**
   ```bash
   curl -H "Api-Signature: your_api_key" https://api.sandbox.noah.com/v1/customers
   ```

2. **Check API Documentation:**
   - Visit Noah dashboard
   - Review API documentation
   - Test endpoints in API explorer

3. **Test with Postman:**
   - Import Noah API collection
   - Test endpoints manually
   - Verify responses

## 📚 Next Steps

After successful hosted onboarding:

1. **Process Transactions** - Use checkout tools for payments
2. **Manage Customers** - Update customer information
3. **Monitor Balances** - Track account balances
4. **Set Up Workflows** - Create automated processes

## 🔗 Related Tools

- **Checkout**: `post_checkout_payin_fiat`, `post_checkout_payin_crypto`
- **Balances**: `get_balances`
- **Transactions**: `get_transactions`, `post_transactions_sell`
- **Workflows**: `post_workflows_bank_deposit_to_onchain_address`

## 📞 Support

For API issues:
- Check Noah API documentation
- Contact Noah support
- Review error responses for details

For MCP issues:
- Check MCP server logs
- Verify tool registration
- Test individual tools 