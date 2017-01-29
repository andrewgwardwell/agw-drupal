define([
  'utility',
  'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDkLdJ1KRgIY0e4g0QR-oFB4CE7cYITmvY&v=3&sensor=false',
], function(u, gmaps){
  var userLocation = {

    //Returns the users location preferences
    hasPref: function () {
      return this.pref;
    },

    //clears all the persistent data for the users location
    clearAll: function () {
      this.clearCookie('loc');
      this.clearCookie('incidental');
      this.clearCookie('geo');
      this.clearCookie('geo_error');
      this.clearCookie('saved');
      this.clearCookie('browser_dialog_hide');
//      window.sessionStorage.removeItem('loc');
//      window.sessionStorage.removeItem('incidental');
//      window.sessionStorage.removeItem('geo');
//      window.sessionStorage.removeItem('geo_error');
//      window.localStorage.removeItem('saved');
//      window.localStorage.removeItem('browser_dialog_hide');
      this.pref = false;
      return true;
    },

    // If the user has not allowed the browser to get location then we will prompt them
    getPosition: function() {
      var geo = this.getGeolocation();
      var geo_error = this.getCookie('geo_error');
      var that = this;
      if(!geo && !geo_error){
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var uLon = position.coords.longitude;
          var uLat = position.coords.latitude;
          window.User.setGeolocation(uLat, uLon);
          var pref = window.User.hasPref();
          //@todo this is waiting pull in google maps with deffered object
          // we will use the async so we want to make this different
          // Duplicate code but what are deadlines for?
//          if ($('#edit-my-theater').length > 0) {
//            $('#edit-my-theater').data('selectBox-selectBoxIt').selectOption(pref.id);
//          }
          var data = Map.getDataById(pref.id);
          var url = data.general.showtime_link;
          $('#global-menu #nav_showtime a').attr('href', url);
        }, function(error) {
          // @todo: figure out what we want to do when there's an error.
          that.setCookie('geo_error', true, 1);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              // Display a "permission denied" message.

              break;
            case error.POSITION_UNAVAILABLE:
              break;
            case error.TIMEOUT:
              break;
            case error.UNKNOWN_ERROR:
              break;
          }
        }, {timeout: 100000});
      }
    }
    },

    // Pulls in the users chosen information from the persisent storage
    getPref: function () {
      var pref, loc = this.getLocation(),
        save = this.getSave(),
        inc = this.getIncidental(),
        geo = this.getGeolocation();

      if (loc) {
        pref = loc;
      }
      else if (inc) {
        pref = inc;
      }
      else if (save) {
        pref = save;
      }
      else if (geo) {
        pref = geo;
      }
      else {
        pref = false;
      }
      this.pref = pref;
    },

    /**
     * Description: sets a user's location into a temporary cookie<br />
     * Called by: Maps object geocoding system<br />
     * Notes: this is a client facing parser for the setCookie function.
     * This function takes a Google maps location object
     * TODO: This function currently assigns the user the closest theatre's location if google maps
     * doesn't return a city, this should continue to look for sublocalities and other variants before
     * defaulting back
     * @public
     * @param {Google.Maps} local A google maps object representing the user's geocoded location
     * @param {array} closest the result of closestList(), the closest five theaters
     */
    setLocation: function (local, closest) {
      var lat = local.geometry.location.lat();
      var lon = local.geometry.location.lng();
      var c = closest;
      var city, state;
      $.each(local.address_components, function () {
        if (this.types[0] === 'administrative_area_level_1') {
          state = this.short_name;
        }
        else if (this.types[0] === 'locality') {
          city = this.long_name;
        }
      });
      if (typeof(city) === 'undefined') {
        city = window.Map.getDataById(c[0][2]).general.city;
      }
      //this.setCookie('loc', 'lat=' + lat + '&lng=' + lon + '&city=' + city + '&st=' + state, 1);
      this.setCookie('loc', {
        'lat': lat,
        'lng': lon,
        'city': city,
        'state': state,
        'nearby': c,
        'type': 'location',
        'id': c[0][2]
      }, 1);
      this.getPref();
    },

    /**
     * Description: Sets a user's location if they land on a page that is 'location aware'<br />
     * Called by: document ready (on pages that are location aware)<br />
     * Notes: Location is a last-in system, so this will attempt to override any other settings
     * @public
     * @param {string} theatreId the ID of the incidental theatre
     * @param {boolean} override  whether or not this setting should override a searched location
     */
    setIncidental: function (theatreId, override) {
      var data = Map.getDataById(theatreId);

      var closer = Map.closestList(Map.closestMark(data.general.lat, data.general.lon));
      this.setCookie('incidental', {
        'lat': data.map.position.lat(),
        'lng': data.map.position.lng(),
        'name': data.general.title,
        'city': data.general.city,
        'state': data.general.state,
        'id': theatreId,
        'type': 'incidental',
        'nearby': closer
      }, 1);
      if (override) {
        this.clearCookie('loc');
//        window.sessionStorage.removeItem('loc');
      }
      this.getPref();
    },

