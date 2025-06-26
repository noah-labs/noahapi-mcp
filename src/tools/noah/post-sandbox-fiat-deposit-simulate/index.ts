import type { ToolRegistration } from "@/types/tools";
import { type PostSandboxFiatDepositSimulateSchema, postSandboxFiatDepositSimulateSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create a test fiat-deposit.
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
        summary: `Successfully simulated fiat deposit`,
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
    "Only available in sandbox environment. A fiat deposit will be created towards a fiat payment method. This could trigger webhooks, worklows or rules that you have previously setup.",
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
