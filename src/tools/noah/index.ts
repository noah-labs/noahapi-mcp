import { getBalancesTool } from "./get-balances/index.js";
import { getChannelsFormTool } from "./get-channels-form/index.js";
import { getChannelsTool } from "./get-channels/index.js";
import { getChannelsSellTool } from "./get-channels-sell/index.js";
import { getChannelsSellCountriesTool } from "./get-channels-sell-countries/index.js";
import { postCheckoutPayinCryptoTool } from "./post-checkout-payin-crypto/index.js";
import { postCheckoutPayinFiatTool } from "./post-checkout-payin-fiat/index.js";
import { postCheckoutPayoutFiatTool } from "./post-checkout-payout-fiat/index.js";
import { getCustomersTool } from "./get-customers/index.js";
import { putCustomersTool } from "./put-customers/index.js";
import { postOnboardingTool } from "./post-onboarding/index.js";
import { postOnboardingPrefillTool } from "./post-onboarding-prefill/index.js";
import { getOnboardingPrefillDocumentsUploadUrlTool } from "./get-onboarding-prefill-documents-upload-url/index.js";
import { getPricesTool } from "./get-prices/index.js";
import { postHostedWorkflowsBankDepositToOnchainAddressTool } from "./post-hosted-workflows-bank-deposit-to-onchain-address/index.js";
import { postWorkflowsBankDepositToOnchainAddressTool } from "./post-workflows-bank-deposit-to-onchain-address/index.js";
import { postWorkflowsOnchainDepositToPaymentMethodTool } from "./post-workflows-onchain-deposit-to-payment-method/index.js";
import { getPaymentMethodsTool } from "./get-payment-methods/index.js";
import { getCustomersTool } from "./get-customers/index.js";
import { postSandboxFiatDepositSimulateTool } from "./post-sandbox-fiat-deposit-simulate/index.js";
import { getTransactionsTool } from "./get-transactions/index.js";
import { getTransactionsTool } from "./get-transactions/index.js";
import { postTransactionsSellTool } from "./post-transactions-sell/index.js";
import { postTransactionsSellPrepareTool } from "./post-transactions-sell-prepare/index.js";
import type { ToolRegistration } from "../../types/tools.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createNoahTools = (): ToolRegistration<any>[] => {
  return [
    getBalancesTool,
    getChannelsFormTool,
    getChannelsTool,
    getChannelsSellTool,
    getChannelsSellCountriesTool,
    postCheckoutPayinCryptoTool,
    postCheckoutPayinFiatTool,
    postCheckoutPayoutFiatTool,
    getCustomersTool,
    putCustomersTool,
    postOnboardingTool,
    postOnboardingPrefillTool,
    getOnboardingPrefillDocumentsUploadUrlTool,
    getPricesTool,
    postHostedWorkflowsBankDepositToOnchainAddressTool,
    postWorkflowsBankDepositToOnchainAddressTool,
    postWorkflowsOnchainDepositToPaymentMethodTool,
    getPaymentMethodsTool,
    getCustomersTool,
    postSandboxFiatDepositSimulateTool,
    getTransactionsTool,
    getTransactionsTool,
    postTransactionsSellTool,
    postTransactionsSellPrepareTool,
  ];
};

export default createNoahTools;
