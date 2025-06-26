import { getBalancesTool } from "./get-balances/index.js";
import { postBeta1RuleTool } from "./post-beta1-rule/index.js";
import { getChannelsFormTool } from "./get-channels-form/index.js";
import { getChannelsSellTool } from "./get-channels-sell/index.js";
import { getChannelsSellCountriesTool } from "./get-channels-sell-countries/index.js";
import { postCheckoutManageTool } from "./post-checkout-manage/index.js";
import { postCheckoutPayinCryptoTool } from "./post-checkout-payin-crypto/index.js";
import { postCheckoutPayinFiatTool } from "./post-checkout-payin-fiat/index.js";
import { postCheckoutPayoutFiatTool } from "./post-checkout-payout-fiat/index.js";
import { getCustomersTool } from "./get-customers/index.js";
import { getCustomersByIdTool } from "./get-customers-by-id/index.js";
import { putCustomersTool } from "./put-customers/index.js";
import { postCustomersHostedOnboardingTool } from "./post-customers-hosted-onboarding/index.js";
import { postHostedWorkflowsBankDepositToOnchainAddressTool } from "./post-hosted-workflows-bank-deposit-to-onchain-address/index.js";
import { postOnboardingTool } from "./post-onboarding/index.js";
import { postOnboardingPrefillTool } from "./post-onboarding-prefill/index.js";
import { getPaymentMethodsTool } from "./get-payment-methods/index.js";
import { getPricesTool } from "./get-prices/index.js";
import { postSandboxFiatDepositSimulateTool } from "./post-sandbox-fiat-deposit-simulate/index.js";
import { getTransactionsTool } from "./get-transactions/index.js";
import { getTransactionsByIdTool } from "./get-transactions-by-id/index.js";
import { postTransactionsSellTool } from "./post-transactions-sell/index.js";
import { postTransactionsSellPrepareTool } from "./post-transactions-sell-prepare/index.js";
import { postWorkflowsBankDepositToOnchainAddressTool } from "./post-workflows-bank-deposit-to-onchain-address/index.js";
import type { ToolRegistration } from "../../types/tools.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createNoahTools = (): ToolRegistration<any>[] => {
  return [
  getBalancesTool,
  postBeta1RuleTool,
  getChannelsFormTool,
  getChannelsSellTool,
  getChannelsSellCountriesTool,
  postCheckoutManageTool,
  postCheckoutPayinCryptoTool,
  postCheckoutPayinFiatTool,
  postCheckoutPayoutFiatTool,
  getCustomersTool,
  getCustomersByIdTool,
  putCustomersTool,
  postCustomersHostedOnboardingTool,
  postHostedWorkflowsBankDepositToOnchainAddressTool,
  postOnboardingTool,
  postOnboardingPrefillTool,
  getPaymentMethodsTool,
  getPricesTool,
  postSandboxFiatDepositSimulateTool,
  getTransactionsTool,
  getTransactionsByIdTool,
  postTransactionsSellTool,
  postTransactionsSellPrepareTool,
  postWorkflowsBankDepositToOnchainAddressTool
  ];
};

export default createNoahTools;
