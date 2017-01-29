define([
  'backbone'
], function(Backbone) {
  var showtimesModel = Backbone.Model.extend({
    idAttribute: 'movie_id',

    defaults: {
      movie: {
        title: 'The title of the movie',
        movie_id: 'The cinemasource ID of the movie',
        movie_link: 'A link to the movie page on the Showcase website',
        image_uri: 'A link to the movie poster',
        image: 'The image title',
        movie_trailer: 'HTML to display the movie trailer',
        house_ids: ['House Ids where this movie is Available'],
        genre: ['The movie genre'],
        rating: 'The movie rating',
        rating_text: function () {
          return function (r, render) {
            switch (render(r)) {
              case 'G':
                return 'General Audience - All Ages Admitted';
                break;
              case 'PG':
                return 'Parental Guidance Suggested – Some Material May Not Be Suitable For Children';
                break;
              case 'PG-13':
                return 'Parents Strongly Cautioned - Some Material May Be Inappropriate for children Under 13';
                break;
              case 'R':
                return 'RESTRICTED - UNDER 17 REQUIRES ACCOMPANYING PARENT OR ADULT GUARDIAN';
                break;
              case 'NC-17':
                return 'No One 17 and Under Admitted';
                break;
              case 'NR':
                return 'This film has not been rated';
                break;
              default:
                return 'This film has not been rated';
                break;
            }
          }
        },
        runtime: 'The movie runtime',
        releases: ['The movie release dates as a unix timestamp'],
        advisory: 'The parental Advisory. Why it\'s been rated as it has been.',
        synopsis: 'The description',
        actors: ['The actors in the movie'],
        directors: ['The directors in the movie'],
        website: 'Url to movies',
        trailer: 'The trailer url',
        release_type: ['The type of the release'],
        vimeo_id: 'Id for the vimeo id.',
        comments: 'The type of showing'
      },
      showtimes: [{
        id: 'The unique ID of the showtime',
        house_id: 'The house ID of the showtime',
        movie_id: 'The movie the showtime is for',
        showtime: 'The time of the showtime',
        nid: 'The node ID for the movie the showtime is for',
        date: 'The date of the showtime',
        allowpasses: 'Whether the showtime allows passes or not',
        attributes: 'Attributes of the showtime',
        comments: 'The type of showing',
        sound: 'The type of sound system used',
        perft: 'The time to use for the MT.com link',
        perfd: 'The date to use for the MT.com link',
        time: 'The formatted time of the showtime',
        time_class: 'Whether the time is in the past or future',
        li_class: 'Whether this is the first or last li'
      }],
      display_showtimes: ['A list of showtimes to display']
    }
  });
  return showtimesModel;
});