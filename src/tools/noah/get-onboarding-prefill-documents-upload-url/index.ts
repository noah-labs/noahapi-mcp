import type { ToolRegistration } from "@/types/tools";
import { type GetOnboardingPrefillDocumentsUploadUrlSchema, getOnboardingPrefillDocumentsUploadUrlSchema } from "./schema";

/**
 * Get Document Upload URL
 */
export const getOnboardingPrefillDocumentsUploadUrl = async (args: GetOnboardingPrefillDocumentsUploadUrlSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /onboarding/{CustomerID}/prefill/documents/upload-url

  console.log('Noah API call:', { method: 'GET', path: '/onboarding/{CustomerID}/prefill/documents/upload-url', args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /onboarding/{CustomerID}/prefill/documents/upload-url",
    args
  });
};

export const getOnboardingPrefillDocumentsUploadUrlTool: ToolRegistration<GetOnboardingPrefillDocumentsUploadUrlSchema> = {
  name: "get_onboarding_prefill_documents_upload_url",
  description: "Get a URL to upload a document programmatically to add documents to KYC onboarding flows. Multiple types of documents are supported, using the Type parameter described below, both for individual users and company documents for business users. The response consists of a URL, together with the date and time at which it will expire, which should be used like this, for example: curl -X PUT -H 'Content-Type: image/png' --upload-file image.png '{{URL}}' Note: If a document is double-sided, submit two images and set up the optional Side property (Front and Back).",
  inputSchema: getOnboardingPrefillDocumentsUploadUrlSchema,
  handler: async (args: GetOnboardingPrefillDocumentsUploadUrlSchema) => {
    try {
      const parsedArgs = getOnboardingPrefillDocumentsUploadUrlSchema.parse(args);
      const result = await getOnboardingPrefillDocumentsUploadUrl(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getOnboardingPrefillDocumentsUploadUrlTool handler:", error);
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
