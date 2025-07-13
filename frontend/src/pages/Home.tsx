import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navbar */}
      <aside className="w-1/5 min-h-screen bg-white border-r dark:bg-gray-900 dark:border-gray-800">
        <Navbar />
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto bg-gray-50 white:bg-gray-800">
        <Outlet />
      </main>
    </div>
  );
}

export default Home;

