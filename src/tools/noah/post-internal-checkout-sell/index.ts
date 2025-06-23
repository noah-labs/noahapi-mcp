import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCheckoutSellSchema, postInternalCheckoutSellSchema } from "./schema";

/**
 * Hosted Checkout Sell (onramp) execution
 */
export const postInternalCheckoutSell = async (args: PostInternalCheckoutSellSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/checkout/sell', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCheckoutSellTool: ToolRegistration<PostInternalCheckoutSellSchema> = {
  name: "post_internal_checkout_sell",
  description: "Execute a sell to fulfil a Hosed Checkout session",
  inputSchema: postInternalCheckoutSellSchema,
  handler: async (args: PostInternalCheckoutSellSchema) => {
    try {
      const parsedArgs = postInternalCheckoutSellSchema.parse(args);
      const result = await postInternalCheckoutSell(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCheckoutSellTool handler:", error);
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
