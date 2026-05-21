import Sidebar from "./Sidebar";

function MainLayout({

  children,

  activePage,

  setActivePage,

  handleLogout

}) {

  return (

    <div className="
      min-h-screen
      bg-zinc-950
      text-white
      flex
    ">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <main className="
        flex-1
        p-8
        overflow-auto
      ">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;