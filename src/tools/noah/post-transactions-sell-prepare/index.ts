import { type PostTransactionsSellPrepareSchema, postTransactionsSellPrepareSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Prepare Sell Transaction
 */
export const postTransactionsSellPrepare = async (args: PostTransactionsSellPrepareSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/transactions/sell/prepare", args);

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
        summary: "Successfully executed /transactions/sell/prepare",
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
