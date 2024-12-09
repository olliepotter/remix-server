import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { session } from "~/cookies";
import { findDocsByField } from "~/lib/firestore";
import { auth as serverAuth } from "~/firebase.server";
import {
  ClientLoaderFunctionArgs,
  NavLink,
  useLoaderData,
} from "@remix-run/react";
import RiderCard from "~/components/RiderCard";
import { cachedLoader } from "~/cache.client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get("Cookie"));

  // No JWT found...
  if (!jwt) {
    return redirect("/login");
  }

  try {
    const token = await serverAuth.verifySessionCookie(jwt);
    console.log("RUNNING LOADER");
    const riders = await findDocsByField("riders", "user_id", "==", token.uid);
    return {
      riders,
    };
  } catch (e: unknown) {
    return redirect("/logout");
  }
};

export const clientLoader = async (args: ClientLoaderFunctionArgs) => {
  return await cachedLoader("user-riders", args);
};

clientLoader.hydrate = true;

export default function Riders() {
  const { riders } = useLoaderData<typeof loader>();

  return (
    <>
      <div>
        <ul className="grid grid-cols-1 gap-6 pb-4 border-b border-gray-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-gray-700 auto-rows-fr">
          {riders.map((rider) => (
            <RiderCard key={rider.id} rider={rider} />
          ))}
        </ul>

        <button className="px-3 py-3 mt-4 font-semibold text-white rounded-lg focus:outline-none bg-eventapp-blue">
          Add rider
        </button>
      </div>

      <div className="flex flex-col items-center lg:items-start">
        <div className="pt-5 pb-3 mt-auto text-2xl font-bold text-center lg:text-left">
          You have no riders on your account.
        </div>

        <div className="pb-3 text-lg font-semibold text-center text-gray-600 lg:text-left">
          You need to have riders on your account so you can enter them into
          events.
        </div>

        <button className="px-3 py-3 my-1 font-semibold text-white uppercase rounded-lg focus:outline-none bg-eventapp-blue">
          Create a Rider
        </button>

        <NavLink to="/profile">Profile</NavLink>
      </div>
    </>
  );
}
