import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostCustomersHostedOnboardingSchema, postCustomersHostedOnboardingSchema } from "./schema";

/**
 * Onboard Customer
 */
export const postCustomersHostedOnboarding = async (args: PostCustomersHostedOnboardingSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/customers/hosted-onboarding', args);
  
  return JSON.stringify(result, null, 2);
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
