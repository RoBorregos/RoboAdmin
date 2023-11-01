import { z } from "zod";

// Used to simplify input validation when creating or updating any model

export const BenefitsModel = z.object({
  id: z.string().optional(),
  esDescription: z.string(),
  enDescription: z.string(),
  order: z.number().optional(),
});

export const SponsorModel = z.object({
  id: z.string().optional(),
  name: z.string(),
  img_path: z.string(),
  url: z.string(),
  order: z.number().optional(),
});

export const SponsorPackModel = z.object({
  id: z.string().optional(),
  name: z.string(),
  items: z.array(BenefitsModel),
  order: z.number().optional(),
});

export const jsonSponsorFormat = z.object({
  url_contact: z.string(),
  sponsors: z.array(
    z.object({
      name: z.string(),
      img_path: z.string(),
      link: z.string(),
    }),
  ),
  packages: z.array(
    z.object({
      name: z.string(),
      benefits: z.array(
        z.object({
          es: z.string(),
          en: z.string(),
        }),
      ),
    }),
  ),
});
