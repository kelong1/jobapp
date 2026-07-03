import { useRemoveJobMutation } from "../Apis/jobsApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobPost = ({ job }) => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [deleteJob] = useRemoveJobMutation();

  const handleDelete = async () => {
    try {
      await deleteJob(job);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    navigate("/updateJobPost", { state: { job } });
  };

  const handleApplyJob = () => {
    navigate("/job-application", { state: { job } });
  };

  const handleApplicants = () => {
    navigate("/applicants", { state: { job } });
  };

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            {job.jobType}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {job.title}
          </h3>
        </div>
        <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
          ${job.salary}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">
          {job.company}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1">
          {job.location}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {authState?.user?.type !== "jobseeker" ? (
          <>
            <button
              onClick={handleDelete}
              className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              Update
            </button>
            <button
              onClick={handleApplicants}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              View applicants
            </button>
          </>
        ) : (
          <button
            onClick={handleApplyJob}
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Apply now
          </button>
        )}
      </div>
    </article>
  );
};

export default JobPost;
