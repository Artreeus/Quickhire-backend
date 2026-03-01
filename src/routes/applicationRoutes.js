const express = require("express");
const router = express.Router();
const {
  submitApplication,
  getApplications,
} = require("../controllers/applicationController");
const {
  validateApplication,
  handleValidationErrors,
} = require("../middleware/validate");

// POST /api/applications - Submit a job application
router.post("/", validateApplication, handleValidationErrors, submitApplication);

// GET /api/applications - Get all applications (Admin)
router.get("/", getApplications);

module.exports = router;
