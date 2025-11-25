import type { ToolRegistration } from "@/types/tools";
import { type PostTransactionsSellPrepareSchema, postTransactionsSellPrepareSchema } from "./schema";

/**
 * Prepare Sell Transaction
 */
export const postTransactionsSellPrepare = async (args: PostTransactionsSellPrepareSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /transactions/sell/prepare

  console.log("Noah API call:", { method: "POST", path: "/transactions/sell/prepare", args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /transactions/sell/prepare",
    args,
  });
};

export const postTransactionsSellPrepareTool: ToolRegistration<PostTransactionsSellPrepareSchema> = {
  name: "post_transactions_sell_prepare",
  description:
    "This endpoint calculates and validates the required inputs for a sell transaction, including accurate pricing estimates, fees, and limits. Use the endpoint to pre-validate a crypto-to-fiat sell by generating a FormSessionID, retrieving real-time price/fee/limit estimates, computing the required CryptoAuthorizedAmount, and validating payout-form inputs. This enables the subsequent Create Sell call to execute deterministically within your slippage, balance, and compliance constraints, with no funds being removed at this stage. Follow the step-by-step guides:  [Direct Payout to US Business](../recipes/payout/global-payouts-business)  [Direct Payout to Individual Customer](../recipes/payout/global-payouts-individual)",
  inputSchema: postTransactionsSellPrepareSchema,
  handler: async (args: PostTransactionsSellPrepareSchema) => {
    try {
      const parsedArgs = postTransactionsSellPrepareSchema.parse(args);
      const result = await postTransactionsSellPrepare(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postTransactionsSellPrepareTool handler:", error);
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
