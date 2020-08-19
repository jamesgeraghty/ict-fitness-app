"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store");
const accounts = require("./accounts.js");
const trainerStore = require("../models/trainer-store");
const BMI = require("../utils/bmi-calculator.js");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id =', memberId);
    logger.info("Trainer dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
       member: memberStore.getAllMembers(),
       trainer: trainerStore.getTrainerById(loggedInTrainer.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("trainerdashboard", viewData);
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
  
  trainerAssessments(request, response){
    const memberId = request.params.id;
    const viewMemberData = {
      title: "Trainer view of member dashboard",
      member: memberStore.getMemberById(memberId),
      BMI: BMI.BMICalculation(memberId),      
      assessments: assessmentStore.getMemberAssessments(memberId).reverse(),
      
    };
    response.render("trainerassessments", viewMemberData);
  },
};

module.exports = trainerdashboard;
