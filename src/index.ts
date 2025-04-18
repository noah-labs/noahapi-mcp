import { createServer, startServer } from "./server";

// Get command line arguments
const args = process.argv.slice(2);
const useSSE = args.includes("--sse");

const server = createServer();
startServer(server, useSSE);

export default server;
