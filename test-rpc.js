import { spawn } from 'child_process';

const server = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    NOAH_API_KEY: 'apikey_sandbox_2pqtPqFFuRi3WX2WGaeCqbTE7NuR6vGWcQE7FZn2hQxP',
    NOAH_API_URL: 'https://api.sandbox.noah.com'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

server.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

server.stderr.on('data', (data) => {
  console.error('STDERR:', data.toString());
});

// Wait for server to start
setTimeout(() => {
  console.log('Sending get_balances request...');
  
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "get_balances",
      arguments: {}
    }
  };

  server.stdin.write(JSON.stringify(request) + '\n');
}, 2000);

// Wait a bit more and then kill the server
setTimeout(() => {
  console.log('Test completed, shutting down server...');
  server.kill();
}, 5000);

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
}); 