import { LoaderFunction, redirect } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { invalidateCache } from "~/cache.client";
import { session } from "~/cookies";
import { auth as serverAuth } from "~/firebase.server";

export const loader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get("Cookie"));

  // No JWT found...
  if (!jwt) {
    return redirect("/login");
  }

  try {
    const token = serverAuth.verifySessionCookie(jwt);

    // Get the user's profile using the token from somewhere (Firestore, Remote Database etc)
    // const profile = await getUserProfile(token.uid);

    // Return the profile information to the page!
    return {
      email: (await token).email,
      uid: (await token).uid,
    };
  } catch (e: unknown) {
    // Invalid JWT - log them out (see below)
    return redirect("/logout");
  }
};

export default function Profile() {
  return (
    <div>
      Profile
      <NavLink to="/riders">Riders</NavLink>
      <button onClick={() => invalidateCache("user-riders")}>Invalidate</button>
    </div>
  );
}
