define([
  'backbone',
  'app/models/ShowtimesModel'
], function(Backbone, ShowtimesModel) {
  var ShowtimesCollection = Backbone.Collection.extend({
    model: ShowtimesModel,
    url: function(){
      return '/rest/movies/house_id/'+this.theatre_id;
    },
    theatre_id : ''
  });
  return ShowtimesCollection;
});