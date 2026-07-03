const router = require("express").Router();
const JobPost = require("../Models/jobPostModel");
const authMiddleware = require("../Middlewares/authMiddleware");
// Create a new job post
const {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  deleteJobPost,
  updateJobPost,
} = require("../Controllers/jobPostController");
const jobApplicationController = require("../Controllers/jobApplicationController");
const upload = require("../Middlewares/upload");
router.use(authMiddleware);
router.post("/createJobPost", createJobPost);
// Get all job posts
router.get("/getAllJobPosts", getAllJobPosts);
// Get a single job post by ID
router.get("/getJobPostById/:id", getJobPostById);
router.delete("/:id", deleteJobPost);
router.put("/:id", updateJobPost);
router.post(
  "/jobApplication",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  jobApplicationController.applyForJob,
);
router.get(
  "/getUserJobApplications",
  jobApplicationController.getUserApplications,
);
router.get("/getuser/:jobId", jobApplicationController.getApplicationsForJob);
router.patch(
  "/applications/:applicationId/status",
  jobApplicationController.updateApplicationStatus,
);
module.exports = router;
