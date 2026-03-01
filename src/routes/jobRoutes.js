const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  getCategories,
} = require("../controllers/jobController");
const { validateJob, handleValidationErrors } = require("../middleware/validate");

// GET /api/jobs/categories - Get all unique categories
router.get("/categories", getCategories);

// GET /api/jobs - Get all jobs (with optional search/filter)
router.get("/", getJobs);

// GET /api/jobs/:id - Get single job by ID
router.get("/:id", getJobById);

// POST /api/jobs - Create a new job (Admin)
router.post("/", validateJob, handleValidationErrors, createJob);

// DELETE /api/jobs/:id - Delete a job (Admin)
router.delete("/:id", deleteJob);

module.exports = router;
