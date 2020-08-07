"use strict";

const logger = require("../utils/logger");
const assessmentListStore = require("../models/assessment-list-store");
const memberStore = require("../models/member-store.js");
const accounts = require("./accounts.js");
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
    
    let current_datetime = new Date() // Set variable to current date and time
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    
    const newAssessment = {
      id: uuid.v1(), 
      entry: formatted_date,  
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    assessmentListStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
    deleteAssessment(request, response) {
    const todoId = request.params.id;
    logger.info(`Deleting todo ${todoId}`);
    assessmentListStore.removeAssessment(todoId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
