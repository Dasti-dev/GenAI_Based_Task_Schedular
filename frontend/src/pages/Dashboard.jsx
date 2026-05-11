import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import AIInputBox from "../components/dashboard/AIInputBox";
import TaskList from "../components/dashboard/TaskList";
import StatsCards from "../components/dashboard/StatsCards";

import CalendarView from "../components/calendar/CalendarView";

function Dashboard({
  activePage,
  setActivePage,
}) {

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <MainLayout
      activePage={activePage}
      setActivePage={setActivePage}
    >

      <div className="flex flex-col gap-6">

        <StatsCards />

        <AIInputBox
          refreshTasks={refreshTasks}
        />

        {activePage === "dashboard" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2">
              <CalendarView
                refreshKey={refreshKey}
              />
            </div>

            <div>
              <TaskList
                refreshKey={refreshKey}
              />
            </div>

          </div>
        )}

        {activePage === "calendar" && (
          <CalendarView refreshKey={refreshKey} />
        )}

        {activePage === "tasks" && (
          <TaskList refreshKey={refreshKey} />
        )}

        {activePage === "insights" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-zinc-300">
            AI Insights panel coming soon.
          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default Dashboard;