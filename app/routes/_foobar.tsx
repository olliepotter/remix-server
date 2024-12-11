import { Outlet } from "@remix-run/react";

export default function FooBar() {
  return (
    <div>
      <h1>FOOBAR</h1>
      <Outlet />
    </div>
  );
}
