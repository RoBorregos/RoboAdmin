import * as Yup from "yup";

export const sponsorSchema = Yup.object().shape({
  sponsorName: Yup.string().required("Required").min(3, "Name too short."),
  sponsorImg_path: Yup.string().required("Required"),
  sponsorUrl: Yup.string().required("Required"),
});
