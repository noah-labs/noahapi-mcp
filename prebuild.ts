import { createTools } from "@/tools";
import { validateSchemaDescriptions } from "@/utils/validateSchemaDescriptions";
import type { JSONSchema7 } from "json-schema";

const tools = createTools();

for (const tool of tools) {
    validateSchemaDescriptions(tool.inputSchema as JSONSchema7);
}