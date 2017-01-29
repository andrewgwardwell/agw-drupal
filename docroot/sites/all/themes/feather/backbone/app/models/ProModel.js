define([
  'backbone'
], function(Backbone) {
  var SkillModel = Backbone.Model.extend({
    idAttribute: 'nid',

    defaults: {
      'title': 'title',
      'nid': 'nid',
      'description': 'description',
      'image': 'image_url',
      'skills': ['skills array'],
      'link': 'link to external site',
      'project_type': 'classification of project'
    }
  });
  return SkillModel;
});
