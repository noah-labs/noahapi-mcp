import { getBalancesTool } from "./get-balances/index.js";
import { getChannelsTool } from "./get-channels/index.js";
import { getChannelsByIdTool } from "./get-channels-by-id/index.js";
import { getChannelsFormTool } from "./get-channels-form/index.js";
import { getChannelsSellTool } from "./get-channels-sell/index.js";
import { getChannelsSellCountriesTool } from "./get-channels-sell-countries/index.js";
import { getCustomersTool } from "./get-customers/index.js";
import { getCustomersByIdTool } from "./get-customers-by-id/index.js";
import { getOnboardingPrefillDocumentsUploadUrlTool } from "./get-onboarding-prefill-documents-upload-url/index.js";
import { getPaymentMethodsTool } from "./get-payment-methods/index.js";
import { getPricesTool } from "./get-prices/index.js";
import { getTransactionsTool } from "./get-transactions/index.js";
import { getTransactionsByIdTool } from "./get-transactions-by-id/index.js";
import { postBeta1RuleTool } from "./post-beta1-rule/index.js";
import { postCheckoutManageTool } from "./post-checkout-manage/index.js";
import { postCheckoutPayinCryptoTool } from "./post-checkout-payin-crypto/index.js";
import { postCheckoutPayinFiatTool } from "./post-checkout-payin-fiat/index.js";
import { postCheckoutPayoutFiatTool } from "./post-checkout-payout-fiat/index.js";
import { postCustomersHostedOnboardingTool } from "./post-customers-hosted-onboarding/index.js";
import { postHelpByIdTool } from "./post-help-by-id/index.js";
import { postHostedWorkflowsBankDepositToOnchainAddressTool } from "./post-hosted-workflows-bank-deposit-to-onchain-address/index.js";
import { postOnboardingTool } from "./post-onboarding/index.js";
import { postOnboardingByIdTool } from "./post-onboarding-by-id/index.js";
import { postOnboardingPrefillTool } from "./post-onboarding-prefill/index.js";
import { postSandboxFiatDepositSimulateTool } from "./post-sandbox-fiat-deposit-simulate/index.js";
import { postTransactionsSellTool } from "./post-transactions-sell/index.js";
import { postTransactionsSellPrepareTool } from "./post-transactions-sell-prepare/index.js";
import { postWorkflowsBankDepositToOnchainAddressTool } from "./post-workflows-bank-deposit-to-onchain-address/index.js";
import { postWorkflowsOnchainDepositToPaymentMethodTool } from "./post-workflows-onchain-deposit-to-payment-method/index.js";
import { putCustomersTool } from "./put-customers/index.js";
import { putCustomersByIdTool } from "./put-customers-by-id/index.js";
import type { ToolRegistration } from "../../types/tools.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createNoahTools = (): ToolRegistration<any>[] => {
  return [
    getBalancesTool,
    getChannelsTool,
    getChannelsByIdTool,
    getChannelsFormTool,
    getChannelsSellTool,
    getChannelsSellCountriesTool,
    getCustomersTool,
    getCustomersByIdTool,
    getOnboardingPrefillDocumentsUploadUrlTool,
    getPaymentMethodsTool,
    getPricesTool,
    getTransactionsTool,
    getTransactionsByIdTool,
    postBeta1RuleTool,
    postCheckoutManageTool,
    postCheckoutPayinCryptoTool,
    postCheckoutPayinFiatTool,
    postCheckoutPayoutFiatTool,
    postCustomersHostedOnboardingTool,
    postHelpByIdTool,
    postHostedWorkflowsBankDepositToOnchainAddressTool,
    postOnboardingTool,
    postOnboardingByIdTool,
    postOnboardingPrefillTool,
    postSandboxFiatDepositSimulateTool,
    postTransactionsSellTool,
    postTransactionsSellPrepareTool,
    postWorkflowsBankDepositToOnchainAddressTool,
    postWorkflowsOnchainDepositToPaymentMethodTool,
    putCustomersTool,
    putCustomersByIdTool,
  ];
};

export default createNoahTools;
