import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalChannelsSellSchema, getInternalChannelsSellSchema } from "./schema";

/**
 * Customer Supported Channels
 */
export const getInternalChannelsSell = async (args: GetInternalChannelsSellSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/channels/sell');
  
  return JSON.stringify(result, null, 2);
};

export const getInternalChannelsSellTool: ToolRegistration<GetInternalChannelsSellSchema> = {
  name: "get_internal_channels_sell",
  description: "List of supported channels for selling crypto into fiat.",
  inputSchema: getInternalChannelsSellSchema,
  handler: async (args: GetInternalChannelsSellSchema) => {
    try {
      const parsedArgs = getInternalChannelsSellSchema.parse(args);
      const result = await getInternalChannelsSell(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalChannelsSellTool handler:", error);
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
