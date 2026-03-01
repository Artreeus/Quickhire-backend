const { body, validationResult } = require("express-validator");

// Validation rules for creating a job
const validateJob = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("company").trim().notEmpty().withMessage("Company name is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-Time", "Part-Time", "Remote", "Internship", "Contract"])
    .withMessage("Invalid job type"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),
];

// Validation rules for submitting an application
const validateApplication = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("resumeLink")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required")
    .isURL()
    .withMessage("Please provide a valid URL for the resume"),
  body("coverNote")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Cover note cannot exceed 2000 characters"),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validateJob,
  validateApplication,
  handleValidationErrors,
};
