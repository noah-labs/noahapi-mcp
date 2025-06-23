import type { ToolRegistration } from "@/types/tools";
import { type DeleteInternalFiatPaymentMethodsSchema, deleteInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Delete Fiat Payment Method
 */
export const deleteInternalFiatPaymentMethods = async (args: DeleteInternalFiatPaymentMethodsSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: DELETE
  // Path: /internal/fiat-payment-methods/{ID}
  
  console.log('Noah API call:', { method: 'DELETE', path: '/internal/fiat-payment-methods/{ID}', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "DELETE /internal/fiat-payment-methods/{ID}",
    args
  });
};

export const deleteInternalFiatPaymentMethodsTool: ToolRegistration<DeleteInternalFiatPaymentMethodsSchema> = {
  name: "delete_internal_fiat_payment_methods",
  description: "Deletes a fiat payment method for the customer",
  inputSchema: deleteInternalFiatPaymentMethodsSchema,
  handler: async (args: DeleteInternalFiatPaymentMethodsSchema) => {
    try {
      const parsedArgs = deleteInternalFiatPaymentMethodsSchema.parse(args);
      const result = await deleteInternalFiatPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in deleteInternalFiatPaymentMethodsTool handler:", error);
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
