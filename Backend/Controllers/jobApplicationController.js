const jobApplicationSchema = require("../Models/jobApplicationModel");
const JobPost = require("../Models/jobPostModel");
const sendEmail = require("../Utils/sendMail");
const cloudinary = require("../cloudinary");

const uploadTextToCloudinary = async (text, filename) => {
  const buffer = Buffer.from(text, "utf8");
  const result = await cloudinary.uploader.upload_stream(
    {
      folder: "job_uploads",
      resource_type: "raw",
      format: "txt",
      public_id: `${Date.now()}-${filename.replace(/\.[^/.]+$/, "")}`,
    },
    (error, uploaded) => {
      if (error) {
        throw error;
      }
      return uploaded;
    },
  );

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "job_uploads",
        resource_type: "raw",
        format: "txt",
        public_id: `${Date.now()}-${filename.replace(/\.[^/.]+$/, "")}`,
      },
      (error, uploaded) => {
        if (error) return reject(error);
        resolve(uploaded);
      },
    );

    uploadStream.end(buffer);
  });
};

const jobApplicationController = {
  applyForJob: async (req, res) => {
    try {
      const { jobPost, coverLetterText } = req.body;

      if (!req.files?.resume?.[0]) {
        return res.status(400).json({
          message: "Resume is required",
        });
      }

      const resume = {
        url: req.files.resume[0].path,
        public_id: req.files.resume[0].filename,
        filename: req.files.resume[0].originalname,
        fileType: req.files.resume[0].mimetype,
      };

      let coverLetter = null;

      if (req.files?.coverLetter?.[0]) {
        coverLetter = {
          url: req.files.coverLetter[0].path,
          public_id: req.files.coverLetter[0].filename,
          filename: req.files.coverLetter[0].originalname,
          fileType: req.files.coverLetter[0].mimetype,
        };
      } else if (coverLetterText) {
        const uploadedCoverLetter = await uploadTextToCloudinary(
          coverLetterText,
          "cover-letter",
        );
        coverLetter = {
          url: uploadedCoverLetter.secure_url,
          public_id: uploadedCoverLetter.public_id,
          filename: "cover-letter.txt",
          fileType: "text/plain",
        };
      }

      const jobApplication = new jobApplicationSchema({
        jobPost,
        applicant: req.user._id,
        resume,
        coverLetter,
      });

      await jobApplication.save();
      await sendEmail({
        to: req.user.email,
        subject: "Application Received",
        text: "We have received your application and it is currently under review.",
      });

      res.status(201).json({
        message: "Job application submitted successfully",
        jobApplication,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error submitting job application", error });
    }
  },
  getUserApplications: async (req, res) => {
    try {
      const applications = await jobApplicationSchema
        .find({ applicant: req.user._id })
        .populate("jobPost", "title company");
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching applications", error });
    }
  },
  updateApplicationStatus: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      const application = await jobApplicationSchema
        .findById(applicationId)
        .populate("applicant")
        .populate("jobPost", "title");

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      application.status = status;

      await application.save();

      // Send email here
      await sendEmail({
        to: application.applicant.email,
        subject: "Application Accepted",
        text: `
Congratulations!

Your application for ${application.jobPost?.title} has been accepted.
`,
      });
      await sendEmail({
        to: application.applicant.email,
        subject: "Application Update",
        text: `
Thank you for your interest.

Unfortunately your application was not successful this time.
`,
      });

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getApplicationsForJob: async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await JobPost.findById(jobId).populate(
        "postedBy",
        "username email",
      );

      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      // // Employer or Admin check

      // if (
      //   job.employer.toString() !== req.user._id.toString() &&
      //   req.user.role !== "admin"
      // ) {
      //   return res.status(403).json({
      //     message: "Unauthorized",
      //   });
      // }

      const applications = await jobApplicationSchema
        .find({
          jobPost: jobId,
        })
        .populate("applicant", "name email")
        .populate("jobPost", "title");

      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
module.exports = jobApplicationController;
