import { type PostSandboxFiatDepositSimulateSchema, postSandboxFiatDepositSimulateSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Simulate Fiat Deposit
 */
export const postSandboxFiatDepositSimulate = async (args: PostSandboxFiatDepositSimulateSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/sandbox/fiat-deposit/simulate", args);

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
        summary: "Successfully executed /sandbox/fiat-deposit/simulate",
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
export const postSandboxFiatDepositSimulateTool: ToolRegistration<PostSandboxFiatDepositSimulateSchema> = {
  name: "post_sandbox_fiat_deposit_simulate",
  description:
    "This endpoint creates a simulated fiat deposit in the sandbox environment for testing purposes. The solution requires a FiatAmount, CustomerID reference, and payment method specifications to trigger configured workflows, rules, and webhook integrations. Use the endpoint to test automated processes and validate business logic without real money transfers, supporting various fiat currencies and deposit scenarios. Follow the step-by-step guides:  [Bank Onramp via USD Virtual Account](../recipes/payin/bank-onramp-us)  [Bank Onramp via EUR Virtual Account](../recipes/payin/bank-onramp-eu)",
  inputSchema: postSandboxFiatDepositSimulateSchema,
  handler: async (args: PostSandboxFiatDepositSimulateSchema) => {
    try {
      const parsedArgs = postSandboxFiatDepositSimulateSchema.parse(args);
      const result = await postSandboxFiatDepositSimulate(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postSandboxFiatDepositSimulateTool handler:", error);
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
