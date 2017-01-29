define([
  'underscore'
],
function (_) {
  var utility = {
    pathToObj : function(path){
      var allTheThings = {};
      var filterArray = path.split('/');
      for (var i = 0; i < filterArray.length; i=i+2) {
        allTheThings[filterArray[i]] = decodeURIComponent(filterArray[i + 1]);
      }
      return allTheThings;
    },
    objToPath : function(obj){
      var step_1 = _.flatten(_.pairs(obj));
      var step_2 = step_1.map(function (item) {
        return encodeURIComponent(item);
      });
      return step_2.join('/');
    },

    movieGrid : {
      init : function (cont, el){
      // We pass the selectors in so this could be re-useable making a grid.
      var cont_width = $(cont).width(),
          $el = $(el),
          el_width = $el.width();

      var number_in_row = Math.floor(cont_width / el_width);
      var i = 0;
      var ti = 0;
      _.each($el, function(item){
        i++;
        ti++;
        if((number_in_row / i) == 1 || $el.length == ti){
          $(item).addClass('last_in_row');
          $('<div class="movie_detail"/>').css({position : 'relative', clear: 'both'}).insertAfter($(item));
          i = 0;
        }
      });
      }
    },

    // Nicked from http://stackoverflow.com/a/2907506
    getQueryStrings : function() {
      var assoc  = {};
      var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
      var queryString = location.search.substring(1);
      var keyValues = queryString.split('&');
      var valueLength = keyValues.length;

      for(var i = 0; i < valueLength; i++) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
          assoc[decode(key[0])] = decode(key[1]);
        }
      }

      return assoc;
    },

    videoSizing: function(){
      if ($('.movie_left iframe').length > 0) {
        var container_width = $('.movie_left').width(),
          orig_width = $('.movie_left iframe').attr('width'),
          orig_height = $('.movie_left iframe').attr('height'),
          new_height = (container_width * orig_height) / orig_width;

        if (new_height < 200) {
          new_height = 200;
        }

        $('.movie_left iframe').attr('width', container_width);
        $('.movie_left iframe').attr('height', new_height);
        $('.movie_left iframe').attr('id', 'movie_trailer');

        // We only want to run this code if there's actually a trailer on the page otherwise a JS error is thrown
        $f(document.getElementById('movie_trailer')).addEvent('ready', function() {
          var froogaloop = $f('movie_trailer');
          // Add a froogaloop event listener to act on a play event
          froogaloop.addEvent('play', function() {
            gua('send', 'event', 'Videos', 'Play', $('.movie_left iframe').attr('title'));
          });
          froogaloop.addEvent('pause', function() {
            gua('send', 'event', 'Videos', 'Pause', $('.movie_left iframe').attr('title'));
          });
          froogaloop.addEvent('finish', function() {
            gua('send', 'event', 'Videos', 'Complete', $('.movie_left iframe').attr('title'));
          });
        });
      }
    },

    getRandomArbitrary : function(min, max) {
    return Math.random() * (max - min) + min;
    }
  };

  return utility;
});
