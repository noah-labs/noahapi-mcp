import type { ToolRegistration } from "@/types/tools";
import { type GetInternalChannelsSellSchema, getInternalChannelsSellSchema } from "./schema";

/**
 * Customer Supported Channels
 */
export const getInternalChannelsSell = async (args: GetInternalChannelsSellSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /internal/channels/sell
  
  console.log('Noah API call:', { method: 'GET', path: '/internal/channels/sell', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /internal/channels/sell",
    args
  });
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
