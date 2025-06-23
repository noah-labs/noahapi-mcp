import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetChannelsSellSchema, getChannelsSellSchema } from "./schema";

/**
 * Supported Channels
 */
export const getChannelsSell = async (args: GetChannelsSellSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/channels/sell');
  
  return JSON.stringify(result, null, 2);
};

export const getChannelsSellTool: ToolRegistration<GetChannelsSellSchema> = {
  name: "get_channels_sell",
  description: "List of supported channels for selling crypto into fiat.",
  inputSchema: getChannelsSellSchema,
  handler: async (args: GetChannelsSellSchema) => {
    try {
      const parsedArgs = getChannelsSellSchema.parse(args);
      const result = await getChannelsSell(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getChannelsSellTool handler:", error);
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
