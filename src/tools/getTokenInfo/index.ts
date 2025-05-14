import type { ToolRegistration } from "@/types/tools.js";
import { type GetTokenInfoSchema, getTokenInfoSchema } from "./schema.js";
import axios from 'axios'

export const getTokenInfo = async (args: GetTokenInfoSchema): Promise<any> => {
  const { address } = args;
  try {

    let url = `https://api.geckoterminal.com/api/v2/networks/flow-evm/tokens/${address}/info`

    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;version=20230302',
      },
    })
    const { data = {} } = res && res.data ? res.data : {}

    return data

  } catch (error) {
    throw new Error(`Error fetching contract: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getTokenInfoTool: ToolRegistration<GetTokenInfoSchema> = {
  name: "get_token_info",
  description: "Get token info on Flow evm chain with token contract address",
  inputSchema: getTokenInfoSchema,
  handler: async (args: GetTokenInfoSchema) => {
    try {
      const parsedArgs = getTokenInfoSchema.parse(args);
      const result = await getTokenInfo(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getTokenInfoTool handler:", error);
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

