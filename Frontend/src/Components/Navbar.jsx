import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Features/AuthService";

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-base font-bold text-white shadow-lg shadow-sky-100">
            J
          </span>
          <span>JobPortal</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-sky-600">
            Home
          </Link>
          <Link to="/job-listing" className="transition hover:text-sky-600">
            Jobs
          </Link>
          {authState.user && (
            <Link to="/job-post" className="transition hover:text-sky-600">
              Post job
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {!authState.user ? (
            <>
              <Link
                to="/register"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/applicantsList"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
