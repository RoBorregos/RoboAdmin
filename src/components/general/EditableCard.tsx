import { useState } from "react";
import { api } from "rbrgs/utils/api";

export const EditableCard = ({
  infoView,
  editView,
  hasEdit,
  isLoading,
}: {
  infoView: React.ReactNode;
  editView: React.ReactNode;
  hasEdit: boolean;
  isLoading: boolean;
}) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="m-2 flex w-fit flex-col">
      {hasEdit && (
        <button onClick={() => setEdit(!edit)}>
          <p className="mb-2 ml-auto mr-auto w-fit rounded-md bg-green-200 p-2">
            Edit
          </p>
        </button>
      )}
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (edit ? editView : infoView)}
    </div>
  );
};
