'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessment = member.assessment;
    _.remove(assessment, { id: assessmentId });
    this.store.save();
  },
};

module.exports = memberStore;