import type { ToolRegistration } from "@/types/tools";
import { type PostCheckoutPayinFiatSchema, postCheckoutPayinFiatSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Fiat Payment
 */
export const postCheckoutPayinFiat = async (args: PostCheckoutPayinFiatSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/checkout/payin/fiat", args);

    if (response.error) {
      return JSON.stringify(
        {
          error: true,
          message: response.error.message,
          details: response.error.details,
        },
        null,
        2,
      );
    }

    return JSON.stringify(
      {
        success: true,
        data: response.data,
        summary: `Successfully created fiat payin checkout session`,
      },
      null,
      2,
    );
  } catch (error) {
    return JSON.stringify(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      null,
      2,
    );
  }
};

export const postCheckoutPayinFiatTool: ToolRegistration<PostCheckoutPayinFiatSchema> = {
  name: "post_checkout_payin_fiat",
  description:
    "Create a Hosted Checkout session to enable a customer to accept a fiat payment using the NOAH Hosted Checkout page. If the Customer object is provided, the customer will be upserted. If the Customer object is not provided, the CustomerID should refer to an existing customer.",
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
