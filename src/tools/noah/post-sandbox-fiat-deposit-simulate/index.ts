import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostSandboxFiatDepositSimulateSchema, postSandboxFiatDepositSimulateSchema } from "./schema";

/**
 * Create a test fiat-deposit.
 */
export const postSandboxFiatDepositSimulate = async (args: PostSandboxFiatDepositSimulateSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/sandbox/fiat-deposit/simulate', args);
  
  return JSON.stringify(result, null, 2);
};

export const postSandboxFiatDepositSimulateTool: ToolRegistration<PostSandboxFiatDepositSimulateSchema> = {
  name: "post_sandbox_fiat_deposit_simulate",
  description: "Only available in sandbox environment. A fiat deposit will be created towards a fiat payment method. This could trigger webhooks, worklows or rules that you have previously setup.",
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
