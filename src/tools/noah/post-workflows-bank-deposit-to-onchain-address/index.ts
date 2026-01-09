import type { ToolRegistration } from "@/types/tools";
import {
  type PostWorkflowsBankDepositToOnchainAddressSchema,
  postWorkflowsBankDepositToOnchainAddressSchema,
} from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Convert Fiat to Crypto
 */
export const postWorkflowsBankDepositToOnchainAddress = async (
  args: PostWorkflowsBankDepositToOnchainAddressSchema,
): Promise<string> => {
  try {
    const response = await noahClient.post("/workflows/bank-deposit-to-onchain-address", args);

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
        summary: "Successfully executed /workflows/bank-deposit-to-onchain-address",
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
export const postWorkflowsBankDepositToOnchainAddressTool: ToolRegistration<PostWorkflowsBankDepositToOnchainAddressSchema> =
  {
    name: "post_workflows_bank_deposit_to_onchain_address",
    description:
      "This endpoint establishes an automated workflow that converts incoming cryptocurrency deposits into fiat currency payouts. The solution requires configuration of source cryptocurrency monitoring, a FormSessionID for payout instructions, recipient payment method details, and conversion parameters, with the deposited amounts traded for the specified fiat currency at current market prices after application of fees. Use the endpoint to configure SourceAddress specification for deposit tracking, AmountConditions for trigger thresholds, and automatic execution rules with support for multiple cryptocurrencies and global payout channels. Follow the step-by-step guides:  [Bank Onramp via USD Virtual Account](../recipes/payin/bank-onramp-us)  [Bank Onramp via EUR Virtual Account](../recipes/payin/bank-onramp-eu) Notes:  On-chain operations are irreversible, and market prices may fluctuate significantly, impacting the final payout amount.  Although this workflow should continue working with the original FormSession, Noah cannot guarantee FormSession longevity. For this reason, generate a new FormSession each time you present the customer with the onchain deposit address.  If the customer reuses the onchain address after the FormSession becomes invalid, the transfer will fail but funds will not be lost.",
    inputSchema: postWorkflowsBankDepositToOnchainAddressSchema,
    handler: async (args: PostWorkflowsBankDepositToOnchainAddressSchema) => {
      try {
        const parsedArgs = postWorkflowsBankDepositToOnchainAddressSchema.parse(args);
        const result = await postWorkflowsBankDepositToOnchainAddress(parsedArgs);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      } catch (error) {
        console.error("Error in postWorkflowsBankDepositToOnchainAddressTool handler:", error);
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
