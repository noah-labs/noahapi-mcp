import type { ToolRegistration } from "@/types/tools";
import { type PostCustomersHostedOnboardingSchema, postCustomersHostedOnboardingSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Onboard Customer
 */
export const postCustomersHostedOnboarding = async (args: PostCustomersHostedOnboardingSchema): Promise<string> => {
  try {
    const response = await noahClient.post('/customers/hosted-onboarding', args);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Successfully created hosted onboarding session`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const postCustomersHostedOnboardingTool: ToolRegistration<PostCustomersHostedOnboardingSchema> = {
  name: "post_customers_hosted_onboarding",
  description: "Retrieve details for customer onboarding session",
  inputSchema: postCustomersHostedOnboardingSchema,
  handler: async (args: PostCustomersHostedOnboardingSchema) => {
    try {
      const parsedArgs = postCustomersHostedOnboardingSchema.parse(args);
      const result = await postCustomersHostedOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postCustomersHostedOnboardingTool handler:", error);
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
