const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/Job");

dotenv.config();

const sampleJobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    category: "Marketing",
    description:
      "We are looking for a creative Social Media Assistant to join our growing team. You will be responsible for managing our social media accounts, creating engaging content, and growing our online community. The ideal candidate has a passion for social media marketing and experience with major platforms.",
    requirements: [
      "1+ years experience in social media marketing",
      "Excellent written communication skills",
      "Experience with social media management tools",
      "Knowledge of current social media trends",
      "Basic graphic design skills (Canva, Photoshop)",
    ],
    salary: "$40,000 - $55,000",
    companyLogo: "",
    tags: ["Marketing", "Social Media", "Content"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    category: "Design",
    description:
      "Dropbox is looking for a Brand Designer to help shape our visual identity across all touchpoints. You will work closely with marketing, product, and engineering teams to create compelling visual experiences that resonate with our users.",
    requirements: [
      "3+ years experience in brand design",
      "Proficiency in Figma, Illustrator, and Photoshop",
      "Strong portfolio showcasing brand identity work",
      "Understanding of design systems",
      "Excellent attention to detail",
    ],
    salary: "$85,000 - $120,000",
    companyLogo: "",
    tags: ["Design", "Brand", "Creative"],
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    category: "Technology",
    description:
      "Join Terraform as an Interactive Developer to build cutting-edge web experiences. You will develop interactive prototypes, animations, and rich web applications using modern JavaScript frameworks and creative coding techniques.",
    requirements: [
      "3+ years experience in web development",
      "Proficiency in React, Three.js, or similar",
      "Experience with WebGL and canvas animations",
      "Strong understanding of CSS animations",
      "Portfolio of interactive web projects",
    ],
    salary: "$90,000 - $130,000",
    companyLogo: "",
    tags: ["Development", "Interactive", "Frontend"],
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucerne, Switzerland",
    type: "Full-Time",
    category: "Human Resource",
    description:
      "We are seeking an experienced HR Manager to lead our human resources department. You will oversee recruitment, employee relations, performance management, and ensure compliance with labor laws and company policies.",
    requirements: [
      "5+ years experience in HR management",
      "Strong knowledge of labor laws",
      "Experience with HR software (Workday, BambooHR)",
      "Excellent interpersonal skills",
      "Bachelor's degree in HR or related field",
    ],
    salary: "$75,000 - $95,000",
    companyLogo: "",
    tags: ["HR", "Management", "People"],
  },
  {
    title: "Email Marketing Specialist",
    company: "Netlify",
    location: "Berlin, Germany",
    type: "Remote",
    category: "Marketing",
    description:
      "Netlify is looking for an Email Marketing Specialist to own our email channel. You will design, build, and optimize email campaigns that drive engagement and conversion across our customer lifecycle.",
    requirements: [
      "2+ years experience in email marketing",
      "Proficiency with email platforms (Mailchimp, HubSpot)",
      "HTML/CSS for email templates",
      "A/B testing and analytics experience",
      "Strong copywriting skills",
    ],
    salary: "$55,000 - $75,000",
    companyLogo: "",
    tags: ["Marketing", "Email", "Analytics"],
  },
  {
    title: "Senior UI/UX Designer",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full-Time",
    category: "Design",
    description:
      "Revolut is looking for a Senior UI/UX Designer to craft beautiful, intuitive financial products. You will lead design initiatives, conduct user research, and create high-fidelity prototypes that delight millions of users.",
    requirements: [
      "5+ years of UI/UX design experience",
      "Expert in Figma and design systems",
      "Experience with user research and testing",
      "Fintech or mobile app experience preferred",
      "Strong portfolio of product design work",
    ],
    salary: "$100,000 - $140,000",
    companyLogo: "",
    tags: ["Design", "UI/UX", "Fintech"],
  },
  {
    title: "Full Stack Developer",
    company: "Stripe",
    location: "London, UK",
    type: "Full-Time",
    category: "Technology",
    description:
      "Stripe is seeking a Full Stack Developer to build the infrastructure that powers internet commerce. You will work on both frontend and backend systems, building reliable, scalable services used by millions of businesses worldwide.",
    requirements: [
      "4+ years of full stack development",
      "Proficiency in React and Node.js",
      "Experience with PostgreSQL or MongoDB",
      "Knowledge of payment systems is a plus",
      "Strong problem-solving skills",
    ],
    salary: "$120,000 - $170,000",
    companyLogo: "",
    tags: ["Development", "Full Stack", "Payments"],
  },
  {
    title: "Product Manager",
    company: "ClassPass",
    location: "New York, USA",
    type: "Full-Time",
    category: "Business",
    description:
      "ClassPass is looking for a Product Manager to define and execute the product strategy for our consumer-facing applications. You will work with engineering, design, and data teams to build products that connect people with fitness.",
    requirements: [
      "3+ years of product management experience",
      "Experience with agile methodologies",
      "Strong analytical and data-driven thinking",
      "Excellent communication skills",
      "Consumer product experience preferred",
    ],
    salary: "$110,000 - $150,000",
    companyLogo: "",
    tags: ["Product", "Management", "Strategy"],
  },
  {
    title: "Data Analyst",
    company: "Canva",
    location: "Sydney, Australia",
    type: "Remote",
    category: "Technology",
    description:
      "Canva is looking for a Data Analyst to turn data into actionable insights that drive product and business decisions. You will work with large datasets, create dashboards, and partner with teams across the organization.",
    requirements: [
      "2+ years of data analysis experience",
      "Proficiency in SQL and Python",
      "Experience with Tableau or Looker",
      "Strong statistical analysis skills",
      "Excellent communication skills",
    ],
    salary: "$80,000 - $110,000",
    companyLogo: "",
    tags: ["Data", "Analytics", "Python"],
  },
  {
    title: "Content Writer",
    company: "HubSpot",
    location: "Remote",
    type: "Remote",
    category: "Marketing",
    description:
      "HubSpot is seeking a Content Writer to create high-quality blog posts, whitepapers, and marketing materials. You will research industry trends and produce compelling content that educates and engages our audience.",
    requirements: [
      "2+ years of content writing experience",
      "Excellent grammar and storytelling skills",
      "SEO knowledge and keyword research",
      "Experience with CMS platforms",
      "B2B or SaaS writing experience preferred",
    ],
    salary: "$50,000 - $70,000",
    companyLogo: "",
    tags: ["Writing", "Content", "Marketing"],
  },
  {
    title: "DevOps Engineer",
    company: "GitLab",
    location: "Remote",
    type: "Remote",
    category: "Technology",
    description:
      "GitLab is hiring a DevOps Engineer to help us build and maintain our CI/CD infrastructure. You will improve deployment pipelines, manage cloud infrastructure, and ensure high availability across our platform.",
    requirements: [
      "3+ years of DevOps experience",
      "Experience with Kubernetes and Docker",
      "Proficiency in AWS, GCP, or Azure",
      "Strong scripting skills (Bash, Python)",
      "Experience with infrastructure as code (Terraform)",
    ],
    salary: "$115,000 - $155,000",
    companyLogo: "",
    tags: ["DevOps", "Cloud", "Infrastructure"],
  },
  {
    title: "Finance Analyst",
    company: "Robinhood",
    location: "Menlo Park, USA",
    type: "Full-Time",
    category: "Finance",
    description:
      "Robinhood is seeking a Finance Analyst to support financial planning and analysis for our rapidly growing business. You will build financial models, analyze performance metrics, and provide strategic insights to leadership.",
    requirements: [
      "2+ years of financial analysis experience",
      "Advanced Excel and financial modeling skills",
      "Experience with financial reporting tools",
      "Strong attention to detail",
      "Bachelor's degree in Finance or Accounting",
    ],
    salary: "$85,000 - $115,000",
    companyLogo: "",
    tags: ["Finance", "Analysis", "Fintech"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("Cleared existing jobs.");

    // Insert sample jobs
    const inserted = await Job.insertMany(sampleJobs);
    console.log(`Successfully seeded ${inserted.length} jobs.`);

    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
