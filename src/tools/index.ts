import { createNoahTools } from "./noah/index.js";
import type { ToolRegistration } from "../types/tools.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [
    // Noah Business API tools
    ...createNoahTools(),
  ];
};

export default createTools;
