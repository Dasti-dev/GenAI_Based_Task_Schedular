import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare2,
  Sparkles,
  BrainCircuit,
  Activity,
  Clock3,
  BellDot,
  Plus,
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
}) {

  return (
    <aside className="
      w-80
      min-h-screen
      border-r border-zinc-800
      bg-black/40
      backdrop-blur-2xl
      p-6
      flex flex-col justify-between
      sticky top-0
    ">

      <div>

        {/* LOGO */}
        <div className="flex items-center gap-4 mb-10">

          <div className="
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-violet-500
            flex items-center justify-center
            shadow-lg shadow-blue-500/20
          ">
            <BrainCircuit size={26} />
          </div>

          <div>
            <h1 className="
              text-2xl
              font-semibold
              tracking-tight
              text-white
            ">
              TaskAI
            </h1>

            <p className="text-zinc-500 text-sm">
              Intelligent Scheduler
            </p>
          </div>

        </div>

        {/* QUICK ACTION */}
        <button
          className="
            w-full
            mb-8
            bg-blue-500
            hover:bg-blue-600
            transition-all
            rounded-2xl
            p-4
            flex items-center justify-center gap-2
            font-medium
            shadow-lg shadow-blue-500/20
          "
        >
          <Plus size={18} />
          Quick Schedule
        </button>

        {/* NAVIGATION */}
        <div className="space-y-2 mb-10">

          {items.map((item) => (

            <button
              key={item.label}
              onClick={() => setActivePage(item.id)}
              className={`
                w-full
                flex items-center gap-4
                px-4 py-4
                rounded-2xl
                transition-all duration-300
                border
                ${
                  activePage === item.id
                    ? "bg-zinc-900 border-zinc-700 text-white"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900/70 hover:text-white"
                }
              `}
            >

              <item.icon size={19} />

              <span className="font-medium">
                {item.label}
              </span>

            </button>

          ))}

        </div>

        {/* AI STATUS */}
        <div className="
          bg-zinc-900/70
          border border-zinc-800
          rounded-3xl
          p-5
          mb-6
        ">

          <div className="
            flex items-center justify-between
            mb-5
          ">

            <div>
              <p className="text-zinc-500 text-sm">
                AI Engine
              </p>

              <h3 className="text-lg font-semibold mt-1">
                Phi Scheduler
              </h3>
            </div>

            <div className="
              w-3 h-3
              rounded-full
              bg-green-500
              animate-pulse
            " />

          </div>

          <div className="space-y-4 text-sm">

            <div className="flex items-center justify-between">

              <div className="
                flex items-center gap-2
                text-zinc-400
              ">
                <Activity size={15} />
                Active Tasks
              </div>

              <span className="text-white font-medium">
                12
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="
                flex items-center gap-2
                text-zinc-400
              ">
                <Clock3 size={15} />
                Focus Hours
              </div>

              <span className="text-white font-medium">
                5.2h
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="
                flex items-center gap-2
                text-zinc-400
              ">
                <BellDot size={15} />
                Pending Tasks
              </div>

              <span className="text-white font-medium">
                4
              </span>

            </div>

          </div>

        </div>

        {/* AI INSIGHT */}
        <div className="
          relative overflow-hidden
          rounded-3xl
          border border-blue-500/10
          bg-gradient-to-br
          from-blue-500/10
          to-violet-500/10
          p-5
        ">

          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]
          " />

          <div className="relative z-10">

            <div className="
              flex items-center gap-2
              mb-4
              text-blue-300
            ">
              <Sparkles size={18} />

              <span className="font-medium">
                AI Insight
              </span>
            </div>

            <p className="
              text-sm
              leading-6
              text-zinc-300
            ">
              Your productivity peaks between 6PM and 9PM.
              Consider scheduling deep work during those hours.
            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="
        text-xs
        text-zinc-600
        pt-6
      ">
        AI-powered scheduling workspace.
      </div>

    </aside>
  );
}

export default Sidebar;