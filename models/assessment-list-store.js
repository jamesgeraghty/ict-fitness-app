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
  
   getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
};

module.exports = assessmentListStore;
