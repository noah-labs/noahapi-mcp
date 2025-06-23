import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalCheckoutSchema, getInternalCheckoutSchema } from "./schema";

/**
 * Checkout session details
 */
export const getInternalCheckout = async (args: GetInternalCheckoutSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/checkout');
  
  return JSON.stringify(result, null, 2);
};

export const getInternalCheckoutTool: ToolRegistration<GetInternalCheckoutSchema> = {
  name: "get_internal_checkout",
  description: "Retrieve details of the checkout session and the associated business",
  inputSchema: getInternalCheckoutSchema,
  handler: async (args: GetInternalCheckoutSchema) => {
    try {
      const parsedArgs = getInternalCheckoutSchema.parse(args);
      const result = await getInternalCheckout(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalCheckoutTool handler:", error);
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
