import React from "react";
import { useRouter } from "next/router";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { AiOutlineCloseCircle } from "react-icons/ai";
import type { RouterOutputs } from "rbrgs/utils/api";
import { sponsorPackSchema } from "../schemas/sponsorPackSchema";
import { api } from "rbrgs/utils/api";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const SponsorPackForm = ({
  sponsorPack,
}: {
  sponsorPack:
    | RouterOutputs["sponsor"]["getSponsorPackById"]
    | undefined
    | null;
}) => {
  const context = api.useContext();
  const router = useRouter();

  const mutationModify = api.sponsor.createOrUpdateSponsorPack.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Sponsor pack creation or update failed.");
      } else {
        alert(
          "Sponsor " + (sponsorPack?.id ? "updated" : "created") + " successfully!",
        );
        void context.sponsor.getSponsorById.invalidate({ id: sponsorPack?.id });
      }
      router.reload();
    },
    onError: (error) => {
      alert(error);
    },
  });

  let itemValues = sponsorPack?.benefits.map((benefit) => ({
    esDescription: benefit.esDescription,
    enDescription: benefit.enDescription,
  }));

  if (!itemValues || itemValues?.length === 0) {
    itemValues = [];
    itemValues.push({ esDescription: "", enDescription: "" });
  }

  return (
    <div className="block max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <Formik
      initialValues={{ items: itemValues, packageName: sponsorPack?.name ?? ""}}
      onSubmit={(values) => {
        mutationModify.mutate({
          id: sponsorPack?.id,
          name: values.packageName,
          items: values.items.map((item) => ({
            esDescription: item.esDescription,
            enDescription: item.enDescription,
          })),
        });
      }}
      validationSchema={sponsorPackSchema}
    >
      {({ values }) => (
        <Form>
          <div className="my-2">
            <div className="flex flex-row flex-wrap align-middle">
              <label htmlFor="packageName" className={classNameLabel}>
                Package Name:
              </label>
              <Field
                id="packageName"
                name="packageName"
                className={classNameField}
              />
            </div>
            <div className="my-4">
              <ErrorMessage
                component="a"
                name="packageName"
                className={classNameError}
              />
            </div>
          </div>
          <FieldArray name="items">
            {({remove, push }) => (
              <div className="flex flex-col gap-y-2">
                {values?.items?.length > 0 &&
                  values.items.map((item, index) => (
                    <div className="rounded-md bg-purple-300 p-2" key={index}>
                      <div className="flex-start flex flex-row flex-wrap items-center gap-x-2">
                        <h6>Benefit {index + 1}</h6>
                        {values?.items?.length > 1 && (
                          <AiOutlineCloseCircle onClick={() => remove(index)} />
                        )}
                      </div>
                      <div className="flex flex-row flex-wrap gap-x-2 align-middle">
                        <label
                          htmlFor={`items.${index}.esDescription`}
                          className={classNameLabel}
                        >
                          Spanish Description:
                        </label>
                        <Field
                          id={`items.${index}.esDescription`}
                          name={`items.${index}.esDescription`}
                          className={classNameField}
                        />
                        <ErrorMessage
                          component="a"
                          name={`items.${index}.esDescription`}
                          className={classNameError}
                        />
                      </div>

                      <div className="mt-2">
                        <div className="flex flex-row flex-wrap gap-x-2 align-middle">
                          <label
                            htmlFor={`items.${index}.enDescription`}
                            className={classNameLabel}
                          >
                            English Description:
                          </label>
                          <Field
                            id={`items.${index}.enDescription`}
                            name={`items.${index}.enDescription`}
                            className={classNameField}
                          />
                          <ErrorMessage
                            component="a"
                            name={`items.${index}.enDescription`}
                            className={classNameError}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="ml-auto mr-auto w-fit rounded-md bg-blue-300 p-1 hover:bg-blue-500"
                  onClick={() => push({ esDescription: "", enDescription: "" })}
                >
                  Agregar beneficio
                </button>
              </div>
            )}
          </FieldArray>
          <button
            className="ml-auto mr-auto w-fit rounded-md bg-green-300 p-1 text-lg hover:bg-green-500"
            type="submit"
          >
            {sponsorPack?.id ? "Update" : "Create"}
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};
