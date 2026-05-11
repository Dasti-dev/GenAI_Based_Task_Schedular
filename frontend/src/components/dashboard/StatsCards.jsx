import {
  Calendar,
  CheckCircle2,
  Clock3,
  Sparkles
} from "lucide-react";

const stats = [
  {
    label: "Tasks Today",
    value: "12",
    icon: Calendar
  },
  {
    label: "Completed",
    value: "8",
    icon: CheckCircle2
  },
  {
    label: "Focus Hours",
    value: "5.2h",
    icon: Clock3
  },
  {
    label: "AI Suggestions",
    value: "4",
    icon: Sparkles
  }
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            bg-zinc-900/70
            backdrop-blur-xl
            border border-zinc-800
            rounded-2xl
            p-5
            hover:border-zinc-700
            transition-all duration-300
          "
        >

          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <stat.icon size={20} />
            </div>
          </div>

          <h3 className="text-3xl font-semibold tracking-tight mb-1">
            {stat.value}
          </h3>

          <p className="text-zinc-500 text-sm">
            {stat.label}
          </p>

        </div>
      ))}

    </div>
  );
}

export default StatsCards;