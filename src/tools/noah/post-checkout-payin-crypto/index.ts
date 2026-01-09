import { type PostCheckoutPayinCryptoSchema, postCheckoutPayinCryptoSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Crypto Payin Session
 */
export const postCheckoutPayinCrypto = async (args: PostCheckoutPayinCryptoSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/checkout/payin/crypto", args);

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
        summary: "Successfully executed /checkout/payin/crypto",
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
export const postCheckoutPayinCryptoTool: ToolRegistration<PostCheckoutPayinCryptoSchema> = {
  name: "post_checkout_payin_crypto",
  description:
    "This endpoint initiates Noah’s hosted checkout session for cryptocurrency payments. The solution creates a hosted session where customers make cryptocurrency payments through Noah’s hosted checkout page, requiring properties such as a CustomerID for customer identification, CryptoCurrency type (like USDC or Bitcoin), Amount specifications, and return/cancel URLs for post-payment redirection. Use the endpoint to retrieve a response consisting of a checkout URL, which you pass to your customer so that they can complete their cryptocurrency payment through a hosted session. The hosted flow handles the complete payment process with real-time status updates via Webhooks.",
  inputSchema: postCheckoutPayinCryptoSchema,
  handler: async (args: PostCheckoutPayinCryptoSchema) => {
    try {
      const parsedArgs = postCheckoutPayinCryptoSchema.parse(args);
      const result = await postCheckoutPayinCrypto(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postCheckoutPayinCryptoTool handler:", error);
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
