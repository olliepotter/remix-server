import {
  ArchiveBoxIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
  IdentificationIcon,
  RssIcon,
  TicketIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

export default function Navigation() {
  const navigation = [
    { name: "Entries", href: "entries", icon: TicketIcon, current: true },
    { name: "Riders", href: "riders", icon: UserCircleIcon, current: false },
    { name: "Bikes", href: "bikes", icon: Cog8ToothIcon, current: false },
    {
      name: "Licences",
      href: "licences",
      icon: IdentificationIcon,
      current: false,
    },
    {
      name: "Transponders",
      href: "transponsders",
      icon: RssIcon,
      current: false,
    },
    { name: "Orders", href: "orders", icon: ArchiveBoxIcon, current: false },
  ];

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  )}
                >
                  <item.icon aria-hidden="true" className="size-6 shrink-0" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <div className="text-xs/6 font-semibold text-gray-400">
            Your teams
          </div>
          <ul className="-mx-2 mt-2 space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <a
                  href={team.href}
                  className={classNames(
                    team.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  )}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                    {team.initial}
                  </span>
                  <span className="truncate">{team.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-auto">
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
}
