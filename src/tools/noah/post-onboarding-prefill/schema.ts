import { z } from "zod";

export const postOnboardingPrefillSchema = z.object({
  CustomerID: z.string()
}).and(z.union([z.object({
  Type: z.enum(["SumSubToken"]),
  Token: z.string().describe("Sumsub token to share applicant.")
}), z.object({
  Type: z.enum(["BusinessCustomerPrefill"]),
  RegistrationCountry: z.string().optional(),
  CompanyName: z.string().optional().describe("Name of the company."),
  RegistrationNumber: z.string().optional().describe("Registration number of the business."),
  LegalAddress: z.object({
  Street: z.string().describe("Street: the primary name of an address's street."),
  Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
  City: z.string().describe("City: name of an address's city or town."),
  PostCode: z.string().describe("PostCode: the address's postcode"),
  State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
  Country: z.string()
}).optional(),
  IncorporationDate: z.string().optional(),
  EntityType: z.enum(["LimitedLiabilityCompany", "PublicCompany", "SoleProprietorship", "Partnership", "Corporation", "Trust", "PrivateFoundation", "Charity", "NonProfitOrganization", "PublicAgency"]).optional(),
  TaxID: z.string().optional().describe("Tax ID of the business."),
  PrimaryWebsite: z.string().optional().describe("Primary website of the business."),
  TradeName: z.string().optional().describe("Trade name of the business (DBA)."),
  RegisteredForeignBranches: z.array(z.object({
  Name: z.string().optional().describe("Name of the registered foreign branch."),
  RegistrationCountry: z.string().optional(),
  RegistrationNumber: z.string().optional().describe("Registration number of the registered foreign branch.")
})).optional().describe("List of your registered foreign branches, including registered country and any applicable registration numbers"),
  PrimaryPhysicalAddress: z.object({
  Street: z.string().describe("Street: the primary name of an address's street."),
  Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
  City: z.string().describe("City: name of an address's city or town."),
  PostCode: z.string().describe("PostCode: the address's postcode"),
  State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
  Country: z.string()
}).optional(),
  OwnershipType: z.enum(["Private", "PublicListed", "GovernmentOwned", "Partnership", "SoleProprietorship", "NonProfit", "Cooperative", "JointVenture", "ForeignOwned", "Subsidiary", "TrustOwned", "CommunityOwned", "FoundationOwned", "LLC"]).optional().describe("Ownership type"),
  LegalEntityIdentifier: z.string().optional().describe("Legal entity identifier (LEI) code of the business."),
  NAICSCode: z.string().optional().describe("Please provide your NAICS (North American Industry Classification System) code. If you do not have a NAICS code, please select the closest corresponding code that best matches your industry classification - https://www.naics.com/search/"),
  SourceOfFunds: z.enum(["Revenue", "Investments", "LoansCredits", "TradingIncome", "CryptoMining", "ClientFunds"]).optional().describe("What will be the source of incoming funds to your account?"),
  FinancialsUsd: z.object({
  EstimatedMonthlyTurnover: z.enum(["UpTo15k", "UpTo50k", "UpTo100k", "UpTo500k", "Above500k"]).optional().describe("What is the estimated monthly turnover for your account, including both incoming and outgoing transactions?"),
  EstimatedTransactionValue: z.enum(["UpTo5k", "UpTo15k", "UpTo50k", "UpTo100k", "Above100k"]).optional().describe("Please specify the planned value of one-time transaction:")
}).optional(),
  MonthlyTransactionFrequency: z.enum(["UpTo10", "UpTo20", "UpTo50", "Above50"]).optional().describe("What is the expected frequency of transactions per month?"),
  Associates: z.array(z.object({
  ID: z.string().describe("Associate ID."),
  RelationshipTypes: z.array(z.enum(["UBO", "Representative"])).describe("Relationship types."),
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
  TaxResidenceCountry: z.string().optional(),
  Email: z.string().optional().describe("UBO email address."),
  PhoneNumber: z.string().optional(),
  ResidentialAddress: z.object({
  Street: z.string().describe("Street: the primary name of an address's street."),
  Street2: z.string().optional().describe("Street2: the secondary name of an address's street."),
  City: z.string().describe("City: name of an address's city or town."),
  PostCode: z.string().describe("PostCode: the address's postcode"),
  State: z.string().describe("State: the address's state / province / county. For USA and Canada, state code in ISO 3166-2 code (e.g. CA) is required."),
  Country: z.string()
}).optional(),
  UBO: z.object({
  OwnershipPercentage: z.number().optional().describe("Percentage of ownership held by the UBO.")
}).optional()
})).optional().describe("Information about UBOs (25% of more of ownership) and Representatives."),
  BusinessAssociates: z.array(z.object({
  ID: z.string().describe("Shareholder ID."),
  RegistrationCountry: z.string().optional(),
  CompanyName: z.string().optional().describe("Shareholders company name."),
  RegistrationNumber: z.string().optional().describe("Shareholders registration number."),
  EntityType: z.enum(["LimitedLiabilityCompany", "PublicCompany", "SoleProprietorship", "Partnership", "Corporation", "Trust", "PrivateFoundation", "Charity", "NonProfitOrganization", "PublicAgency"]).optional(),
  IncorporationDate: z.string().optional(),
  OwnershipPercentage: z.number().optional().describe("Shareholders ownership percentage.")
})).optional().describe("Information about Corporate Shareholders (25% of more of ownership)."),
  AMLCTFRegulated: z.object({
  SupervisoryAuthorityName: z.string().optional().describe("Please provide the name of the supervisory authority."),
  LicenseNumber: z.string().optional().describe("Please provide the license number."),
  HasAppointedMLRO: z.boolean().optional().describe("Has the business appointed an MLRO (Money Laundering Reporting Officer)?"),
  CustomerRiskSplit: z.object({
  LowRisk: z.number().describe("Low-risk customers"),
  MediumRisk: z.number().describe("Medium-risk customers"),
  HighRisk: z.number().describe("High-risk customers")
}).optional().describe("Indicate in % how many low-risk, medium-risk, and high-risk customers the company has."),
  ProhibitsAnonOrFictiousAccounts: z.boolean().optional().describe("Does the company prohibit the opening and keeping of anonymous and fictitious named accounts?"),
  ProhibitsAccountsForUnlicensedOrShellCustomers: z.boolean().optional().describe("Does the company prohibit the opening and keeping of accounts for unlicensed or shell customers?"),
  CustomerIdentityVerification: z.object({
  Method: z.enum(["Automated", "Manual"]).describe("Does the company integrate an automated or manual screening?"),
  System: z.string().optional().describe("If the method is Automated, please specify the system/software.")
}).optional().describe("If the company verifies the identity of the customer (including ultimate beneficial owners, company directors and representatives), specify whether the company uses an automated or manual screening method?"),
  PEPAndSanctions: z.object({
  Method: z.enum(["Automated", "Manual"]).describe("Does the company integrate an automated or manual screening?"),
  System: z.string().optional().describe("If the method is Automated, please specify the system/software.")
}).optional().describe("If the company screens its customers against PEP and sanctions, specify whether the company uses an automated or manual PEP and sanctions screening method?"),
  SanctionLists: z.array(z.string()).optional().describe("If the company does not screen its customers against PEP and sanctions, indicate what sanctions lists the Company uses to screen customers."),
  CustomerRiskClassificationFromDueDiligence: z.boolean().optional().describe("Does the due diligence process result in customers receiving a risk classification?"),
  EDDProcess: z.boolean().optional().describe("Does the company apply an enhanced due diligence process?"),
  TransactionMonitoring: z.object({
  Method: z.enum(["Automated", "Manual"]).describe("Does the company integrate an automated or manual screening?"),
  System: z.string().optional().describe("If the method is Automated, please specify the system/software.")
}).optional().describe("Does the Company integrate automated or manual transaction monitoring methods?"),
  ProceduresForTransactionMonitoring: z.boolean().optional().describe("Does the company have procedures to identify transactions structured to avoid large cash/transactions reporting requirements?"),
  SubjectToMLOrTFInvestigation: z.string().optional().describe("Has the company been subject to a money laundering or terrorist financing investigation? If yes, please provide further details:"),
  SubjectToRegulatoryEnforcementPast2Years: z.string().optional().describe("Has the company been the subject, in the past two years, of regulatory enforcement for inadequate AML/CTF policies and procedures and/or breaches of AML/CTF? If yes, please provide further details:"),
  ConfirmsNoServiceToSanctionedCountries: z.boolean().optional().describe("Does the company confirm that it does not provide services to individuals or entities which are residents of sanctioned countries. Sanctioned countries: Afghanistan, Belarus, Bhutan, Burundi, Democratic Republic of the Congo, Cuba, Gaza Strip, Guinea-Bissau, Haiti, Iran, Islamic Republic of Iraq, Kenya, Kosovo, Lebanon, Libya, Mozambique, Myanmar, Niger, North Korea(Democratic People’s Republic of Korea), Pakistan, Qatar, Russian Federation, Somalia, South Sudan, Sudan, Syria, Ukrainian Territories(Crimea, Sevastopol, Donetsk, Kherson, Luhansk, Zaporizhzhia), Venezuela, West Bank (Palestinian Territory, Occupied), Yemen, Zimbabwe"),
  ClientFundsAccessibility: z.enum(["ClosedLoop", "OpenLoop", "NotTransferred"]).optional().describe("If the client's funds are transferred to the Company's external wallet or bank account, will they be accessible through:\n\nClosed-loop – Funds can only be withdrawn by the client as instructed.\nOpen-loop – Funds can be accessed and used freely by the client.\nClient funds will not be transferred to the external company wallet."),
  AMLCTFAudit: z.boolean().optional().describe("Has the company had AML/CTF audit?"),
  AuditDate: z.string().optional().describe("if AMLCTFAudit is false, please clarify when the AML/CTF audit is planned")
}).optional().describe("This section is required if the business is subject to regulatory oversight that requires compliance with Anti-Money Laundering (AML) regulations.")
}), z.object({
  Type: z.enum(["IndividualCustomerPrefill"]),
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
  Citizenship: z.string().optional(),
  TaxResidenceCountry: z.string().optional(),
  Email: z.string().optional().describe("Customer's email address."),
  PhoneNumber: z.string().optional(),
  SourceOfIncome: z.enum(["Salary", "Pension", "Investment", "Property", "FriendsAndFamily", "Benefits"]).optional().describe("What's your main source of income?"),
  EmploymentStatus: z.enum(["Employed", "Unemployed", "Retired", "Student", "SelfEmployed"]).optional().describe("What's your employment status?"),
  WorkIndustry: z.enum(["BankingAndFinancialServices", "InvestmentAndSecurities", "Insurance", "RealEstate", "LegalServices", "AccountingAndAuditing", "GamingAndGambling", "MiningAndEnergy", "RetailAndECommerce", "HealthcareAndPharmaceuticals", "GovernmentAndPublicSector", "NonProfitAndCharity", "TechnologyAndSoftwareDevelopment", "TransportationAndLogistics", "HospitalityAndTourism"]).optional().describe("What industry do you work in?"),
  FinancialsUsd: z.object({
  AnnualDeposit: z.enum(["LessThan5k", "5kTo50k", "50kTo150k", "MoreThan150k"]).optional().describe("What's your expected annual deposit?")
}).optional(),
  TransactionFrequency: z.enum(["OncePerYear", "OnceEveryFewMonths", "AFewTimesPerMonth", "OncePerWeek", "MoreThanOncePerWeek"]).optional().describe("What's your expected frequency of transactions?")
})]));

export type PostOnboardingPrefillSchema = z.infer<typeof postOnboardingPrefillSchema>;
