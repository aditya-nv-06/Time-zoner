import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import useUserStore from "../zustand/userstate";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isloggedIn);

  return (
    <nav className="h-full bg-white border-r dark:bg-gray-900 dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-6 py-8">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            MyApp
          </span>
        </Link>
      </div>
      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 px-6">
        <Link
          to="/todo"
          className="py-2 px-3 rounded text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-500"
        >
          Todo
        </Link>
        <Link
          to="/note"
          className="py-2 px-3 rounded text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-500"
        >
          Note
        </Link>
        <Link
          to="/dashboard"
          className="py-2 px-3 rounded text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-500"
        >
          Dashboard
        </Link>
      </div>
      {/* Spacer to push profile to bottom */}
      <div className="flex-1" />
      {/* User Profile */}
      <div className="px-6 py-8">
        <UserProfile username={user?.username} email={user?.email} />
      </div>
      {/* Login/Logout Button */}
      <div className="px-6 pb-6">
        {isLoggedIn ? (
          <Link
            to="/login"
            className="block w-full py-2 px-3 rounded text-center text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-800"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="block w-full py-2 px-3 rounded text-center text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-800"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

