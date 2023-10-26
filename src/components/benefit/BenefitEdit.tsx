import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "rbrgs/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { RouterOutputs } from "rbrgs/utils/api";
import { benefitSchema } from "../schemas/benefitSchema";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const BenefitEdit = ({
  benefit,
}: {
  benefit: RouterOutputs["sponsor"]["getBenefitById"] | undefined | null;
}) => {
  const context = api.useContext();
  const router = useRouter();

  const mutationModify = api.sponsor.createOrUpdateBenefit.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Benefit creation or update failed.");
      } else {
        console;
        alert(
          "Benefit " + (benefit?.id ? "updated" : "created") + " successfully!",
        );
        void context.sponsor.getSponsorById.invalidate({ id: benefit?.id });
      }
      router.reload();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const mutationDelete = api.sponsor.deleteBenefitById.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Benefit deletion failed.");
      } else {
        alert("Benefit was deleted successfully!");
        void context.sponsor.getBenefitById.invalidate({ id: benefit?.id });
      }
      router.reload();
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <Formik
      initialValues={{
        benefitEsDescription: benefit?.esDescription ?? "",
        benefitEnDescription: benefit?.enDescription ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          id: benefit?.id,
          enDescription: values.benefitEnDescription,
          esDescription: values.benefitEsDescription,
        });
      }}
      validationSchema={benefitSchema}
    >
      {() => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="esDescription" className={classNameLabel}>
                  esDescription:
                </label>
                <Field
                  id="benefitEsDescription"
                  name="benefitEsDescription"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="benefitEsDescription"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label
                  htmlFor="benefitEnDescription"
                  className={classNameLabel}
                >
                  enDescription:
                </label>
                <Field
                  id="benefitEnDescription"
                  name="benefitEnDescription"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="benefitEnDescription"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-300 p-2 hover:bg-green-400"
              >
                {benefit?.id ? "Actualizar" : "Crear"}
              </button>

              {benefit?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: benefit?.id,
                      });
                    }
                  }}
                  className="rounded-xl bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
