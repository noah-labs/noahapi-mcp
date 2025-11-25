import { z } from "zod";

export const putCustomersSchema = z.object({
  CustomerID: z.string(),
  Type: z.enum(["Individual", "Business"]),
  // Individual fields
  FullName: z
    .object({
      FirstName: z.string().describe("user's first name"),
      LastName: z.string().describe("user's last name (family name)"),
      MiddleName: z.string().optional().describe("user's middle name"),
    })
    .optional(),
  DateOfBirth: z.string().optional(),
  Identities: z
    .array(
      z.object({
        IssuingCountry: z.string().describe("Issuing country of the identity, ISO 3166-1 alpha-2 country code."),
        IDNumber: z.string(),
        IssuedDate: z.string().optional(),
        ExpiryDate: z.string().optional(),
        IDType: z.string(),
      }),
    )
    .optional(),
  PrimaryResidence: z
    .object({
      Street: z.string().describe("Street: the primary name of an address's street."),
      Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
      City: z.string().describe("City: name of an address's city or town."),
      PostCode: z.string().describe("PostCode: the address's postcode"),
      State: z
        .string()
        .describe(
          "State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required.",
        ),
      Country: z.string(),
    })
    .optional(),
  Email: z.string().optional().describe("Email address."),
  PhoneNumber: z.string().optional(),
  // Business fields
  RegisteredName: z.string().optional().describe("Name of the business."),
  RegistrationNumber: z.string().optional().describe("Registration number of the business."),
  RegistrationCountry: z.string().optional(),
  RegisteredAddress: z
    .object({
      Street: z.string().describe("Street: the primary name of an address's street."),
      Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
      City: z.string().describe("City: name of an address's city or town."),
      PostCode: z.string().describe("PostCode: the address's postcode"),
      State: z
        .string()
        .describe(
          "State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required.",
        ),
      Country: z.string(),
    })
    .optional(),
  IncorporationDate: z.string().optional(),
});

export type PutCustomersSchema = z.infer<typeof putCustomersSchema>;
