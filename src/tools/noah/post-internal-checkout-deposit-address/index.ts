import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCheckoutDepositAddressSchema, postInternalCheckoutDepositAddressSchema } from "./schema";

/**
 * Retrieves or creates deposit address for a customer
 */
export const postInternalCheckoutDepositAddress = async (args: PostInternalCheckoutDepositAddressSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/checkout/deposit-address', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCheckoutDepositAddressTool: ToolRegistration<PostInternalCheckoutDepositAddressSchema> = {
  name: "post_internal_checkout_deposit_address",
  description: "Retrieves or creates a deposit address for the authenticated customer. The returned address can be used for receiving supported cryptocurrency deposits.",
  inputSchema: postInternalCheckoutDepositAddressSchema,
  handler: async (args: PostInternalCheckoutDepositAddressSchema) => {
    try {
      const parsedArgs = postInternalCheckoutDepositAddressSchema.parse(args);
      const result = await postInternalCheckoutDepositAddress(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCheckoutDepositAddressTool handler:", error);
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
