import { type PostCheckoutPayoutFiatSchema, postCheckoutPayoutFiatSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Fiat Payout Session
 */
export const postCheckoutPayoutFiat = async (args: PostCheckoutPayoutFiatSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/checkout/payout/fiat", args);

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
        summary: "Successfully executed /checkout/payout/fiat",
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
export const postCheckoutPayoutFiatTool: ToolRegistration<PostCheckoutPayoutFiatSchema> = {
  name: "post_checkout_payout_fiat",
  description:
    "This endpoint initiates Noah's Hosted Fiat Payout Session flow. The solution establishes an end-to-end checkout experience where customers convert cryptocurrency to fiat through a hosted interface, with Noah handling KYC verification, payment method selection, and transaction monitoring. Use the endpoint to retrieve a response consisting of a URL, which you pass to your customer so that they can complete their payout through a hosted session. If customer details are filled out, a new customer will be created. Otherwise, the provided CustomerID should refer to an existing customer. Follow the step-by-step guide: [Hosted Fiat Payout](../recipes/payout/hosted-checkout)",
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
