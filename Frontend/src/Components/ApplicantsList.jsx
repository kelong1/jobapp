import { useGetUserApplicationsQuery } from "../Apis/jobsApi";

const ApplicantsList = () => {
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useGetUserApplicationsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-slate-700">
        Loading applications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-rose-600">
        Error fetching applications
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Your activity
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Application history
          </h1>
        </div>

        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {application.jobPost?.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {application.jobPost?.company}
                  </p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
                  {application.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">Resume:</span>{" "}
                  {application.resume?.url ? (
                    <a
                      href={application.resume.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sky-600 hover:underline"
                    >
                      {application.resume.filename || "Open resume"}
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">
                    Cover letter:
                  </span>{" "}
                  {application.coverLetter?.url ? (
                    <a
                      href={application.coverLetter.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sky-600 hover:underline"
                    >
                      {application.coverLetter.filename || "Open cover letter"}
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;
