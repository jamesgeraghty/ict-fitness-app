"use strict";

const logger = require("../utils/logger");
const assessmentListStore = require("../models/assessment-list-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Template 1 Dashboard",
      assessmentlist: assessmentListStore.getAllAssessments(),
    };
    response.render("dashboard", viewData);
  },

  addAssessment(request, response) {
    const assessment = {
      title: request.body.title,
    };
    assessmentListStore.addAssessment(assessment);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
