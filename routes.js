"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);

router.post("/dashboard/addassessment", dashboard.addAssessment);


module.exports = router;
