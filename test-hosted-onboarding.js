import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the hosted onboarding functionality
async function testHostedOnboarding() {
  console.log('🧪 Testing Noah Business API Hosted Onboarding...\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  
  // Set environment variables for testing
  process.env.NOAH_API_KEY = 'test_key';
  process.env.NOAH_API_URL = 'https://api.sandbox.noah.com/v1';

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

  server.on('close', (code) => {
    if (code === 0) {
      console.log('✅ MCP Server started successfully');
    } else {
      console.log('❌ MCP Server failed to start');
      console.log('Error:', errorOutput);
    }
  });

  // Initialize the MCP server
  setTimeout(() => {
    console.log('📡 Initializing MCP server...');
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
  }, 1000);

  // List available tools
  setTimeout(() => {
    console.log('🔧 Listing available tools...');
    server.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list"
    }) + '\n');
  }, 2000);

  // Test hosted onboarding with sample data
  setTimeout(() => {
    console.log('🚀 Testing hosted onboarding...');
    server.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
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
  }, 3000);

  // Test regular onboarding
  setTimeout(() => {
    console.log('📝 Testing regular onboarding...');
    server.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "post_onboarding",
        arguments: {
          CustomerID: "test-customer-456",
          ReturnURL: "https://example.com/onboarding-complete",
          FiatOptions: [
            { FiatCurrencyCode: "USD" }
          ]
        }
      }
    }) + '\n');
  }, 4000);

  // Test onboarding prefill
  setTimeout(() => {
    console.log('📋 Testing onboarding prefill...');
    server.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: {
        name: "post_onboarding_prefill",
        arguments: {
          CustomerID: "test-customer-789",
          SumSubToken: "test-sumsub-token-123"
        }
      }
    }) + '\n');
  }, 5000);

  // Kill the server after 6 seconds
  setTimeout(() => {
    console.log('🛑 Stopping MCP server...');
    server.kill();
    console.log('\n📊 Test Results:');
    console.log('Output:', output);
    if (errorOutput) {
      console.log('Errors:', errorOutput);
    }
  }, 6000);
}

testHostedOnboarding().catch(console.error); 