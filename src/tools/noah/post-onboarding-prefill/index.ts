import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingPrefillSchema, postOnboardingPrefillSchema } from "./schema";

/**
 * Prefill Customer Details
 */
export const postOnboardingPrefill = async (args: PostOnboardingPrefillSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /onboarding/{CustomerID}/prefill

  console.log('Noah API call:', { method: 'POST', path: '/onboarding/{CustomerID}/prefill', args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /onboarding/{CustomerID}/prefill",
    args
  });
};

export const postOnboardingPrefillTool: ToolRegistration<PostOnboardingPrefillSchema> = {
  name: "post_onboarding_prefill",
  description: "Use the Prefill Customer Details endpoint to create a Customer and submit any KYC/KYB information you have already collected. Prefill allows you to pre-populate known data before initiating the [Hosted Onboarding](../recipes/onboarding/hosted-onboarding) flow, which will gather any remaining required information to collect missing compliance data through dynamic forms or hosted sessions, Terms and Conditions acceptance for regulatory compliance, and Fiat currency selection. The Type parameter defines the known data for prefilling a customer's Hosted Onboarding session, which can be one of the following.  SumSubToken. Follow the step-by-step guide: [Token Share Onboarding Recipe](../recipes/onboarding/token-share-onboarding).  BusinessCustomerPrefill. Follow the step-by-step guide: [Business Customer Prefill Recipe](../recipes/onboarding/business-customer-prefill).  IndividualCustomerPrefill. Follow the step-by-step guide: [Individual Customer Prefill Recipe](../recipes/onboarding/individual-customer-prefill)",
  inputSchema: postOnboardingPrefillSchema,
  handler: async (args: PostOnboardingPrefillSchema) => {
    try {
      const parsedArgs = postOnboardingPrefillSchema.parse(args);
      const result = await postOnboardingPrefill(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postOnboardingPrefillTool handler:", error);
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
