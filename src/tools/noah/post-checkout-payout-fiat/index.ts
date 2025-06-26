import type { ToolRegistration } from "@/types/tools";
import { type PostCheckoutPayoutFiatSchema, postCheckoutPayoutFiatSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Fiat Payout
 */
export const postCheckoutPayoutFiat = async (args: PostCheckoutPayoutFiatSchema): Promise<string> => {
  try {
    const response = await noahClient.post('/checkout/payout/fiat', args);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Successfully created fiat payout checkout session`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
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
