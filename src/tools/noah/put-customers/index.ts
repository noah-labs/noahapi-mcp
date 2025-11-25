import type { ToolRegistration } from "@/types/tools";
import { type PutCustomersSchema, putCustomersSchema } from "./schema";

/**
 * Create/Update Customer
 */
export const putCustomers = async (args: PutCustomersSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: PUT
  // Path: /customers/{CustomerID}

  console.log("Noah API call:", { method: "PUT", path: "/customers/{CustomerID}", args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "PUT /customers/{CustomerID}",
    args,
  });
};

export const putCustomersTool: ToolRegistration<PutCustomersSchema> = {
  name: "put_customers",
  description:
    "This endpoint initiates [Noah's Reliance Model onboarding flow](../getting-started/kyc#reliance-model). Customers created from this endpoint must have a valid KYC status at the point of passing this data to Noah, and when executing a transaction. A unique CustomerID must be provided to enable unique identification in Noah. Customers are approved synchronously from the API call, and are immediately available to transact. Before you get started with this endpoint, Noah must have authorized your usage of the Reliance Model. For more details on this process, see the [Compliance Overview](../getting-started/kyc). Follow the step-by-step guide: [Reliance Onboarding Recipe](../recipes/onboarding/reliance-onboarding) Note: Customers created from this endpoint are not able to process USD payments. In this case, follow the step-by-step guide for onboarding for USD payments: [Hosted Onboarding Recipe](../recipes/onboarding/hosted-onboarding)",
  inputSchema: putCustomersSchema,
  handler: async (args: PutCustomersSchema) => {
    try {
      const parsedArgs = putCustomersSchema.parse(args);
      const result = await putCustomers(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in putCustomersTool handler:", error);
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
