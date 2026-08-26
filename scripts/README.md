# Code Generation Scripts

## Overview

This directory contains scripts for generating MCP tools from the Noah OpenAPI specification.

## Scripts

### `generate-noah-tools.ts`

Generates MCP tool files from `oas-schema.generated.json`. Creates:
- Tool schemas (Zod validation)
- Tool handlers (placeholder implementations)
- Tool registrations

**Note**: This script generates union schemas (e.g., `z.union([...])`) for endpoints with multiple request body variants, which are not compatible with the MCP SDK's requirement for `type: "object"` at the root level.

### `fix-union-schemas.ts`

Post-processes generated tools to fix union schema issues. Currently handles:
- `put-customers`: Flattens Individual/Business union into a single object
- `post-onboarding-prefill`: Flattens SumSubToken/BusinessCustomerPrefill/IndividualCustomerPrefill union

**Manual Flattening**: These schemas are hardcoded in `fix-union-schemas.ts`. If the OpenAPI spec changes, you may need to update these manual fixes.

## Usage

To regenerate all tools:

```bash
bun run generate
```

This runs both scripts in sequence:
1. `generate-noah-tools.ts` - generates all tools from OpenAPI spec
2. `fix-union-schemas.ts` - applies manual fixes to union schemas

## Why Manual Flattening?

The MCP SDK requires all tool `inputSchema` to have `type: "object"` at the root level. When the OpenAPI spec contains `oneOf`/`anyOf` (unions), these don't convert to JSON Schema with a root `type` field, causing validation errors.

The fix is to "flatten" unions into a single object where:
- `Type` field becomes an enum of all variant types
- All variant-specific fields become optional
- Fields common to all variants remain required

### Example

**Before (union)**:
```typescript
z.union([
  z.object({ Type: z.literal("A"), fieldA: z.string() }),
  z.object({ Type: z.literal("B"), fieldB: z.number() })
])
```

**After (flattened)**:
```typescript
z.object({
  Type: z.enum(["A", "B"]),
  fieldA: z.string().optional(),
  fieldB: z.number().optional()
})
```

## Adding New Manual Fixes

If you encounter new union schemas that cause MCP validation errors:

1. Identify the tool with the error (check the error message for the tool index)
2. Add a new fix in `fix-union-schemas.ts` following the existing pattern
3. Create a flattened object schema with all fields optional
4. Run `bun run generate` to apply the fix

## Future Improvements

- Auto-detect union schemas and flatten them programmatically
- Parse nested objects properly for complete flattening
- Generate more comprehensive field lists from OpenAPI spec
