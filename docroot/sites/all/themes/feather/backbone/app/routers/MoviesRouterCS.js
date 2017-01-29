define([
  'app/routers/MoviesRouter',
  'utility'
],
  function (MoviesRouter, u) {
    var MoviesRouterCS = MoviesRouter.extend({
      // The filter Function is the only one that we need to override
      filter: function (filters) {
        var filters = u.pathToObj(filters);

        // Give the filter values triggered by the route
        $('#movie_filter_genre option[value="' + filters.genre + '"]').prop('selected', true);
        $('#movie_filter_rating option[value="' + filters.rating + '"]').prop('selected', true);

        // filter the collection
        this.collection.filter(function(item) {
          // Find the genre from within the collections
          var genres = item.get('genre'),
            rating = item.get('rating'),
            releases = item.get('releases'),
              // We need to reduce the collection to a version that has release dates after today
              // this is utc and a unix timestamp to match the server.
            today = moment().utc().format('X');
          // Iterate through if any of them have a timestamp of greater than today return that one.
          var to_come_release = _.some(releases, function(release){
            return release > today;
          });
          // The Genres and the Dates are in an array format
          var hasGenre =  _.contains(genres, filters.genre);
          // The rating is a single value
          var hasRating = rating == filters.rating;
          // If our all option is selected for one of the elements
          if (filters.genre == 'All Genres' || typeof filters.genre == 'undefined') {hasGenre = true;}
          if (filters.rating == 'All Ratings' || typeof filters.rating == 'undefined') {hasRating = true;}
          return hasGenre && hasRating && to_come_release;
        });
      }
    });

    return MoviesRouterCS;
  });
