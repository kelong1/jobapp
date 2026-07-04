import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const JobApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      providesTags: ["Jobs"],
      query: () => {
        return {
          method: "GET",
          url: "/jobposts/getAllJobPosts",
        };
      },
    }),
    addJob: builder.mutation({
      providesTags: ["Jobs"],
      query: (jobData) => {
        return {
          method: "POST",
          url: "/jobposts/createJobPost",
          body: {
            title: jobData.title,
            description: jobData.description,
            company: jobData.company,
            location: jobData.location,
            salary: jobData.salary,
            jobType: jobData.jobType,
          },
        };
      },
    }),
    removeJob: builder.mutation({
      invalidatesTags: ["Jobs"],
      query: (job) => {
        return {
          method: "DELETE",
          url: `/jobposts/${job._id}`,
        };
      },
    }),
    updateJob: builder.mutation({
      invalidatesTags: ["Jobs"],
      query: ({ id, ...job }) => {
        return {
          method: "PUT",
          url: `/jobposts/${id}`,
          body: {
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType,
          },
        };
      },
    }),
    jobApplication: builder.mutation({
      invalidatesTags: ["Applications"],
      query: (formData) => {
        return {
          method: "POST",
          url: "/jobposts/jobApplication",
          body: formData,
        };
      },
    }),
    getUserApplications: builder.query({
      providesTags: ["Applications"],
      query: () => {
        return {
          method: "GET",
          url: "/jobposts/getUserJobApplications",
        };
      },
    }),
    getApplicationsForJob: builder.query({
      providesTags: ["Applications"],
      query: (jobId) => {
        return {
          method: "GET",
          url: `/jobposts/getUser/${jobId}`,
        };
      },
    }),
    updateApplicationStatus: builder.mutation({
      invalidatesTags: ["Applications"],
      query: ({ applicationId, status }) => ({
        url: `/jobposts/applications/${applicationId}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useAddJobMutation,
  useFetchJobsQuery,
  useRemoveJobMutation,
  useUpdateJobMutation,
  useJobApplicationMutation,
  useGetUserApplicationsQuery,
  useGetApplicationsForJobQuery,
  useUpdateApplicationStatusMutation,
} = JobApi;
export default JobApi;
