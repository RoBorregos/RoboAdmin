import { useRouter } from "next/router";
import { api } from "rbrgs/utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import type { RouterOutputs } from "rbrgs/utils/api";
import { sponsorSchema } from "../schemas/sponsorSchema";

const classNameLabel = "text-lg mr-2 text-slate-800";
const classNameField = "bg-slate-300 text-black text-base rounded-md";
const classNameError = "bg-red-500 p-2 rounded-md text-white text-sm";

export const SponsorEdit = ({
  sponsor,
}: {
  sponsor: RouterOutputs["sponsor"]["getSponsorById"] | undefined | null;
}) => {
  const context = api.useContext();
  const router = useRouter();

  const mutationModify = api.sponsor.createOrUpdateSponsor.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Sponsor creation or update failed.");
      } else {
        alert(
          "Sponsor " + (sponsor?.id ? "updated" : "created") + " successfully!",
        );
        void context.sponsor.getSponsorById.invalidate({ id: sponsor?.id });
      }
      router.reload();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const mutationDelete = api.sponsor.deleteSponsorById.useMutation({
    onSuccess: (succeeded) => {
      if (!succeeded) {
        alert("Sponsor deletion failed.");
      } else {
        alert("Sponsor was deleted successfully!");
        void context.sponsor.getSponsorById.invalidate({ id: sponsor?.id });
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
        sponsorName: sponsor?.name ?? "",
        sponsorImg_path: sponsor?.img_path ?? "",
        sponsorUrl: sponsor?.url ?? "",
      }}
      onSubmit={(values) => {
        mutationModify.mutate({
          name: values.sponsorName,
          img_path: values.sponsorImg_path,
          url: values.sponsorUrl,
          id: sponsor?.id,
        });
      }}
      validationSchema={sponsorSchema}
    >
      {() => (
        <Form>
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="sponsorName" className={classNameLabel}>
                  Sponsor name:
                </label>
                <Field
                  id="sponsorName"
                  name="sponsorName"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="sponsorName"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="sponsorImg_path" className={classNameLabel}>
                  img_path:
                </label>
                <Field
                  id="sponsorImg_path"
                  name="sponsorImg_path"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="sponsorImg_path"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="flex flex-row flex-wrap align-middle">
                <label htmlFor="sponsorUrl" className={classNameLabel}>
                  url:
                </label>
                <Field
                  id="sponsorUrl"
                  name="sponsorUrl"
                  className={classNameField}
                />
              </div>
              <div className="my-4">
                <ErrorMessage
                  component="a"
                  name="sponsorUrl"
                  className={classNameError}
                />
              </div>
            </div>
            <div className="mt-2 space-x-4">
              <button
                type="submit"
                className="rounded-xl bg-green-300 p-2 hover:bg-green-400"
              >
                {sponsor?.id ? "Actualizar" : "Crear"}
              </button>

              {sponsor?.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres borrarlo?")) {
                      mutationDelete.mutate({
                        id: sponsor?.id,
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
