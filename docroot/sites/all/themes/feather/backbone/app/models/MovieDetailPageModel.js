define([
  'backbone'
], function(Backbone) {
  var MovieDetailPageModel = Backbone.Model.extend({
    idAttribute: 'movie_id',

    url: function(){
      return '/rest/movies/' + this.get('nid');
    },

//    initialize: function(){
//      this.listenTo(this, 'change', this.url);
//    },

    defaults: {
      'movie_id' : 'The movie id',
      'nid' : 'The mappable id',
      'title' : 'Title of the node',
      'actors' : 'Actors in the Movie',
      'writers' : 'Writers in the Movie',
      'directors' : 'Directors of the movie',
      'synopsis' : 'Summary of the movie',
      'genres' : 'Genres',
      'rating' : 'Ratings',
      'length' : 'Length',
      'release' : 'Releases',
      'vimeo' : 'Vimeo Iframe markup',
      'facebook_link' : 'Facebook Link',
      'genres_plural' : 'Plural or Not',
      'writers_plural' : 'Plural or Not',
      'directors_plural' : 'Plural or Not',
      'releases_plural' : 'Plural or Not'
    }
  });
  return MovieDetailPageModel;
});