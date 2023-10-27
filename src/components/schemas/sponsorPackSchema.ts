import * as Yup from "yup";

export const sponsorPackSchema = Yup.object().shape({
  packageName: Yup.string().required("Required"),
  items: Yup.array().of(
    Yup.object().shape({
      esDescription: Yup.string().required('Spanish Description is required'),
      enDescription: Yup.string().required('English Description is required'),
    })
  ),  
});