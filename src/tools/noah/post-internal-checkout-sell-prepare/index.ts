import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCheckoutSellPrepareSchema, postInternalCheckoutSellPrepareSchema } from "./schema";

/**
 * Prepare Sell Transaction
 */
export const postInternalCheckoutSellPrepare = async (args: PostInternalCheckoutSellPrepareSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/checkout/sell/prepare', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCheckoutSellPrepareTool: ToolRegistration<PostInternalCheckoutSellPrepareSchema> = {
  name: "post_internal_checkout_sell_prepare",
  description: "Calculates inputs required for sell endpoint.",
  inputSchema: postInternalCheckoutSellPrepareSchema,
  handler: async (args: PostInternalCheckoutSellPrepareSchema) => {
    try {
      const parsedArgs = postInternalCheckoutSellPrepareSchema.parse(args);
      const result = await postInternalCheckoutSellPrepare(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCheckoutSellPrepareTool handler:", error);
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
