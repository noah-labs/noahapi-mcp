import { z } from "zod";

export const postCheckoutPayoutFiatSchema = z.object({
  CryptoCurrency: z.string(),
  FiatCurrency: z.string(),
  FiatAmount: z.string(),
  CryptoAuthorizedAmount: z.string().describe("Maximum amount that can be charged for this transaction."),
  ReturnURL: z.string(),
  ExternalID: z.string().optional(),
  CustomerID: z.string().describe("Identifies the customer in business' system"),
  Customer: z.union([z.object({
  Type: z.enum(["Individual"]),
  FullName: z.object({
  FirstName: z.string().describe("user's first name"),
  LastName: z.string().describe("user's last name (family name)"),
  MiddleName: z.string().optional().describe("user's middle name")
}),
  DateOfBirth: z.string(),
  Email: z.string().optional().describe("Customer's email address."),
  PhoneNumber: z.string().optional(),
  Identities: z.array(z.object({
  IssuingCountry: z.string().describe("Issuing country of the identity, ISO 3166-1 alpha-2 country code."),
  IDNumber: z.string(),
  IssuedDate: z.string().optional(),
  ExpiryDate: z.string().optional(),
  IDType: z.string()
})),
  PrimaryResidence: z.object({
  Street: z.string().describe("Street: the primary name of an address's street."),
  Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
  City: z.string().describe("City: name of an address's city or town."),
  PostCode: z.string().describe("PostCode: the address's postcode"),
  State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
  Country: z.string()
})
}), z.object({
  Type: z.enum(["Business"]),
  RegisteredName: z.string().describe("Name of the business."),
  Email: z.string().optional().describe("Email address of the business."),
  RegistrationNumber: z.string().describe("Registration number of the business."),
  RegistrationCountry: z.string(),
  RegisteredAddress: z.object({
  Street: z.string().describe("Street: the primary name of an address's street."),
  Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
  City: z.string().describe("City: name of an address's city or town."),
  PostCode: z.string().describe("PostCode: the address's postcode"),
  State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
  Country: z.string()
}),
  IncorporationDate: z.string()
})]).optional(),
  LineItems: z.array(z.object({
  Description: z.string().describe("Description of the line item."),
  Quantity: z.string().describe("Quantity of the line item. Must be greater than zero."),
  UnitAmount: z.string().describe("Amount of a single unit of the line item. Must be in the same currency as the transaction."),
  TotalAmount: z.string().describe("Total amount of the line item (UnitAmount * Quantity). Must be in the same currency as the transaction.")
})).describe("List of line items that your customer is getting paid for using this Hosted Checkout Session. This is used for display purposes for the customer during Checkout as well as remediation of disputed payments."),
  Nonce: z.string()
});

export type PostCheckoutPayoutFiatSchema = z.infer<typeof postCheckoutPayoutFiatSchema>;
