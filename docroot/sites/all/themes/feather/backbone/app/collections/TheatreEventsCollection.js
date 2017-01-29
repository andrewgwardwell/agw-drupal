/**
 * Created by Awardwell on 2/18/14.
 */
define([
  'backbone',
  'app/models/TheatreEventsModel'
], function(Backbone, TheatreEventsModel){
  var TheaterEventsCollection = Backbone.Collection.extend({
    model: TheatreEventsModel
  });
  return TheaterEventsCollection;
})
