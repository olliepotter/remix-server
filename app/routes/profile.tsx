import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { cachedLoader } from "~/cache.client";
import { session } from "~/cookies";
import { auth as serverAuth } from "~/firebase.server";
import { findDocById } from "~/lib/firestore";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get("Cookie"));

  // No JWT found...
  if (!jwt) {
    return redirect("/login");
  }

  try {
    const token = await serverAuth.verifySessionCookie(jwt);

    // Get the user's profile using the token from somewhere (Firestore, Remote Database etc)

    const profile = await findDocById("users", token.uid);

    // Return the profile information to the page!
    return {
      profile,
    };
  } catch (e: unknown) {
    // Invalid JWT - log them out (see below)
    return redirect("/logout");
  }
};

export const clientLoader = async (args: ClientLoaderFunctionArgs) => {
  return await cachedLoader("user", args);
};

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();
  return (
    <div className="bg-red-500">
      Profile
      {JSON.stringify(profile)}
    </div>
  );
}
