define([
  'backbone',
  'app/models/ProModel',
  'moment'
], function(Backbone, ProModel) {
  var ProCollection = Backbone.Collection.extend({
    model: ProModel
  });
  return ProCollection;
});