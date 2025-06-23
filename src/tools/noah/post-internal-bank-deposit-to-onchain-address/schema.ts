import { z } from "zod";

export const postInternalBankDepositToOnchainAddressSchema = z.object({});

export type PostInternalBankDepositToOnchainAddressSchema = z.infer<typeof postInternalBankDepositToOnchainAddressSchema>;
