// Generate Json file to be commited to the repository

import type { DB } from "rbrgs/server/db";
import { jsonSponsorFormat } from "rbrgs/zod/types";

export const generateSponsorsJson = async ({ db }: { db: DB }) => {
  const sponsorsInfoDb = await db.sponsor.findMany({
    select: {
      id: true,
      name: true,
      img_path: true,
      url: true,
    },
  });

  const packagesInfoDb = await db.sponsorPack.findMany({
    select: {
      name: true,
      benefits: {
        select: {
          esDescription: true,
          enDescription: true,
        },
      },
    },
  });

  const sponsorJsonFormat = sponsorsInfoDb.map((sponsor) => ({
    name: sponsor.name,
    img_path: sponsor.img_path,
    link: sponsor.url,
  }));

  const packagesJsonFormat = packagesInfoDb.map((sponsorPackage) => ({
    name: sponsorPackage.name,
    benefits: sponsorPackage.benefits.map((benefit) => ({
      es: benefit.esDescription,
      en: benefit.enDescription,
    })),
  }));

  const sponsorsObject = {
    url_contact: "mailto:teamroborregos@gmail.com",
    sponsors: sponsorJsonFormat,
    packages: packagesJsonFormat,
  };

  const sponsorsJson = JSON.stringify(sponsorsObject);

  try {
    // Use the same validation as when fetching the json
    const validate = jsonSponsorFormat.safeParse(sponsorsObject);
  } catch (error) {
    console.log(error);
    return -1;
  }

  return sponsorsJson;
};
