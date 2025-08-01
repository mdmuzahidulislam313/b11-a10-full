import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(ThemeContext);

  const navItem =
    "px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition";

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow mb-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        {/* logo */}
        <Link to="/" className="text-2xl font-bold">
          HobbyHub
        </Link>

        {/* links */}
        <div className="flex gap-2 items-center">
          <NavLink to="/"        className={navItem}>Home</NavLink>
          <NavLink to="/groups"  className={navItem}>All Groups</NavLink>
          {user && (
            <>
              <NavLink to="/createGroup" className={navItem}>
                Create Group
              </NavLink>
              <NavLink to="/myGroups" className={navItem}>
                My Groups
              </NavLink>
            </>
          )}
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          {/* theme */}
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* auth */}
          {!user ? (
            <>
              <Link to="/login" className={navItem}>
                Login
              </Link>
              <Link to="/register" className={navItem}>
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "/default-profile.png"}
                title={user.displayName}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full object-cover border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-profile.png";
                }}
              />
              <button onClick={handleLogout} className={navItem}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
