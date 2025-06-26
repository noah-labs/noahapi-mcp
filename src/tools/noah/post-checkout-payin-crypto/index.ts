import type { ToolRegistration } from "@/types/tools";
import { type PostCheckoutPayinCryptoSchema, postCheckoutPayinCryptoSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Crypto Payin
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
        summary: `Successfully created crypto payin checkout session`,
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
  description: "Create a Hosted Checkout session to accept a crypto payment using the NOAH Hosted Checkout page.",
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
