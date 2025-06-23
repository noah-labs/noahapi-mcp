import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalBankDepositToOnchainAddressSchema, postInternalBankDepositToOnchainAddressSchema } from "./schema";

/**
 * Bank deposit to onchain address
 */
export const postInternalBankDepositToOnchainAddress = async (args: PostInternalBankDepositToOnchainAddressSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/bank-deposit-to-onchain-address', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalBankDepositToOnchainAddressTool: ToolRegistration<PostInternalBankDepositToOnchainAddressSchema> = {
  name: "post_internal_bank_deposit_to_onchain_address",
  description: "This endpoint sets up the workflows which automatically convert fiat currency from bank deposits into cryptocurrency and sends the acquired crypto to the specified wallet address on the specified network. The workflow will be triggered automatically and indefinitely whenever a bank transfer is made to one of the bank accounts described in the response.",
  inputSchema: postInternalBankDepositToOnchainAddressSchema,
  handler: async (args: PostInternalBankDepositToOnchainAddressSchema) => {
    try {
      const parsedArgs = postInternalBankDepositToOnchainAddressSchema.parse(args);
      const result = await postInternalBankDepositToOnchainAddress(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalBankDepositToOnchainAddressTool handler:", error);
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
