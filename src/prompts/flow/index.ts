import { flowBalanceSchema, type FlowBalanceSchema } from '@/tools/flowBalance/schema';
import { accountInfoSchema, type AccountInfoSchema } from '@/tools/accountInfo/schema';
import { coaAccountSchema, type CoaAccountSchema } from '@/tools/coaAccount/schema';

// Define prompt objects
export const getFlowBalancePrompt = {
  name: 'flow.getBalance',
  description: 'Get the balance of a Flow account',
  schema: flowBalanceSchema,
  handler: ({ address, network = 'mainnet' }: FlowBalanceSchema) => ({
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
  schema: accountInfoSchema,
  handler: ({ address, network = 'mainnet' }: AccountInfoSchema) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please get account information for Flow account ${address} on the ${network} network.`
      }
    }]
  })
};

export const getCoaAccountPrompt = {
  name: 'flow.findCoaAccounts',
  description: 'Find COA accounts associated with an address',
  schema: coaAccountSchema,
  handler: ({ address, network = 'mainnet' }: CoaAccountSchema) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please find COA accounts associated with Flow account ${address} on the ${network} network.`
      }
    }]
  })
};