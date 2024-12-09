import { MxRider } from "~/types";

export default function RiderCard({ rider }: { rider: MxRider }) {
  return (
    <div className="flex flex-col col-span-1 bg-white border border-gray-300 divide-y divide-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:divide-gray-600">
      <div className="flex items-center justify-center w-full p-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="py-6 text-3xl font-bold">
            <span>{rider.rider_number}</span>
          </h1>

          <h3 className="mb-2 text-lg font-medium text-gray-900 truncate dark:text-white">
            <span>
              {rider.first_name} {rider.last_name}
            </span>
          </h3>

          <h4 className="mb-2">
            {/* <span v-if="!loading">{{ formatDate(rider?.date_of_birth) }}</span> */}
          </h4>

          <div>
            <h4 className="px-2 py-1 my-2 text-sm font-bold text-gray-700 bg-gray-200 rounded-lg">
              No licences
            </h4>

            <div className="px-2 py-1 my-2 text-sm font-bold text-teal-700 bg-teal-200 rounded-lg">
              {rider.licences.length} Licence(s)
            </div>
          </div>
          {/* <Skeleton v-else className="h-[30px] w-[120px] rounded-xl" /> */}
        </div>
      </div>

      <div className="flex flex-grow -mt-px divide-x divide-gray-200 dark:divide-gray-600">
        {/* <Skeleton v-if="loading" className="h-[50px] w-[500px] rounded-none" /> */}
        <div className="flex flex-1 w-0">
          <button className="card-action-button">
            {/* //   <TrashIcon className="w-5 h-5 text-gray-400" /> */}
            <span className="ml-3">Delete</span>
          </button>

          <button className="card-action-button">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="ml-3">Cancel</span>
          </button>

          <button className="card-action-button">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="ml-3">Delete licence first</span>
          </button>
        </div>

        <div className="flex flex-1 w-0 -ml-px">
          <button className="card-action-button">
            {/* <PencilIcon className="w-5 h-5" aria-hidden="true" /> */}
            <span className="ml-3">Edit</span>
          </button>
        </div>

        <div className="flex flex-1 w-0 -ml-px">
          <button className="bg-red-500 rounded-br-lg card-action-button">
            {/* <TrashIcon className="w-5 h-5 text-white" aria-hidden="true" /> */}
            <span className="ml-3 text-white">Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
}
