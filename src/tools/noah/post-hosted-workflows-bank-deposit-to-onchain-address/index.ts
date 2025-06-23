import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostHostedWorkflowsBankDepositToOnchainAddressSchema, postHostedWorkflowsBankDepositToOnchainAddressSchema } from "./schema";

/**
 * Bank deposit to onchain address (hosted)
 */
export const postHostedWorkflowsBankDepositToOnchainAddress = async (args: PostHostedWorkflowsBankDepositToOnchainAddressSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/hosted-workflows/bank-deposit-to-onchain-address', args);
  
  return JSON.stringify(result, null, 2);
};

export const postHostedWorkflowsBankDepositToOnchainAddressTool: ToolRegistration<PostHostedWorkflowsBankDepositToOnchainAddressSchema> = {
  name: "post_hosted_workflows_bank_deposit_to_onchain_address",
  description: "This endpoint creates a hosted onboarding session for customers to set up a workflow which automatically converts fiat currency from bank deposits into cryptocurrency and sends the acquired crypto to the specified wallet address on the specified network. The workflow will be triggered automatically and indefinitely whenever a bank transfer is made to the bank account described in the response. The deposited amount will be traded for the specified cryptocurrency at the current market price after application of fees. Important:  On-chain operations are irreversible  Market prices may fluctuate significantly, impacting the final amount of cryptocurrency sent  Although this endpoint should return the same bank details for the same customer we can't guarantee the longevity of those details. For this reason, every time you need to present the customer with the bank deposit details, you should use this endpoint to get them. If the customer reuses the bank details after they become invalid the transfer will fail and money will NOT be lost.",
  inputSchema: postHostedWorkflowsBankDepositToOnchainAddressSchema,
  handler: async (args: PostHostedWorkflowsBankDepositToOnchainAddressSchema) => {
    try {
      const parsedArgs = postHostedWorkflowsBankDepositToOnchainAddressSchema.parse(args);
      const result = await postHostedWorkflowsBankDepositToOnchainAddress(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postHostedWorkflowsBankDepositToOnchainAddressTool handler:", error);
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
