import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the hosted onboarding functionality with different API configurations
async function testHostedOnboardingReal() {
  console.log('🧪 Testing Noah Business API Hosted Onboarding with Real Configuration...\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  
  // Test different API URL configurations
  const apiConfigs = [
    {
      name: 'Sandbox API v1',
      url: 'https://api.sandbox.noah.com/v1',
      key: 'your_actual_api_key_here'
    },
    {
      name: 'Sandbox API (no version)',
      url: 'https://api.sandbox.noah.com',
      key: 'your_actual_api_key_here'
    },
    {
      name: 'Production API',
      url: 'https://api.noah.com',
      key: 'your_actual_api_key_here'
    }
  ];

  for (const config of apiConfigs) {
    console.log(`\n🔧 Testing ${config.name}: ${config.url}`);
    
    // Set environment variables for testing
    process.env.NOAH_API_KEY = config.key;
    process.env.NOAH_API_URL = config.url;

    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env
    });

    let output = '';
    let errorOutput = '';

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Initialize the MCP server
    setTimeout(() => {
      server.stdin.write(JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {},
          clientInfo: {
            name: "test-client",
            version: "1.0.0"
          }
        }
      }) + '\n');
    }, 500);

    // Test hosted onboarding
    setTimeout(() => {
      console.log(`  🚀 Testing hosted onboarding with ${config.name}...`);
      server.stdin.write(JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "post_customers_hosted_onboarding",
          arguments: {
            CustomerID: "test-customer-123",
            ReturnURL: "https://example.com/onboarding-complete",
            FiatOptions: [
              { FiatCurrencyCode: "USD" },
              { FiatCurrencyCode: "EUR" }
            ]
          }
        }
      }) + '\n');
    }, 1500);

    // Kill the server after 3 seconds and check results
    setTimeout(() => {
      server.kill();
      
      // Parse the output to find the response
      const lines = output.split('\n');
      const responseLine = lines.find(line => line.includes('"id":2'));
      
      if (responseLine) {
        try {
          const response = JSON.parse(responseLine);
          if (response.result && response.result.content) {
            const content = response.result.content[0];
            if (content.text && content.text.includes('Error:')) {
              console.log(`  ❌ ${config.name}: ${content.text.split('Error:')[1].split('\n')[0]}`);
            } else {
              console.log(`  ✅ ${config.name}: Success!`);
              console.log(`     Response: ${content.text.substring(0, 200)}...`);
            }
          }
        } catch (e) {
          console.log(`  ⚠️  ${config.name}: Could not parse response`);
        }
      } else {
        console.log(`  ⚠️  ${config.name}: No response received`);
      }
    }, 3000);

    // Wait before testing next config
    await new Promise(resolve => setTimeout(resolve, 3500));
  }

  console.log('\n📋 Hosted Onboarding Tools Available:');
  console.log('✅ post_customers_hosted_onboarding - Create hosted onboarding session');
  console.log('✅ post_onboarding - Create regular onboarding session');
  console.log('✅ post_onboarding_prefill - Prefill customer details');
  console.log('✅ post_hosted_workflows_bank_deposit_to_onchain_address - Hosted bank deposit workflow');
  
  console.log('\n🔧 Next Steps:');
  console.log('1. Replace "your_actual_api_key_here" with your real Noah API key');
  console.log('2. Verify the correct API base URL from your Noah dashboard');
  console.log('3. Test with a real customer ID');
  console.log('4. Check the Noah API documentation for exact endpoint paths');
}

testHostedOnboardingReal().catch(console.error); 