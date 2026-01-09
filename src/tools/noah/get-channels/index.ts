import type { ToolRegistration } from "@/types/tools";
import { type GetChannelsSchema, getChannelsSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Get Channel by ID
 */
export const getChannels = async (args: GetChannelsSchema): Promise<string> => {
  try {
    const { ChannelID, ...queryParams } = args;
    const endpoint = noahClient.replacePath("/channels/{ChannelID}", { ChannelID });
    const response = await noahClient.get(endpoint, queryParams);

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
        summary: `Successfully retrieved channel ${ChannelID}`,
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

export const getChannelsTool: ToolRegistration<GetChannelsSchema> = {
  name: "get_channels",
  description:
    "This endpoint retrieves detailed information about a specific channel by its ID. The endpoint returns a single channel with calculated fees, limits, and processing information for the specified cryptocurrency and optional fiat amount. Use this endpoint when you know the specific channel ID and want to get detailed information about that channel.",
  inputSchema: getChannelsSchema,
  handler: async (args: GetChannelsSchema) => {
    try {
      const parsedArgs = getChannelsSchema.parse(args);
      const result = await getChannels(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getChannelsTool handler:", error);
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
