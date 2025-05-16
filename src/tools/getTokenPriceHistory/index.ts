import type { ToolRegistration } from "@/types/tools.js";
import { type GetTokenPriceHistorySchema, getTokenPriceHistorySchema } from "./schema.js";
import axios from 'axios'

export const getTokenPriceHistory = async (args: GetTokenPriceHistorySchema): Promise<any> => {
  const { poolAddress, timeFrame } = args;
  try {

    let url = `https://api.geckoterminal.com/api/v2/networks/flow-evm/pools/${poolAddress}/priceHistory/${timeFrame}`

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

export const getTokenPriceHistoryTool: ToolRegistration<GetTokenPriceHistorySchema> = {
  name: "get_flow_token_price_history",
  description: "Get token price history on Flow EVM chain with pool address and time frame",
  inputSchema: getTokenPriceHistorySchema,
  handler: async (args: GetTokenPriceHistorySchema) => {
    try {
      const parsedArgs = getTokenPriceHistorySchema.parse(args);
      const result = await getTokenPriceHistory(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getTokenPriceHistoryTool handler:", error);
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

