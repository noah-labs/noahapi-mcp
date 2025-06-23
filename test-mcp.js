import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test the MCP server
async function testMCPServer() {
  console.log('Testing Noah Business API MCP Server...\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  
  // Set environment variables for testing
  process.env.NOAH_API_KEY = 'test_key';
  process.env.NOAH_API_URL = 'https://api.noah.com';

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
      console.log('Output:', output);
    } else {
      console.log('❌ MCP Server failed to start');
      console.log('Error:', errorOutput);
    }
  });

  // Send a simple test message
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
  }, 1000);

  // Kill the server after 3 seconds
  setTimeout(() => {
    server.kill();
  }, 3000);
}

testMCPServer().catch(console.error); 