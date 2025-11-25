import { z } from "zod";

export const getOnboardingPrefillDocumentsUploadUrlSchema = z.object({
  CustomerID: z.string().describe("Customer ID for the onboarding session."),
  Type: z.enum(["DrivingLicense", "NationalIDCard", "Passport", "UtilityBill", "ResidencePermit", "ForeignerID", "MemorandumAndArticles", "ShareholdersExtract", "RegistryExtract", "DirectorsExtract", "OngoingMonitoringProcedure", "PEPSanctionsAdverseMediaProcedure", "OnboardingKYCAndCIPProcedure", "CDDEDDProcedure", "SARSTRReportingProcedure", "AntiBriberyCorruptionProcedure", "AMLTrainingScheduleAndRecords", "CorporateShareholderExtract"]).describe("Document type."),
  Side: z.enum(["Front", "Back"]).optional().describe("Document side."),
  CountryCode: z.string(),
  AssociateID: z.string().optional().describe("The ID of the affiliated party associated with the document.")
});

export type GetOnboardingPrefillDocumentsUploadUrlSchema = z.infer<typeof getOnboardingPrefillDocumentsUploadUrlSchema>;
