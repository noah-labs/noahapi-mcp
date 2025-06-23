import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostCheckoutPayoutFiatSchema, postCheckoutPayoutFiatSchema } from "./schema";

/**
 * Create Fiat Payout
 */
export const postCheckoutPayoutFiat = async (args: PostCheckoutPayoutFiatSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/checkout/payout/fiat', args);
  
  return JSON.stringify(result, null, 2);
};

export const postCheckoutPayoutFiatTool: ToolRegistration<PostCheckoutPayoutFiatSchema> = {
  name: "post_checkout_payout_fiat",
  description: "Create a Hosted Checkout session to make fiat payout to your customer using the NOAH Hosted Checkout page.",
  inputSchema: postCheckoutPayoutFiatSchema,
  handler: async (args: PostCheckoutPayoutFiatSchema) => {
    try {
      const parsedArgs = postCheckoutPayoutFiatSchema.parse(args);
      const result = await postCheckoutPayoutFiat(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postCheckoutPayoutFiatTool handler:", error);
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
