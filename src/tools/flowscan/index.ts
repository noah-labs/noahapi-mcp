import type { ToolRegistration } from "@/types/tools.js";
import { type GetTransactionSchema, getTransactionInfoSchema } from "./schema.js";
import axios from 'axios'

export const getTransaction = async (args: GetTransactionSchema): Promise<any> => {
  const { txid } = args;
  try {

    let url = `https://evm.flowscan.io/api/v2/transactions/${txid}`

    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;version=20230302',
      },
    })

    return res.data

  } catch (error) {
    throw new Error(`Error fetching contract: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getEVMTransactionTool: ToolRegistration<GetTransactionSchema> = {
  name: "get_evm_transaction_info",
  description: `
  Get EVM transaction info with transaction hash on flowscan.io.
  flow EVM address is 20 bytes long, which is 40 characters long or 42 characters long with 0x prefix.
  NOTE: This is tool for flow EVM chain not flow blockchain.
  `,
  inputSchema: getTransactionInfoSchema,
  handler: async (args: GetTransactionSchema) => {
    try {
      const parsedArgs = getTransactionInfoSchema.parse(args);
      const result = await getTransaction(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getTransactionTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};

