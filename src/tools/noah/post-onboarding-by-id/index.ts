import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingByIdSchema, postOnboardingByIdSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Onboarding Session
 */
export const postOnboardingById = async (args: PostOnboardingByIdSchema): Promise<string> => {
  try {
    const { CustomerID, ...bodyData } = args;
    const endpoint = noahClient.replacePath("/onboarding/{CustomerID}", { CustomerID });
    const response = await noahClient.post(endpoint, bodyData);

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
        summary: `Successfully created onboarding session for customer ${CustomerID}`,
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

export const postOnboardingByIdTool: ToolRegistration<PostOnboardingByIdSchema> = {
  name: "post_onboarding_by_id",
  description:
    "This endpoint initiates [Noah's Standard Model onboarding flow](../getting-started/kyc#standard-model). Through this solution, Noah establishes direct contractual relationships with your end customers, handling all KYB/KYC verification and Tems and Conditions acceptance on your behalf. Use the endpoint to retrieve a response consisting of a URL, which you pass to your customer so that they can enter their details in a Hosted Onboarding session. Follow the step-by-step guide: [Hosted Onboarding Recipe](../recipes/onboarding/hosted-onboarding) Note: Customers needing to process USD payments must make use of Hosted Onboarding, rather than using [Reliance Onboarding](../api-reference/create-update-customer).",
  inputSchema: postOnboardingByIdSchema,
  handler: async (args: PostOnboardingByIdSchema) => {
    try {
      const parsedArgs = postOnboardingByIdSchema.parse(args);
      const result = await postOnboardingById(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postOnboardingByIdTool handler:", error);
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
