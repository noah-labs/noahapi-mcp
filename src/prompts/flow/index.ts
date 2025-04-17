import { z } from 'zod';

interface Server {
  prompt: (
    name: string,
    description: string,
    schema: z.ZodType<any>,
    handler: (params: any) => { messages: Array<{ role: string; content: { type: string; text: string } }> }
  ) => Server;
}

export const registerFlowPrompts = (server: Server): Server => {
  // Get Flow balance prompt
  server.prompt(
    'flow.getBalance',
    'Get the balance of a Flow account',
    {
      address: z.string().describe('The Flow account address'),
      network: z.string().optional().default('mainnet').describe('The Flow network to use')
    },
    ({ address, network = 'mainnet' }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Please get the balance for Flow account ${address} on the ${network} network.`
        }
      }]
    })
  );

  // Get Flow account info prompt
  server.prompt(
    'flow.getAccountInfo',
    'Get information about a Flow account',
    {
      address: z.string().describe('The Flow account address'),
      network: z.string().optional().default('mainnet').describe('The Flow network to use'),
      include_contracts: z.boolean().optional().default(false).describe('Whether to include contract information'),
      include_keys: z.boolean().optional().default(false).describe('Whether to include key information')
    },
    ({ address, network = 'mainnet', include_contracts = false, include_keys = false }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Please get account information for Flow account ${address} on the ${network} network.${include_contracts ? ' Include contract information.' : ''}${include_keys ? ' Include key information.' : ''}`
        }
      }]
    })
  );

  // Find COA accounts prompt
  server.prompt(
    'flow.findCoaAccounts',
    'Find COA accounts associated with an address',
    {
      address: z.string().describe('The Flow account address'),
      network: z.string().optional().default('mainnet').describe('The Flow network to use')
    },
    ({ address, network = 'mainnet' }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Please find COA accounts associated with Flow account ${address} on the ${network} network.`
        }
      }]
    })
  );

  return server;
}; 