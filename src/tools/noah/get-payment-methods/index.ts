import type { ToolRegistration } from "@/types/tools";
import { type GetPaymentMethodsSchema, getPaymentMethodsSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Payment Methods
 */
export const getPaymentMethods = async (args: GetPaymentMethodsSchema): Promise<string> => {
  try {
    const response = await noahClient.get("/payment-methods", args);

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
        summary: "Successfully retrieved payment methods",
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

export const getPaymentMethodsTool: ToolRegistration<GetPaymentMethodsSchema> = {
  name: "get_payment_methods",
  description: "This endpoint retrieves a paginated list of payment methods for a specific customer.",
  inputSchema: getPaymentMethodsSchema,
  handler: async (args: GetPaymentMethodsSchema) => {
    try {
      const parsedArgs = getPaymentMethodsSchema.parse(args);
      const result = await getPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getPaymentMethodsTool handler:", error);
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
