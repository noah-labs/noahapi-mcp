import type { ToolRegistration } from "@/types/tools";
import { type PutCustomersSchema, putCustomersSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create/Update Customer
 */
export const putCustomers = async (args: PutCustomersSchema): Promise<string> => {
  try {
    const { CustomerID, ...bodyData } = args;
    const endpoint = noahClient.replacePath("/customers/{CustomerID}", { CustomerID });
    const response = await noahClient.put(endpoint, bodyData);

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
        summary: `Successfully created/updated customer ${CustomerID}`,
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
