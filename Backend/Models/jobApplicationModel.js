const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      url: String,
      public_id: String,
      filename: String,
      fileType: String,
    },

    coverLetter: {
      url: String,
      public_id: String,
      filename: String,
      fileType: String,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
