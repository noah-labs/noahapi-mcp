import type { ToolRegistration } from "@/types";
import { flowBalanceTool } from "./flowBalance";
import { tokenBalanceTool } from "./tokenBalance";
import { coaAccountTool } from "./coaAccount";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
	return [
		{
			...flowBalanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => flowBalanceTool.handler(args),
		},
		{
			...tokenBalanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => tokenBalanceTool.handler(args),
		},
		{
			...coaAccountTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => coaAccountTool.handler(args),
		},
	];
};