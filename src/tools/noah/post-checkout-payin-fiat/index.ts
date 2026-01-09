import { type PostCheckoutPayinFiatSchema, postCheckoutPayinFiatSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Fiat Payin Session
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
        summary: "Successfully executed /checkout/payin/fiat",
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
    "This endpoint initiates Noah’s hosted checkout session for fiat currency payments. The solution creates a hosted session where customers make fiat currency payments through Noah’s hosted checkout interface, accepting parameters, including customer details. If customer details are filled out, a new customer will be created. Otherwise, the provided CustomerID should refer to an existing customer. Use the endpoint to retrieve a response consisting of a checkout URL, which you pass to your customer so that they can complete their fiat payment through a hosted session. The hosted flow handles the complete payment process with real-time status updates via Webhooks.",
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
