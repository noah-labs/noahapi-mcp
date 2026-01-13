#!/usr/bin/env bun

import { writeFileSync } from "fs";
import { join } from "path";

// Manually flatten union schemas that cause MCP SDK issues
const toolsDir = join(process.cwd(), "src", "tools", "noah");

// Fix put-customers schema
const putCustomersSchema = `import { z } from "zod";

export const putCustomersSchema = z.object({
  CustomerID: z.string(),
  Type: z.enum(["Individual", "Business"]),
  // Individual fields
  FullName: z.object({
    FirstName: z.string().describe("user's first name"),
    LastName: z.string().describe("user's last name (family name)"),
    MiddleName: z.string().optional().describe("user's middle name")
  }).optional(),
  DateOfBirth: z.string().optional(),
  Identities: z.array(z.object({
    IssuingCountry: z.string().describe("Issuing country of the identity, ISO 3166-1 alpha-2 country code."),
    IDNumber: z.string(),
    IssuedDate: z.string().optional(),
    ExpiryDate: z.string().optional(),
    IDType: z.string()
  })).optional(),
  PrimaryResidence: z.object({
    Street: z.string().describe("Street: the primary name of an address's street."),
    Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
    City: z.string().describe("City: name of an address's city or town."),
    PostCode: z.string().describe("PostCode: the address's postcode"),
    State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
    Country: z.string()
  }).optional(),
  Email: z.string().optional().describe("Email address."),
  PhoneNumber: z.string().optional(),
  // Business fields
  RegisteredName: z.string().optional().describe("Name of the business."),
  RegistrationNumber: z.string().optional().describe("Registration number of the business."),
  RegistrationCountry: z.string().optional(),
  RegisteredAddress: z.object({
    Street: z.string().describe("Street: the primary name of an address's street."),
    Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
    City: z.string().describe("City: name of an address's city or town."),
    PostCode: z.string().describe("PostCode: the address's postcode"),
    State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
    Country: z.string()
  }).optional(),
  IncorporationDate: z.string().optional()
});

export type PutCustomersSchema = z.infer<typeof putCustomersSchema>;
`;

writeFileSync(join(toolsDir, "put-customers", "schema.ts"), putCustomersSchema);
console.log("Fixed put-customers schema");

// Fix put-customers-by-id schema (same as put-customers but with different export name)
const putCustomersByIdSchema = `import { z } from "zod";

export const putCustomersByIdSchema = z.object({
  CustomerID: z.string(),
  Type: z.enum(["Individual", "Business"]),
  // Individual fields
  FullName: z.object({
    FirstName: z.string().describe("user's first name"),
    LastName: z.string().describe("user's last name (family name)"),
    MiddleName: z.string().optional().describe("user's middle name")
  }).optional(),
  DateOfBirth: z.string().optional(),
  Identities: z.array(z.object({
    IssuingCountry: z.string().describe("Issuing country of the identity, ISO 3166-1 alpha-2 country code."),
    IDNumber: z.string(),
    IssuedDate: z.string().optional(),
    ExpiryDate: z.string().optional(),
    IDType: z.string()
  })).optional(),
  PrimaryResidence: z.object({
    Street: z.string().describe("Street: the primary name of an address's street."),
    Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
    City: z.string().describe("City: name of an address's city or town."),
    PostCode: z.string().describe("PostCode: the address's postcode"),
    State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
    Country: z.string()
  }).optional(),
  Email: z.string().optional().describe("Email address."),
  PhoneNumber: z.string().optional(),
  // Business fields
  RegisteredName: z.string().optional().describe("Name of the business."),
  RegistrationNumber: z.string().optional().describe("Registration number of the business."),
  RegistrationCountry: z.string().optional(),
  RegisteredAddress: z.object({
    Street: z.string().describe("Street: the primary name of an address's street."),
    Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
    City: z.string().describe("City: name of an address's city or town."),
    PostCode: z.string().describe("PostCode: the address's postcode"),
    State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
    Country: z.string()
  }).optional(),
  IncorporationDate: z.string().optional()
});

export type PutCustomersByIdSchema = z.infer<typeof putCustomersByIdSchema>;
`;

writeFileSync(join(toolsDir, "put-customers-by-id", "schema.ts"), putCustomersByIdSchema);
console.log("Fixed put-customers-by-id schema");

// Fix post-onboarding-prefill schema (simplified version)
const postOnboardingPrefillSchema = `import { z } from "zod";

// Flattened schema to ensure type: "object" at root (required by MCP SDK)
// This is a simplified version with key fields from all union variants
export const postOnboardingPrefillSchema = z.object({
  CustomerID: z.string(),
  Type: z.enum(["SumSubToken", "BusinessCustomerPrefill", "IndividualCustomerPrefill"]),
  // SumSubToken fields
  Token: z.string().optional().describe("Sumsub token to share applicant."),
  // Business fields (subset - add more as needed)
  RegistrationCountry: z.string().optional(),
  CompanyName: z.string().optional().describe("Name of the company."),
  RegistrationNumber: z.string().optional().describe("Registration number of the business."),
  TaxID: z.string().optional().describe("Tax ID of the business."),
  // Individual fields
  FullName: z.object({
    FirstName: z.string().describe("user's first name"),
    LastName: z.string().describe("user's last name (family name)"),
    MiddleName: z.string().optional().describe("user's middle name")
  }).optional(),
  DateOfBirth: z.string().optional(),
  Email: z.string().optional().describe("Customer's email address."),
  PhoneNumber: z.string().optional(),
  Citizenship: z.string().optional(),
  TaxResidenceCountry: z.string().optional()
  // Note: This is a simplified schema. Add more fields as needed from the full OpenAPI spec.
});

export type PostOnboardingPrefillSchema = z.infer<typeof postOnboardingPrefillSchema>;
`;

writeFileSync(join(toolsDir, "post-onboarding-prefill", "schema.ts"), postOnboardingPrefillSchema);
console.log("Fixed post-onboarding-prefill schema");

console.log("\nDone! Union schemas have been flattened for MCP compatibility.");
