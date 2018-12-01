/* eslint-env jquery */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Stuff } from '../../api/stuff/stuff.js';

Template.Search_Stuff_Page.onCreated(function () {
  this.templateDictionary = new ReactiveDict();
  Meteor.subscribe('stuffSearch');
});

Template.Search_Stuff_Page.events({
  'submit .center.aligned.form-wrapper-2.cf': function (event, instance) {
    instance.templateDictionary.set('searchValue', $('#searchValue').val());
    event.preventDefault();
  },
});


Template.Search_Stuff_Page.helpers({
  /**
   * @returns {*} All of the Stuff documents.
   */
  stuffSearch() {
    const instance = Template.instance();
    if (instance.templateDictionary.get('searchValue')) {
      // If search parameter is defined, filter results
      return Stuff.find({ recipe: instance.templateDictionary.get('searchValue') });
    }
    // Otherwise, return all of the stuff
    return Stuff.find();
  },
});
