import { z } from "zod";
import { ERC20_TOKENS } from "../../utils/evm/supportedErc20Tokens";

const isAddress = (address: string) => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};

export const getErc20TokenSchema = z.object({
  address: z
    .string()
    .refine((addr) => isAddress(addr), {
      message: "Invalid address format",
      path: ["address"],
    })
    .describe("The address to get the erc20 tokens for"),
});

export type GetErc20TokenSchema = z.infer<typeof getErc20TokenSchema>;
