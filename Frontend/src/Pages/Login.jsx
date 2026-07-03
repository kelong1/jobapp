import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Features/AuthService";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    } else if (authState.error) {
      console.error("Login failed:", authState.error);
    }
  }, [authState, navigate]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginUser(user));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Welcome back
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              Log in to manage your next opportunity.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Track applications, post roles, and keep your hiring workflow
              moving.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            “The fastest way to connect candidates with the right teams.”
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Access your account
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Sign in
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                value={email}
                onChange={onChangeEmail}
                type="email"
                name="email"
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
                value={password}
                onChange={onChangePassword}
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-sky-600 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
