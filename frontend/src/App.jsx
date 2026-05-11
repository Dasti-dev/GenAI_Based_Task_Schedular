import { useState } from "react";

import Dashboard from "./pages/Dashboard";

function App() {

  const [activePage, setActivePage] = useState("dashboard");

  return (
    <Dashboard
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}

export default App;