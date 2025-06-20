import { flowBalanceTool } from "./flowBalance/index.js";
import { tokenBalanceTool } from "./tokenBalance/index.js";
import { coaAccountTool } from "./coaAccount/index.js";
import { getContractTool } from "./getContract/index.js";
import { accountInfoTool } from "./accountInfo/index.js";
import { childAccountTool } from "./childAccount/index.js";
import type { ToolRegistration } from "../types/tools.js";
// import { queryTool } from "./query/index.js";
import { getTokenPriceTool } from "./getTokenPrice/index.js";
import { getTrendingPoolsTool } from "./getTrendingPools/index.js";
import { getPoolsByTokenTool } from "./getPoolsByToken/index.js";
import { getTokenInfoTool } from "./getTokenInfo/index.js";
import { getTokenPriceHistoryTool } from "./getTokenPriceHistory/index.js";
import { punchswapQuoteTool, punchswapSwapTool } from "./swap/index.js";
import { getErc20TokensTool, transferErc20TokenTool } from "./erc20/index.js";
import { getEVMTransactionTool } from "./flowscan/index.js";
import { getFlowHistoryPriceTool } from "./getFlowHistoryPrice/index.js";

// Union type for both tool registration types
type AnyToolRegistration =
  | ToolRegistration<any>
  | {
      name: string;
      description: string;
      inputSchema: any;
      handler: (args: any) => any | Promise<any>;
    };

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): AnyToolRegistration[] => {
  return [
    flowBalanceTool,
    tokenBalanceTool,
    coaAccountTool,
    getContractTool,
    accountInfoTool,
    childAccountTool,
    // queryTool,
    getTokenPriceTool,
    getTrendingPoolsTool,
    getPoolsByTokenTool,
    getTokenInfoTool,
    getTokenPriceHistoryTool,
    punchswapQuoteTool,
    punchswapSwapTool,
    getErc20TokensTool,
    transferErc20TokenTool,
    getEVMTransactionTool,
    getFlowHistoryPriceTool,
  ];
};

export default createTools;
