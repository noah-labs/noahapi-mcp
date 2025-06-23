import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostBeta1RuleSchema, postBeta1RuleSchema } from "./schema";

/**
 * Create a rule
 */
export const postBeta1Rule = async (args: PostBeta1RuleSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/beta1/rule', args);
  
  return JSON.stringify(result, null, 2);
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
