import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import AIInputBox from "../components/dashboard/AIInputBox";

import TaskList from "../components/dashboard/TaskList";

import StatsCards from "../components/dashboard/StatsCards";

import CalendarView from "../components/calendar/CalendarView";

function Dashboard({

  activePage,

  setActivePage,

  setIsAuthenticated

}) {

  const [refreshKey,
    setRefreshKey] =
    useState(0);

  const refreshTasks = () => {

    setRefreshKey(
      prev => prev + 1
    );
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsAuthenticated(false);
  };

  return (

    <MainLayout
      activePage={activePage}
      setActivePage={setActivePage}
      handleLogout={handleLogout}
    >

      <div className="flex flex-col gap-6">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              AI Scheduler
            </h1>

            <p className="
              text-zinc-400
              mt-1
            ">
              Intelligent productivity workspace
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              px-5 py-3
              bg-red-500
              hover:bg-red-600
              rounded-2xl
              transition-all
              font-medium
            "
          >
            Logout
          </button>

        </div>

        <StatsCards />

        <AIInputBox
          refreshTasks={refreshTasks}
        />

        {activePage === "dashboard" && (

          <div className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          ">

            <div className="
              xl:col-span-2
            ">
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
          <CalendarView
            refreshKey={refreshKey}
          />
        )}

        {activePage === "tasks" && (
          <TaskList
            refreshKey={refreshKey}
          />
        )}

        {activePage === "insights" && (

          <div className="
            bg-zinc-900
            border border-zinc-800
            rounded-3xl
            p-8
            text-zinc-300
          ">
            AI Insights panel coming soon.
          </div>
        )}

      </div>

    </MainLayout>
  );
}

export default Dashboard;