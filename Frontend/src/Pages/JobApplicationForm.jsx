import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useJobApplicationMutation } from "../Apis/jobsApi";

const JobApplication = () => {
  const navigate = useNavigate();
  const [jobApplication] = useJobApplicationMutation();
  const location = useLocation();
  const job = location.state?.job;
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setMessage("Please upload your CV PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("jobPost", job?._id);
    formData.append("resume", resumeFile);

    if (coverLetterFile) {
      formData.append("coverLetter", coverLetterFile);
    }

    if (coverLetterText.trim()) {
      formData.append("coverLetterText", coverLetterText);
    }

    try {
      await jobApplication(formData).unwrap();
      navigate("/applicantsList");
    } catch (error) {
      setMessage(error?.data?.message || "Could not submit your application.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/80 sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Application
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Apply for {job?.title || "this role"}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Upload your CV as a PDF and add a cover letter as a PDF or written
            text.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="resume"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              CV / Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="coverLetterFile"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Cover letter PDF (optional)
            </label>
            <input
              type="file"
              id="coverLetterFile"
              name="coverLetter"
              accept="application/pdf"
              onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="coverLetterText"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Or write your cover letter
            </label>
            <textarea
              id="coverLetterText"
              name="coverLetterText"
              value={coverLetterText}
              onChange={(e) => setCoverLetterText(e.target.value)}
              className="min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              placeholder="Tell the employer why you are a great fit"
            />
          </div>

          {message && (
            <p className="text-sm font-medium text-rose-600">{message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Submit application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
