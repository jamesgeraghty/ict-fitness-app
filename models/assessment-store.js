"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentListStore = {
  store: new JsonStore("./models/assessment-list-store.json", {
    assessmentListCollection: [],
  }),
  collection: "assessmentListCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
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

module.exports = assessmentListStore;
