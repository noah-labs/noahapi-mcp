import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostCheckoutManageSchema, postCheckoutManageSchema } from "./schema";

/**
 * Create Managed Session
 */
export const postCheckoutManage = async (args: PostCheckoutManageSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/checkout/manage', args);
  
  return JSON.stringify(result, null, 2);
};

export const postCheckoutManageTool: ToolRegistration<PostCheckoutManageSchema> = {
  name: "post_checkout_manage",
  description: "Create a session that allows the customer to create, update or delete their payment methods. If the Customer object is provided, the customer will be upserted. If the Customer object is not provided, the CustomerID should refer to an existing customer.",
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
