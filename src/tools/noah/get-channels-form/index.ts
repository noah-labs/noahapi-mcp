import type { ToolRegistration } from "@/types/tools";
import { type GetChannelsFormSchema, getChannelsFormSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Dynamic Form
 */
export const getChannelsForm = async (args: GetChannelsFormSchema): Promise<string> => {
  try {
    const { ChannelID, PaymentMethodID } = args;
    const endpoint = noahClient.replacePath('/channels/{ChannelID}/form', { ChannelID });
    const queryParams = PaymentMethodID ? { PaymentMethodID } : {};
    const response = await noahClient.get(endpoint, queryParams);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Successfully retrieved form schema for channel ${ChannelID}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const getChannelsFormTool: ToolRegistration<GetChannelsFormSchema> = {
  name: "get_channels_form",
  description: "This endpoint provides a [JSONForm](https://jsonforms.io/) schema needed to configure payment methods for transactions on a specified channel. Use this schema to dynamically generate forms based on the selected payment method. The ChannelID parameter, obtainable from the Supported Channels endpoint, specifies the target channel for which the form is generated. Note: It is not possible to fetch schemas for channels where the PaymentMethodType is set to TokenizedCard, as the API does not directly accept credit card details. For credit card payments, please refer to the [Hosted Checkout](../recipes/hosted/hosted-checkout) solution.",
  inputSchema: getChannelsFormSchema,
  handler: async (args: GetChannelsFormSchema) => {
    try {
      const parsedArgs = getChannelsFormSchema.parse(args);
      const result = await getChannelsForm(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getChannelsFormTool handler:", error);
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
