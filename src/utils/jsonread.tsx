import { jsonSponsorFormat } from "../zod/types";

const sponsorURL =
  "https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/data/sponsors.json";

export const SponsorsInfo = async ({ url = sponsorURL }: { url?: string }) => {
  try {
    const response = await fetch(url);
    const sponsorData = await response.json();
    const sponsorObject = jsonSponsorFormat.parse(sponsorData);
    return sponsorObject;
  } catch (error) {
    console.log(error);
    return "Error en formato de sponsors.json. Url: " + url;
  }
};
