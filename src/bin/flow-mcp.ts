#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import path from "node:path";
import { fileURLToPath } from "node:url";

yargs(hideBin(process.argv))
  .scriptName("flow-mcp")
  .command(
    "dev <file>",
    "Start development server",
    (yargs) => {
      return yargs.positional("file", {
        type: "string",
        describe: "Server file path",
        demandOption: true,
      });
    },
    async (argv) => {
      try {
        if (!argv.file) {
          throw new Error("Server file path is required");
        }
        await execa({
          stdin: "inherit",
          stdout: "inherit",
          stderr: "inherit",
        })`npx @wong2/mcp-cli bun ${argv.file}`;
      } catch (error) {
        console.error("Error starting development server:", error);
        process.exit(1);
      }
    },
  )
  .command(
    "inspect <file>",
    "Inspect server file",
    (yargs) => {
      return yargs.positional("file", {
        type: "string",
        describe: "Server file path",
        demandOption: true,
      });
    },
    async (argv) => {
      try {
        if (!argv.file) {
          throw new Error("Server file path is required");
        }
        await execa({
          stdout: "inherit",
          stderr: "inherit",
        })`npx @modelcontextprotocol/inspector bun ${argv.file}`;
      } catch (error) {
        console.error("Error inspecting server file:", error);
        process.exit(1);
      }
    },
  )
  .command(
    ["start", "$0"],
    "Start MCP server",
    (yargs) => {
      return yargs.option("sse", {
        type: "boolean",
        describe: "Use SSE transport",
        default: false,
      });
    },
    async (argv) => {
      try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const serverPath = path.join(__dirname, "..", "index.js");
        
        await execa("node", [serverPath, ...(argv.sse ? ["--sse"] : [])], {
          stdio: "inherit",
        });
      } catch (error) {
        console.error("Error starting MCP server:", error);
        process.exit(1);
      }
    },
  )
  .help()
  .parseAsync();  