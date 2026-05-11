import { useEffect, useState } from "react";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { getTasks } from "../../services/api";

const localizer = momentLocalizer(moment);

function CalendarView({ refreshKey }) {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  const fetchTasks = async () => {

    try {
      setLoading(true);

      const response = await getTasks();

      console.log("TASK RESPONSE:", response.data);

      const formattedEvents = (response.data || [])
        .filter(task =>
          task.date &&
          task.startTime &&
          task.endTime
        )
        .map(task => {

          const start = new Date(
            `${task.date}T${task.startTime}`
          );

          const end = new Date(
            `${task.date}T${task.endTime}`
          );

          return {
            title: task.task,
            start,
            end,
            resource: task,
          };
        });

      console.log("FORMATTED EVENTS:", formattedEvents);

      setEvents(formattedEvents);

    } catch (err) {
      console.error("Calendar Fetch Error:", err);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="
        bg-zinc-900
        border border-zinc-800
        rounded-2xl
        p-8
        text-zinc-400
      ">
        Loading calendar...
      </div>
    );
  }

  return (
    <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-2xl
      p-6
      overflow-hidden
      shadow-lg
    ">

      <div className="
        flex items-center justify-between
        mb-6
      ">

        <h2 className="
          text-xl
          font-semibold
          text-white
        ">
          Schedule Calendar
        </h2>

        <div className="
          text-sm
          text-zinc-400
        ">
          AI Managed Schedule
        </div>

      </div>

      <div className="
        calendar-wrapper
        h-[700px]
        rounded-xl
        overflow-hidden
        bg-zinc-950
        p-2
      ">

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["month", "week", "day"]}
          popup
          style={{ height: "100%" }}

          eventPropGetter={() => ({
            style: {
              background:
                "linear-gradient(135deg, #2563eb, #1d4ed8)",

              borderRadius: "14px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              color: "white",

              padding: "6px",

              fontSize: "13px",

              boxShadow:
                "0 8px 20px rgba(37,99,235,0.25)",

              backdropFilter: "blur(12px)"
            }
          })}
        />

      </div>

    </div>
  );
}

export default CalendarView;