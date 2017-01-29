/**
 * Created by Awardwell on 2/18/14.
 */
define([
'backbone',
'app/models/TheatreModel'
], function(Backbone, TheatreModel){
  var TheaterCollection = Backbone.Collection.extend({
    model: TheatreModel
  });
  return TheaterCollection;
})