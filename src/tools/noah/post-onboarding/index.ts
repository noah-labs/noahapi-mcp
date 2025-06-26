import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingSchema, postOnboardingSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Onboarding Session
 */
export const postOnboarding = async (args: PostOnboardingSchema): Promise<string> => {
  try {
    const { CustomerID, ...body } = args;
    const endpoint = noahClient.replacePath("/onboarding/{CustomerID}", { CustomerID });
    const response = await noahClient.post(endpoint, body);

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

export const postOnboardingTool: ToolRegistration<PostOnboardingSchema> = {
  name: "post_onboarding",
  description: "Retrieve details for customer onboarding session",
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
