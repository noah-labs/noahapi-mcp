import { z } from "zod";

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
  FullName: z
    .object({
      FirstName: z.string().describe("user's first name"),
      LastName: z.string().describe("user's last name (family name)"),
      MiddleName: z.string().optional().describe("user's middle name"),
    })
    .optional(),
  DateOfBirth: z.string().optional(),
  Email: z.string().optional().describe("Customer's email address."),
  PhoneNumber: z.string().optional(),
  Citizenship: z.string().optional(),
  TaxResidenceCountry: z.string().optional(),
  // Note: This is a simplified schema. Add more fields as needed from the full OpenAPI spec.
});

export type PostOnboardingPrefillSchema = z.infer<typeof postOnboardingPrefillSchema>;
