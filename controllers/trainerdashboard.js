"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const accounts = require("./accounts.js");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      assessments: assessmentStore.getMemberAssessments(loggedInTrainer.id)
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  
  addAssessment(request, response) {
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    let current_datetime = new Date() // Set variable to current date and time
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    const newAssessment = {
      id: uuid.v1(), 
      memberid: loggedInTrainer.id,
      entry: formatted_date,  
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
    deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.info(`Deleting assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },
};

module.exports = trainerdashboard;
