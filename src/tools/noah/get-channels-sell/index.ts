import type { ToolRegistration } from "@/types/tools";
import { type GetChannelsSellSchema, getChannelsSellSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Supported Channels
 */
export const getChannelsSell = async (args: GetChannelsSellSchema): Promise<string> => {
  try {
    const response = await noahClient.get('/channels/sell', args);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    const data = response.data as any;
    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Retrieved ${data?.Items?.length || 0} available channels for selling ${args.CryptoCurrency}`,
      availableChannels: data?.Items?.map((item: any) => ({
        id: item.ID,
        paymentCategory: item.PaymentMethodCategory,
        country: item.Country,
        fiatCurrency: item.FiatCurrency,
      })) || [],
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
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
