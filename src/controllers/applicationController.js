const Application = require("../models/Application");
const Job = require("../models/Job");

// @desc    Submit a job application
// @route   POST /api/applications
// @access  Public
const submitApplication = async (req, res, next) => {
  try {
    const { jobId } = req.body;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found. Cannot apply to a non-existent job.",
      });
    }

    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Admin
const getApplications = async (req, res, next) => {
  try {
    const { jobId } = req.query;
    const query = jobId ? { jobId } : {};

    const applications = await Application.find(query)
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getApplications,
};
