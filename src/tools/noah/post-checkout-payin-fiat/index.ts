import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostCheckoutPayinFiatSchema, postCheckoutPayinFiatSchema } from "./schema";

/**
 * Create Fiat Payment
 */
export const postCheckoutPayinFiat = async (args: PostCheckoutPayinFiatSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/checkout/payin/fiat', args);
  
  return JSON.stringify(result, null, 2);
};

export const postCheckoutPayinFiatTool: ToolRegistration<PostCheckoutPayinFiatSchema> = {
  name: "post_checkout_payin_fiat",
  description: "Create a Hosted Checkout session to enable a customer to accept a fiat payment using the NOAH Hosted Checkout page. If the Customer object is provided, the customer will be upserted. If the Customer object is not provided, the CustomerID should refer to an existing customer.",
  inputSchema: postCheckoutPayinFiatSchema,
  handler: async (args: PostCheckoutPayinFiatSchema) => {
    try {
      const parsedArgs = postCheckoutPayinFiatSchema.parse(args);
      const result = await postCheckoutPayinFiat(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postCheckoutPayinFiatTool handler:", error);
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
