import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/AuthService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("jobseeker");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/login");
    } else if (authState.error) {
      console.error("Registration failed:", authState.error);
    }
  }, [authState, navigate]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password, type };
    dispatch(registerUser(user));
    setName("");
    setEmail("");
    setPassword("");
    setType("jobseeker");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1fr_0.9fr]">
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Join the platform
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Create your account
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Start exploring opportunities or post your first role in minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={name}
                onChange={onChangeName}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={onChangePassword}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Account type
              </label>
              <select
                name="jobType"
                value={type}
                onChange={onChangeType}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              >
                <option value="employer">Employer</option>
                <option value="jobseeker">Job seeker</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Create account
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-sky-600 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Why join
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              A modern hiring experience for everyone.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Discover jobs, manage applications, and keep your professional
              profile in sync.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            “Bring your hiring process into one polished workspace.”
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
