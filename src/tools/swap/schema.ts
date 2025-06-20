import { z } from "zod";
import { ERC20_TOKENS } from "../../utils/evm/supportedErc20Tokens";

const isAddress = (address: string) => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};

export const quoteSchema = z.object({
  tokenIn: z
    .string()
    .refine(
      (input) => {
        // Check if the input matches any token's name, symbol, or contract address
        return Object.entries(ERC20_TOKENS).some(
          ([key, token]) =>
            key === input ||
            token.symbol === input ||
            token.name === input ||
            token.contractAddress === input
        );
      },
      {
        message:
          "Invalid tokenIn. Please provide a valid token name, symbol, or contract address",
        path: ["tokenIn"],
      }
    )
    .describe("The input token (name, symbol, or contract address)"),
  tokenOut: z
    .string()
    .refine(
      (input) => {
        // Check if the input matches any token's name, symbol, or contract address
        return Object.entries(ERC20_TOKENS).some(
          ([key, token]) =>
            key === input ||
            token.symbol === input ||
            token.name === input ||
            token.contractAddress === input
        );
      },
      {
        message:
          "Invalid tokenOut. Please provide a valid token name, symbol, or contract address",
        path: ["tokenOut"],
      }
    )
    .describe("The output token (name, symbol, or contract address)"),
  amountIn: z.string().describe("The amount of input tokens to swap"),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;

export const swapSchema = z.object({
  tokenIn: z
    .string()
    .refine(
      (input) => {
        // Check if the input is FLOW (native token)
        if (input === "FLOW") return true;

        // Check if the input matches any token's name, symbol, or contract address
        return Object.entries(ERC20_TOKENS).some(
          ([key, token]) =>
            key === input ||
            token.symbol === input ||
            token.name === input ||
            token.contractAddress === input
        );
      },
      {
        message:
          "Invalid tokenIn. Please provide a valid token name, symbol, or contract address",
        path: ["tokenIn"],
      }
    )
    .describe("The input token (name, symbol, or contract address)"),
  tokenOut: z
    .string()
    .refine(
      (input) => {
        // Check if the input is FLOW (native token)
        if (input === "FLOW") return true;

        // Check if the input matches any token's name, symbol, or contract address
        return Object.entries(ERC20_TOKENS).some(
          ([key, token]) =>
            key === input ||
            token.symbol === input ||
            token.name === input ||
            token.contractAddress === input
        );
      },
      {
        message:
          "Invalid tokenOut. Please provide a valid token name, symbol, or contract address",
        path: ["tokenOut"],
      }
    )
    .describe("The output token (name, symbol, or contract address)"),
  amountIn: z.string().describe("The amount of input tokens to swap"),
  slippageTolerance: z
    .number()
    .min(0.1)
    .max(50)
    .default(10)
    .describe("Slippage tolerance in percentage (default: 10%)"),
  flowEVMAccount: z
    .string()
    .refine((addr) => isAddress(addr), {
      message: "Invalid account address format",
      path: ["flowEVMAccount"],
    })
    .describe("The account that will execute the swap"),
  deadline: z
    .number()
    .default(Math.floor(Date.now() / 1000) + 60 * 20) // 20 minutes from now
    .describe("Transaction deadline in seconds (default: 20 minutes from now)"),
});

export type SwapSchema = z.infer<typeof swapSchema>;
