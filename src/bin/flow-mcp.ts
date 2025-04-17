#!/usr/bin/env node

import yargs from 'yargs';
import { execa } from 'execa';
import type { ArgumentsCamelCase, CommandModule } from 'yargs';

interface DevArgs extends ArgumentsCamelCase {
  file: string;
}

interface InspectArgs extends ArgumentsCamelCase {
  file: string;
}

const devCommand: CommandModule<{}, DevArgs> = {
  command: 'dev <file>',
  describe: 'Start development server',
  builder: {
    file: {
      describe: 'Server file path',
      type: 'string',
      demandOption: true,
    },
  },
  handler: async (argv) => {
    try {
      await execa('fastmcp', ['dev', argv.file], {
        stdio: 'inherit',
      });
    } catch (error) {
      console.error('Error starting development server:', error);
      process.exit(1);
    }
  },
};

const inspectCommand: CommandModule<{}, InspectArgs> = {
  command: 'inspect <file>',
  describe: 'Inspect server file',
  builder: {
    file: {
      describe: 'Server file path',
      type: 'string',
      demandOption: true,
    },
  },
  handler: async (argv) => {
    try {
      await execa('fastmcp', ['inspect', argv.file], {
        stdio: 'inherit',
      });
    } catch (error) {
      console.error('Error inspecting server file:', error);
      process.exit(1);
    }
  },
};

const cli = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command(devCommand)
  .command(inspectCommand)
  .help();

cli.parse(); 