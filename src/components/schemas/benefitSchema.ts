import * as Yup from "yup";

export const benefitSchema = Yup.object().shape({
  benefitEsDescription: Yup.string().required("Required").min(3, "Name too short."),
  benefitEnDescription: Yup.string().required("Required"),
  benefitOrder: Yup.number().required("Required"),
});
