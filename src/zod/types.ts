import { z } from "zod";

// Used to simplify input validation when creating or updating any model

export const BenefitsModel = z.object({
  id: z.string().optional(),
  esDescription: z.string(),
  enDescription: z.string(),
});

export const SponsorModel = z.object({
  id: z.string().optional(),
  name: z.string(),
  img_path: z.string(),
  url: z.string(),
});

export const SponsorPackModel = z.object({
  id: z.string().optional(),
  name: z.string(),
});
