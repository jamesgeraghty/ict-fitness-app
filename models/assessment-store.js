"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: [],
  }),
  collection: "assessmentCollection",

  getAllAssessments(id) {
    return this.store.findAll(this.collection, { id: id });
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },
  
  
  getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
};

module.exports = assessmentStore;
