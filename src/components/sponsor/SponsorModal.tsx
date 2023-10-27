export const SponsorModal = ({
  setSeeModal,
  children,
  title,
}: {
  setSeeModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  title: string;
}) => {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden bg-slate-300/70 p-4 md:inset-0"
    >
      <div className="relative ml-auto mr-auto mt-20 max-h-full w-full max-w-2xl">
        {/* <!-- Modal content --> */}
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setSeeModal(false);
              }}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="space-y-6 p-6">
            {children}
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              onClick={() => {
                setSeeModal(false);
              }}
              type="button"
              className="rounded-lg border border-gray-200 bg-red-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
