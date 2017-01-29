define([
  'backbone',
  'utility'
],
  function (Backbone, u) {
    var EventCinemaRouter = Backbone.Router.extend({
      routes: {
        /*
         Filters can be of the following format:
         filter/genre/Comedy
         filter/rating/PG-13
         filter/genre/Comedy/rating/PG-13
         filter/rating/PG-13/genre/Comedy
         */
        'filter/*filters': 'filter'
      },

      initialize: function(){
        this.on('route', this.trackPage);
      },

      trackPage: function(){
        var url = window.location.href + '/' + window.location.hash;
      },

      filter: function (filters) {
        var filters = u.pathToObj(filters);

        // Give the filter values triggered by the route
        $('#movie_filter_day option[value="' + filters.date + '"]').prop('selected', true);

        // filter the collection
        this.collection.filter(function(item) {
          // Find the genre from within the collections
          var dates = item.get('showtimes');
          var hasDate = false;
          // The Genres and the Dates are in an array formats
          if (filters.date == 'All Dates'){
            hasDate = true;
          } else {
            hasDate =  _.filter(dates, function(date){
              var models_date = moment(date.showtime, 'X').utc().format('ddd, MMM Do');
              return (models_date == filters.date);
            });
            if (hasDate.length > 0 || typeof filters.release == 'undefinded') {hasDate = true;} else {hasDate = false;}
          }
          // If our all option is selected for one of the elements
          return hasDate;
        });
      }
    });

    return EventCinemaRouter;
  });