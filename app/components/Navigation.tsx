import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  Cog8ToothIcon,
  IdentificationIcon,
  RssIcon,
  TicketIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { classNames } from "~/lib/classNames";

export default function Navigation() {
  const navigation = [
    { name: "Entries", href: "entries", icon: TicketIcon },
    { name: "Riders", href: "riders", icon: UserCircleIcon },
    { name: "Bikes", href: "bikes", icon: Cog8ToothIcon },
    {
      name: "Licences",
      href: "licences",
      icon: IdentificationIcon,
    },
    {
      name: "Transponders",
      href: "transponsders",
      icon: RssIcon,
    },
    { name: "Orders", href: "orders", icon: ArchiveBoxIcon },
  ];

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col divide-y divide-gray-200/20">
        <li className="py-4">
          <NavLink to="/account" className="flex-shrink-0 block w-full group">
            <div className="flex items-center">
              <div className="ml-3 overflow-hidden">
                <p className="text-gray-200 font-bold text-lg">Ollie Potter</p>
                <p className="text-sm text-gray-300 font-medium">
                  View account
                </p>
              </div>
            </div>
          </NavLink>
        </li>
        <li className="py-4">
          <ul className="-mx-2 space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 font-bold text-lg/6"
                    )
                  }
                >
                  <item.icon aria-hidden="true" className="size-6 shrink-0" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
        <li className="pt-4 mt-auto">
          <NavLink
            to="/logout"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-lg/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeftEndOnRectangleIcon
              aria-hidden="true"
              className="size-6 shrink-0"
            />
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
