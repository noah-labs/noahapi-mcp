import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCheckoutBuySchema, postInternalCheckoutBuySchema } from "./schema";

/**
 * Hosted Checkout Buy (onramp) execution
 */
export const postInternalCheckoutBuy = async (args: PostInternalCheckoutBuySchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/checkout/buy', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCheckoutBuyTool: ToolRegistration<PostInternalCheckoutBuySchema> = {
  name: "post_internal_checkout_buy",
  description: "Execute a buy to fulfil a Hosed Checkout session",
  inputSchema: postInternalCheckoutBuySchema,
  handler: async (args: PostInternalCheckoutBuySchema) => {
    try {
      const parsedArgs = postInternalCheckoutBuySchema.parse(args);
      const result = await postInternalCheckoutBuy(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCheckoutBuyTool handler:", error);
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
