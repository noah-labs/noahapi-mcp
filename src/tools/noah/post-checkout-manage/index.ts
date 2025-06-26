import type { ToolRegistration } from "@/types/tools";
import { type PostCheckoutManageSchema, postCheckoutManageSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Managed Session
 */
export const postCheckoutManage = async (args: PostCheckoutManageSchema): Promise<string> => {
  try {
    const response = await noahClient.post("/checkout/manage", args);

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
        summary: `Successfully managed checkout session`,
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

export const postCheckoutManageTool: ToolRegistration<PostCheckoutManageSchema> = {
  name: "post_checkout_manage",
  description:
    "Create a session that allows the customer to create, update or delete their payment methods. If the Customer object is provided, the customer will be upserted. If the Customer object is not provided, the CustomerID should refer to an existing customer.",
  inputSchema: postCheckoutManageSchema,
  handler: async (args: PostCheckoutManageSchema) => {
    try {
      const parsedArgs = postCheckoutManageSchema.parse(args);
      const result = await postCheckoutManage(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postCheckoutManageTool handler:", error);
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
