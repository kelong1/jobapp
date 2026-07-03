const jobSchema = require("../Models/jobPostModel");
const authMiddleware = require("../Middlewares/authMiddleware");
// Create a new job post
const createJobPost = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;
    const jobPost = new jobSchema({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      postedBy: req.user._id,
    });
    await jobPost.save();
    res.status(201).json({ message: "Job post created successfully", jobPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating job post", error });
  }
};
// Get all job posts
const getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await jobSchema
      .find()
      .populate("postedBy", "username email");
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job posts", error });
  }
};
// Get a single job post by ID
const getJobPostById = async (req, res) => {
  try {
    const jobPost = await jobSchema
      .findById(req.params.id)
      .populate("postedBy", "username email");
    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job post", error });
  }
};
const deleteJobPost = async (req, res) => {
  try {
    const jobPost = await jobSchema.findByIdAndDelete(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: "job post not found" });
    }
    res.json({ message: "job post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateJobPost = async (req, res) => {
  try {
    const jobPost = await jobSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jobPost) {
      return res.status(404).json({ message: "jobPost not found" });
    }
    res.json(jobPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  deleteJobPost,
  updateJobPost,
};
