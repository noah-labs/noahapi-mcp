import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostCheckoutPayinCryptoSchema, postCheckoutPayinCryptoSchema } from "./schema";

/**
 * Create Crypto Payin
 */
export const postCheckoutPayinCrypto = async (args: PostCheckoutPayinCryptoSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/checkout/payin/crypto', args);
  
  return JSON.stringify(result, null, 2);
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
