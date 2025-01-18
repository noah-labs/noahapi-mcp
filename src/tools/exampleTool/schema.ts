import * as z from "zod";

export const someFunctionSchema = z.object({
	name: z.string(),
});

export type SomeFunctionSchema = z.infer<typeof someFunctionSchema>;
