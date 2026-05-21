import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setIsAuthenticated(true);
    }

  }, []);

  if (!isAuthenticated) {

    return (
      <Auth
        setIsAuthenticated={
          setIsAuthenticated
        }
      />
    );
  }

  return (
    <Dashboard
      activePage={activePage}
      setActivePage={setActivePage}
      setIsAuthenticated={
        setIsAuthenticated
      }
    />
  );
}

export default App;