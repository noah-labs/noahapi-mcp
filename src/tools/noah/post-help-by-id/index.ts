import type { ToolRegistration } from "@/types/tools";
import { type PostHelpByIdSchema, postHelpByIdSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Help Desk Session
 */
export const postHelpById = async (args: PostHelpByIdSchema): Promise<string> => {
  try {
    const { CustomerID, ...bodyData } = args;
    const endpoint = noahClient.replacePath("/help/{CustomerID}", { CustomerID });
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
        summary: `Successfully created help desk session for customer ${CustomerID}`,
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

export const postHelpByIdTool: ToolRegistration<PostHelpByIdSchema> = {
  name: "post_help_by_id",
  description: "This endpoint creates a help desk session for the customer.",
  inputSchema: postHelpByIdSchema,
  handler: async (args: PostHelpByIdSchema) => {
    try {
      const parsedArgs = postHelpByIdSchema.parse(args);
      const result = await postHelpById(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postHelpByIdTool handler:", error);
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
