const Job = require("../models/Job");

// @desc    Get all jobs with optional search & filter
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
  try {
    const { search, category, location, type, page = 1, limit = 12 } = req.query;

    const query = {};

    // Search by keyword in title, company, or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (type) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job (Admin)
// @route   POST /api/jobs
// @access  Admin
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job (Admin)
// @route   DELETE /api/jobs/:id
// @access  Admin
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all unique categories
// @route   GET /api/jobs/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Job.distinct("category");
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  getCategories,
};
