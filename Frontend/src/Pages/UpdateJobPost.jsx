import { useState } from "react";
import { useUpdateJobMutation } from "../Apis/jobsApi";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateJobPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const [updateJob] = useUpdateJobMutation();
  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    company: job?.company || "",
    location: job?.location || "",
    salary: job?.salary || "",
    jobType: job?.jobType || "full-time",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateJob({
        id: job._id,
        ...formData,
        salary: Number(formData.salary),
      }).unwrap();
      navigate("/job-listing");
      setMessage("Job updated successfully ✅");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80 sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Edit listing
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Update job posting
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
            <input
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </div>

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
            <input
              name="salary"
              type="number"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </div>

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
          >
            {loading ? "Updating..." : "Update job"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UpdateJobPost;
