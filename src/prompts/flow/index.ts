import { z } from 'zod';

interface Server {
  prompt: (
    name: string,
    description: string,
    schema: z.ZodType<any>,
    handler: (params: any) => { messages: Array<{ role: string; content: { type: string; text: string } }> }
  ) => Server;
}

// Define types for the parameters
type FlowBalanceParams = {
  address: string;
  network?: string;
};

type AccountInfoParams = {
  address: string;
  network?: string;
  include_contracts?: boolean;
  include_keys?: boolean;
};

type CoaAccountParams = {
  address: string;
  network?: string;
};

// Define prompt objects
export const getFlowBalancePrompt = {
  name: 'flow.getBalance',
  description: 'Get the balance of a Flow account',
  schema: z.object({
    address: z.string().describe('The Flow account address'),
    network: z.string().optional().default('mainnet').describe('The Flow network to use')
  }),
  handler: ({ address, network = 'mainnet' }: FlowBalanceParams) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please get the balance for Flow account ${address} on the ${network} network.`
      }
    }]
  })
};

export const getAccountInfoPrompt = {
  name: 'flow.getAccountInfo',
  description: 'Get information about a Flow account',
  schema: z.object({
    address: z.string().describe('The Flow account address'),
    network: z.string().optional().default('mainnet').describe('The Flow network to use'),
    include_contracts: z.boolean().optional().default(false).describe('Whether to include contract information'),
    include_keys: z.boolean().optional().default(false).describe('Whether to include key information')
  }),
  handler: ({ address, network = 'mainnet', include_contracts = false, include_keys = false }: AccountInfoParams) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please get account information for Flow account ${address} on the ${network} network.${include_contracts ? ' Include contract information.' : ''}${include_keys ? ' Include key information.' : ''}`
      }
    }]
  })
};

export const getCoaAccountPrompt = {
  name: 'flow.findCoaAccounts',
  description: 'Find COA accounts associated with an address',
  schema: z.object({
    address: z.string().describe('The Flow account address'),
    network: z.string().optional().default('mainnet').describe('The Flow network to use')
  }),
  handler: ({ address, network = 'mainnet' }: CoaAccountParams) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please find COA accounts associated with Flow account ${address} on the ${network} network.`
      }
    }]
  })
};

export const registerFlowPrompts = (server: Server): Server => {
  // Register the prompts with the server
  server.prompt(
    getFlowBalancePrompt.name,
    getFlowBalancePrompt.description,
    getFlowBalancePrompt.schema,
    getFlowBalancePrompt.handler
  );

  server.prompt(
    getAccountInfoPrompt.name,
    getAccountInfoPrompt.description,
    getAccountInfoPrompt.schema,
    getAccountInfoPrompt.handler
  );

  server.prompt(
    getCoaAccountPrompt.name,
    getCoaAccountPrompt.description,
    getCoaAccountPrompt.schema,
    getCoaAccountPrompt.handler
  );

  return server;
}; 