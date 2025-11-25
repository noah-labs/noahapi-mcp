import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingSchema, postOnboardingSchema } from "./schema";

/**
 * Create Onboarding Session
 */
export const postOnboarding = async (args: PostOnboardingSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /onboarding/{CustomerID}

  console.log("Noah API call:", { method: "POST", path: "/onboarding/{CustomerID}", args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /onboarding/{CustomerID}",
    args,
  });
};

export const postOnboardingTool: ToolRegistration<PostOnboardingSchema> = {
  name: "post_onboarding",
  description:
    "This endpoint initiates [Noah's Standard Model onboarding flow](../getting-started/kyc#standard-model). Through this solution, Noah establishes direct contractual relationships with your end customers, handling all KYB/KYC verification and Tems and Conditions acceptance on your behalf. Use the endpoint to retrieve a response consisting of a URL, which you pass to your customer so that they can enter their details in a Hosted Onboarding session. Follow the step-by-step guide: [Hosted Onboarding Recipe](../recipes/onboarding/hosted-onboarding) Note: Customers needing to process USD payments must make use of Hosted Onboarding, rather than using [Reliance Onboarding](../api-reference/create-update-customer).",
  inputSchema: postOnboardingSchema,
  handler: async (args: PostOnboardingSchema) => {
    try {
      const parsedArgs = postOnboardingSchema.parse(args);
      const result = await postOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postOnboardingTool handler:", error);
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