//  Sets the geo param (this will be the most used going forward
    setGeolocation: function(lat, lon) {
      var closest = Map.closestTheatre(lat, lon);
      // @todo: Mapr is not defined and theatreList doesn't
      // exist on the Map global.
      // Need to figure out the best way to call this so that nearby marks
      // can be passed to the setCookie function.
      var nearby = Map.closestTheatresList();
      this.setCookie('geo', {
        'lat': closest.lat,
        'lng': closest.lon,
        'city': closest.city,
        'state': closest.state,
        'nearby': nearby,
        'type': 'geoLocation',
        'id': nearby[0][2]
      }, 1);
      this.getPref();
    },

    /**
     * Description: sets a user's saved location<br />
     * Called by: document<br />
     * Notes: client facing function for setCookie parsing on saved location data
     * This can be called a couple different ways, so it takes a lat, a lon, and the name
     * of the theater being saved instead of a marker object.
     * @public
     * @param {int} theatreId The id of the theater to be saved
     */
    setSave: function (theatreId) {
      //$('.alert-message').alert('close');
      //this.setCookie('saved', 'lat=' + tLat + '&lng=' + tLon + '&name=' + name, 100000);
      var data = Map.getDataById(theatreId);
      var mark = Map.closestMark(data.general.lat, data.general.lon);
      var closer = Map.closestList(mark);

      this.setCookie('saved', {
        'lat': data.map.position.lat(),
        'lng': data.map.position.lng(),
        'name': data.general.title,
        'city': data.general.city,
        'state': data.general.state,
        'id': theatreId,
        'type': 'save',
        'nearby': closer
      }, 100000);
      this.clearCookie('loc');
      this.clearCookie('incidental');
//      window.sessionStorage.removeItem('loc');
//      window.sessionStorage.removeItem('incidental');
//      var alert = $('<div class="alert-message success fade in" data-alert="alert"><a class="close" href="#">&times;</a><p>Your location was saved, congrats! Why don\'t you relax with a movie?</p></div> ');
//      $('.content').prepend(alert);
//      alert('Your location was saved, congrats! Why don\'t you relax with a movie?');
//      Map.saveHeader();
//      this.getPref();
//      if ($('#find-showtimes-input').length > 0) {
//        var pref = this.hasPref();
//        $('#find-showtimes-input').val(pref.city + ', ' + pref.state);
//      }
      //window.location.reload();
    },

    /**
     * Description: clears a user's saved location<br />
     * Called by: document<br />
     * Notes: client facing function for clearCookie parsing on saved location data
     * This can be called a couple different ways, so it takes a lat, a lon, and the name
     * of the theater being saved instead of a marker object.
     * @public
     */
    clearSave: function () {
      this.clearCookie('saved');
    },

    /**
     * Description: Gets a user's session location<br />
     * Called by: hasPref(), map object (likely depreciating)<br />
     * @public
     * @return {object || bool} An object representing the location or FALSE
     */
    getLocation: function () {
      var raw = this.getCookie('loc');
      if (typeof(raw) !== 'undefined') {
        return raw;
      }
      else {
        return false;
      }
    },

