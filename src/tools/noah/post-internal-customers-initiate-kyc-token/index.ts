import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCustomersInitiateKycTokenSchema, postInternalCustomersInitiateKycTokenSchema } from "./schema";

/**
 * Hosted Customer kyc execution
 */
export const postInternalCustomersInitiateKycToken = async (args: PostInternalCustomersInitiateKycTokenSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/customers/initiate-kyc-token', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCustomersInitiateKycTokenTool: ToolRegistration<PostInternalCustomersInitiateKycTokenSchema> = {
  name: "post_internal_customers_initiate_kyc_token",
  description: "Execute a Kyc to fulfil a Customer hosted kyc session",
  inputSchema: postInternalCustomersInitiateKycTokenSchema,
  handler: async (args: PostInternalCustomersInitiateKycTokenSchema) => {
    try {
      const parsedArgs = postInternalCustomersInitiateKycTokenSchema.parse(args);
      const result = await postInternalCustomersInitiateKycToken(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCustomersInitiateKycTokenTool handler:", error);
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
