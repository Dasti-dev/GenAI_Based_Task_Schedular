import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare2,
  Sparkles,
  BrainCircuit,
  LogOut,
} from "lucide-react";

const items = [

  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
  },

  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare2,
  },

  {
    id: "insights",
    label: "AI Insights",
    icon: Sparkles,
  },
];

function Sidebar({

  activePage,

  setActivePage,

  handleLogout

}) {

  return (

    <aside className="
      w-80
      min-h-screen
      border-r border-zinc-800
      bg-black/40
      backdrop-blur-2xl
      p-6
      flex
      flex-col
      justify-between
      sticky top-0
    ">

      <div>

        <div className="
          flex items-center
          gap-4
          mb-10
        ">

          <div className="
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-violet-500
            flex items-center justify-center
          ">

            <BrainCircuit size={26} />

          </div>

          <div>

            <h1 className="
              text-2xl
              font-semibold
            ">
              TaskAI
            </h1>

            <p className="
              text-zinc-500
              text-sm
            ">
              Intelligent Scheduler
            </p>

          </div>

        </div>

        <div className="
          space-y-2
        ">

          {items.map((item) => (

            <button
              key={item.id}
              onClick={() =>
                setActivePage(item.id)
              }
              className={`
                w-full
                flex items-center
                gap-4
                px-4 py-4
                rounded-2xl
                transition-all
                border
                ${
                  activePage === item.id
                    ? "bg-zinc-900 border-zinc-700 text-white"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900/70 hover:text-white"
                }
              `}
            >

              <item.icon size={19} />

              <span className="
                font-medium
              ">
                {item.label}
              </span>

            </button>
          ))}

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="
          w-full
          flex items-center
          justify-center
          gap-2
          px-4 py-4
          rounded-2xl
          bg-red-500
          hover:bg-red-600
          transition-all
          font-medium
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;