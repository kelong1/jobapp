import { useFetchJobsQuery } from "../Apis/jobsApi";
import JobPost from "../Components/JobPost";

const ViewJobsPosts = () => {
  const { data: jobs = [], isLoading, error } = useFetchJobsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-slate-700">
        Loading opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-rose-600">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Open roles
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Latest job openings
            </h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            {jobs.length} active postings
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobPost key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewJobsPosts;
