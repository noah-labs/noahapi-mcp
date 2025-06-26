import type { ToolRegistration } from "@/types/tools";
import { type PostBeta1RuleSchema, postBeta1RuleSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create a rule
 */
export const postBeta1Rule = async (args: PostBeta1RuleSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/beta1/rule", args);

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
        summary: `Successfully created rule`,
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

export const postBeta1RuleTool: ToolRegistration<PostBeta1RuleSchema> = {
  name: "post_beta1_rule",
  description: "Create a rule used to create automated responses to events.",
  inputSchema: postBeta1RuleSchema,
  handler: async (args: PostBeta1RuleSchema) => {
    try {
      const parsedArgs = postBeta1RuleSchema.parse(args);
      const result = await postBeta1Rule(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postBeta1RuleTool handler:", error);
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
