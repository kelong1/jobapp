import {
  useGetApplicationsForJobQuery,
  useUpdateApplicationStatusMutation,
} from "../Apis/jobsApi";
import { useLocation } from "react-router-dom";

const Applicants = () => {
  const [updateStatus] = useUpdateApplicationStatusMutation();

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateStatus({
        applicationId,
        status,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const job = location.state?.job;
  const jobId = job?._id;
  const {
    data: applicants = [],
    isLoading,
    isError,
  } = useGetApplicationsForJobQuery(jobId, {
    skip: !jobId,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-slate-700">
        Loading applicants...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-rose-600">
        Error fetching applicants
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Applicants
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Review candidates for {job?.title || "this role"}
          </h1>
        </div>

        <div className="grid gap-6">
          {applicants.map((applicant) => (
            <div
              key={applicant._id}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {applicant.applicant?.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {applicant.applicant?.email}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${applicant.status === "accepted" ? "bg-emerald-50 text-emerald-700" : applicant.status === "rejected" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {applicant.status}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange(applicant._id, "accepted")}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(applicant._id, "rejected")}
                  className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange(applicant._id, "reviewed")}
                  className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
