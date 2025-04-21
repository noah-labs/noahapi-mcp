#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execa } from "execa";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Command schemas
const devSchema = z.object({
  file: z.string().min(1, "Server file path is required"),
});

const inspectSchema = z.object({
  file: z.string().min(1, "Server file path is required"),
});

const startSchema = z.object({
  sse: z.boolean().default(false),
});

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
        const args = devSchema.parse({ file: argv.file });
        await execa({
          stdin: "inherit",
          stdout: "inherit",
          stderr: "inherit",
        })`npx @wong2/mcp-cli bun ${args.file}`;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Invalid arguments:", error.errors);
        } else {
          console.error("Error starting development server:", error);
        }
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
        const args = inspectSchema.parse({ file: argv.file });
        await execa({
          stdout: "inherit",
          stderr: "inherit",
        })`npx @modelcontextprotocol/inspector bun ${args.file}`;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Invalid arguments:", error.errors);
        } else {
          console.error("Error inspecting server file:", error);
        }
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
        const args = startSchema.parse({ sse: argv.sse });
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const serverPath = path.join(__dirname, "..", "index.js");
        
        await execa("node", [serverPath, ...(args.sse ? ["--sse"] : [])], {
          stdio: "inherit",
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Invalid arguments:", error.errors);
        } else {
          console.error("Error starting MCP server:", error);
        }
        process.exit(1);
      }
    },
  )
  .help()
  .parseAsync();