//    @todo why don't we refactor all of these getCookie wrapper functions
    /**
     * Description: returns either an incidental theatre or false<br />
     * Called by: User getPref()
     * @public
     * @return {object || boolean} the location object or false
     */
    getIncidental: function () {
      var raw = this.getCookie('incidental');
      if (typeof(raw) !== 'undefined') {
        return raw;
      }
      else {
        return false;
      }
    },

    /**
     * Description: gets a user's saved theater<br />
     * Called by: hasPref(), DOM handlers
     * @public
     * @return {object || bool} An object with information about a user's saved location or FALSE
     */
    getSave: function () {
      var raw = this.getCookie('saved');
      if (typeof(raw) !== 'undefined') {
        return raw;
      }
      else {
        return false;
      }
    },

    /**
     * gets the geo cookie
     * @returns {*}
     */
    getGeolocation: function() {
      var raw = this.getCookie('geo');
      if (typeof(raw) !== 'undefined') {
        return raw;
      }
      else {
        return false;
      }
    },

    /**
     * Description: Expands a dialogue to inform a user what saving a location means<br />
     * Called by: onClick (listener added in Map object, on the infoWindow)<br />
     * TODO: This should be taken out or rewritten. It doesn't currently do anything useful.
     * @public
     * @param {float} tLat The latitude of the theater a user is trying to save
     * @param {float} tLon The longitude of the theater a user is trying to save
     * @param {str}   name The name of the theater a user is trying to save
     */
    alertSave: function (tLat, tLon, name) {
      window.alert(tLat + ' ' + tLon + ' ' + name);
    },

    /**
     * Description: creates a cookie on the user's device<br />
     * Called by: setLocation(), setSave()<br />
     * Notes: Feel like a badass by using the HTML5 WebStorage API! This function takes
     * a name, a Javascript object, and the expiration, and publishes to the local
     * storage, if available. If local storage isn't available, it tries to publish to
     * a standard cookie.<br />
     * WebStorage does not support Javascript objects natively, so it needs to use the
     * JSON.stringify() function. (json2.js should give this functionality to older browsers)
     * @private
     * @param {str} c_name The name of the cookie (or object) to be saved
     * @param {obj} value  The value (string) of the cookie to be saved
     * @param {int} exDays The time until expiration of the cookie in days (1 or >1 for objects)
     */
    setCookie: function (c_name, value, exDays) {
      if (Modernizr.localstorage && Modernizr.sessionstorage) {
        if (exDays === 1) {
          window.sessionStorage.setItem(c_name, JSON.stringify(value));
        }
        else {
          window.localStorage.setItem(c_name, JSON.stringify(value));
        }
      }
      else {
        var exdate = new Date(),
          cookStr = '';
        cookStr = JSON.stringify(value);
        exdate.setDate(exdate.getDate() + exDays);
        var c_value = encodeURIComponent(cookStr) + ((exDays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
      }
    },

    /**
     * Description: returns a cookie with a given name<br />
     * Called by: getLocation(), getSave()<br />
     * Notes: First this checks to see if there is any session or local storage set, if
     * the values are available, they are parsed using the JSON.parse() function.
     * If no WebStorage values can be found, it will check to see if a cookie exists
     * with the given name. If a cookie is found, it is parsed and returned as a
     * Javascript object.
     * @private
     * @param  {str} c_name The name of the cookie to be fetched
     * @return {obj}        A javascript object that contains a keyed index of the data
     */
    getCookie: function (c_name) {
      if (Modernizr.sessionstorage && window.sessionStorage[c_name]) {
        return JSON.parse(window.sessionStorage[c_name]);
      }
      else if (Modernizr.localstorage && window.localStorage[c_name]) {
        return JSON.parse(window.localStorage[c_name]);
      }
      else {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i += 1) {
          x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
          y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
          x = x.replace(/^\s+|\s+$/g, "");
          if (x === c_name) {
            var fullstring = decodeURIComponent(y);
            return JSON.parse(fullstring);
          }
        }
      }
    },

    /**
     * Description: removes a cookie with a given name<br />
     * Called by: clearSave()<br />
     * Notes: First this checks to see if there is any session or local storage set, if
     * the values are available, they are removed using the removeItem() function.
     * If no WebStorage values can be found, it will check to see if a cookie exists
     * with the given name. If a cookie is found, it is removed.
     * @private
     * @param  {str} c_name The name of the cookie to be removed
     */
    clearCookie: function (c_name) {
      if (Modernizr.sessionstorage && window.sessionStorage[c_name]) {
        window.sessionStorage.removeItem(c_name);
      }
      else if (Modernizr.localstorage && window.localStorage[c_name]) {
        window.localStorage.removeItem(c_name);
      }
      else {
        document.cookie = c_name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },

    showtimeUrl : function() {
      var t, data;
      if ((t = this.hasPref())) {
        data = Map.getDataById(t.id);
        return data.general.showtime_link;
      }
      else {
        return '/#theatre_showtimes';
      }
    },

    /**
     * Description: grabs the url for a user's preferred theatre
     * @return {str} either the preferred theatre url or an empty string (the hash gets added anyways)
     */
  theaterUrl : function() {
    var t, data;
    if ((t = this.hasPref())) {
      data = Map.getDataById(t.id);
      return data.general.theatre_detail_link;
    }
    else {
      return '/';
    }
  },

  locFormSubShowtimes : function(e){
    e.preventDefault();
    e.stopPropagation();
    if ($('.user_has_loc').length > 0) {
      $('.user_has_loc .changer').trigger('hidePop');
    }
    var carry, base;
    var $that = $(this);

    if (e.target[0].value !== '') {
      switch (e.target[0].value.toLowerCase()) {
        case 'new jersey':
          e.target[0].value = 'Edgewater, NJ';
          break;
        case 'new york':
          e.target[0].value = 'Brooklyn, NY';
          break;
        case 'ohio':
          e.target[0].value = 'Springdale, OH';
          break;
      }
      // and here
      Map.geoGraph(e.target[0].value, function() {
        var form_type = $('.locForm').parent().data('form-type');
        if (form_type === 'movie_listing' || form_type === 'showtimes') {
          var house_id = Map.closestList()[0][2];
          var movie_id = $('.detail_bar').data('movie-id');
          if (!movie_id) {
            movie_id = $('#movie_detail_page').data('movie-id');
          }
          if (movie_id) {
            var data;
            if (typeof Drupal.settings.movieDetails !== "undefined") {
              data = Drupal.settings.movieDetails;
            } else {
              data = _.find(Drupal.settings.showMovies, function(item){
                return movie_id == item.movie_id;
              });
            }
            var theater = _.find(data.showtimes, function(item) {
              return item.house_id == house_id;
            });
          } else {
            var theater = _.find(Drupal.settings.showTheatres, function(item) {
              return item.house_id == house_id;
            });
          }
          var theatre_data = _.find(Drupal.settings.showTheatres, function(item) {
            return house_id == item.house_id;
          });
          if (!theater) {
            // Set button to disabled form or some junk.
            alert('Showtimes currently not available.');
            return false;
            buttonDisabled = true;
          }
          else {
            // Forward user to the correct showtimes page.
            if (data) {
              var path_obj = {
                movie_id: data.movie_id
              };
              var filter = '#highlight/' + u.objToPath(path_obj);
              carry = theatre_data.showtime_link + filter;
            } else {
              carry = theatre_data.showtime_link;
            }

            base = 'http://' + window.location.host;
            window.location.assign(base + carry);
          }
        }
        else {
          house_id = Map.closestList()[0][2];
          var theatre_data = _.find(Drupal.settings.showTheatres, function(item) {
            return house_id == item.house_id;
          });
          carry = theatre_data.showtime_link;
          base = 'http://' + window.location.host;
          window.location.assign(base + carry);
        }
      });
    } else {
      window.alert("Please enter a valid city, state or ZIP code.");
    }
  }


  };


  return userLocation;
});