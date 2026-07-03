import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const authState = useSelector((state) => state.auth);
  const isEmployer = authState?.user?.type !== "jobseeker";

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl items-center gap-12 rounded-[2rem] border border-slate-200/80 bg-white/80 px-6 py-16 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
            {authState.user
              ? `Welcome back, ${authState.user.name || "there"}`
              : "Your next career move starts here"}
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {authState.user
                ? "Run a smarter hiring experience from one premium dashboard."
                : "Discover meaningful work and hire top talent in one place."}
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              {authState.user
                ? "Manage applications, review candidates, and keep your opportunities visible with a sleek workflow built for modern teams."
                : "JobPortal helps job seekers discover roles faster and employers publish opportunities that attract the right people."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {!authState.user ? (
              <>
                <Link
                  to="/register"
                  className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Create account
                </Link>
                <Link
                  to="/login"
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/job-listing"
                  className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  {isEmployer ? "Manage listings" : "Browse jobs"}
                </Link>
                {isEmployer && (
                  <Link
                    to="/job-post"
                    className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    Post a role
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                500+
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                active opportunities
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                24/7
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                application tracking
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                4.9/5
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                user satisfaction
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl dark:border-slate-700">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
            Why teams love it
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Streamlined applications for faster hiring",
              "Clean dashboards for employers and candidates",
              "Real-time updates on every job posting",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" />
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
