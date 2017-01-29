/**
 * Created by Awardwell on 2/24/14.
 */
define([
  'userLocation',
  'mustache',
  'text!app/templates/mapInfoBubble.html',
  'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDkLdJ1KRgIY0e4g0QR-oFB4CE7cYITmvY&v=3&sensor=false',
], function(user, mustache, template) {
  var MapsUtility = {
    // Initate an object that will become our map.
    map: {},
    index: [],
    locationInfo: null,
    // Supply The object with theatres. --- should be available on all pages
    initLocationInfo: function() {
      this.locationInfo = Drupal.settings.showTheatres;
      this.index = _.map(this.locationInfo, function(obj, key) {
        return obj.house_id;
      });
    },
    // A template for the infoBubble on the google map.
    bubbleTemp: template,
    /**
     * Method for finding inital center point. This might be redunant with
     * the reCenter below. UNIX PHILOSPHY VS DRY coding.
     */
    createCenter: function() {
      var mapInfo = this.loc,
              lat = mapInfo.lat,
              lon = mapInfo.lng;
      return new google.maps.LatLng(lat, lon);
    },
    /**
     * Moves the center of the map to different location. Currently used by
     * the TheatreCollectionView in a click event.
     */
    reCenter: function(lat, lon) {
      var new_pos = new google.maps.LatLng(lat, lon);
      this.map.setCenter(new_pos);
    },
    /**
     * Builds map from a views DOM tree. Parms being the el in your view that you are
     * targeting as the map and parent being the jQuery wrapped container.
     */
    createMap: function(el, parent) {
      var selector;
      // Identify what we are appending to (the map goes where?)
      if (parent instanceof jQuery) {
        selector = parent;
      }
      else {
        selector = $('#subnav_locations');
      }
      // Add a little css to the map and append to our containing element (selector)
      el.css({
        height: 240
      }).appendTo(selector);
      // Set Markers for the 5 nearest locations
      this.setMarkers();
      // get a center for the map
      // var center = this.createCenter();
      // Build options for the map instance
      var mapOptions = {
        zoom: 15,
        center: this.userLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // Finally define our map
      this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
      var map_map = this.map;
      // set the markers on the map
      $.each(this.markers, function() {
        this.setMap(map_map);
      });

      // IE8 work around.
      var info_bg_color = (!window.Modernizr.rgba) ? '#1A1B57' : 'rgba(26,27,87,0.9)';
      // We might be needing to replace all of this window references
      this.map.infoWin = new window.InfoBubble({
        map: this.map,
        content: '',
        backgroundColor: info_bg_color,
        borderRadius: 10,
        padding: 15,
        borderColor: '#fff',
        borderWidth: 2,
        arrowPosition: 20,
        maxWidth: 200
      });
      return this.map;
    },
    /**
     * Function that builds marker objects for the 5 closest locations.
     */
    setMarkers: function() {
      // Get the closest five theatres to the users location.
      var theatres = this.locationInfo;

      // We need the house ids to link them to something useful.
      var h_ids = _.map(theatres, function(item) {
        // @todo make the objects in the nearby array a little more meaningful ie item.house_id
        return item.house_id;
      });
      // @todo try and separate these items from the original JSON
      // Get Data with full information from the JSON feed (this includes lat and long)
      var locations = _.filter(Drupal.settings.showTheatres, function(item) {
        return _.contains(h_ids, item.house_id);
      });
      // Initialize an array for building the markers.
      var markers = [];
      // Iterate through our newly retreived objects and create google.maps.Markers for each.
      $.each(locations, function() {
        // root will be an ind location object
        var root = this;
        // create usable position
        var p = new google.maps.LatLng(parseFloat(root.lat), parseFloat(root.lon));
        // create a marker to shove into the marker array
        var mark = new google.maps.Marker({
          position: p,
          title: root.title
        });
        // make a loaded array
        markers.push(mark);
        // Bind a displayhandler to each mark.
        google.maps.event.addListener(mark, 'click', function() {
          MapsUtility.openInfo(mark, root);
        });
      });
      this.markers = markers;
    },
    openInfo: function(mark, root) {
      // Pull a template in and render our data with mustache
      var content = mustache.render(this.bubbleTemp, root);
      // Create the bubble and give it some style.
      if (this.map.infoWin.content == content && this.map.infoWin.isOpen()) {
        this.map.infoWin.close();
      } else {
        if (this.map.infoWin.isOpen()) {
          this.map.infoWin.close();
        }
        this.map.infoWin.content = content;
        this.map.infoWin.open(this.map, mark);
      }
    },
    /**
     * @public
     * @description Actual constructor function. First and last calls<br />
     * Called by: The loadScript function<br />
     * Notes: This is called sychronously from the callback of the loadScript function, it
     * should not ever be called explicitly.<br />
     * TODO: Change from static JSON file to dynamic file from Drupal
     */
    init: function() {
      // AJAX call to return a file containing theater information
      // This call should not be async, as it may not return before the map is loaded
      // This Creates markers on the map for the theatres agw
      // This function retrieves the users location agw
      var pref = user.hasPref();

      // Geocoder object creation
      // This inits the Geocoder object and allows us to find the nearest location
      this.geoCoder = new google.maps.Geocoder();

      var map_util = this;
      // The User Location Management for this module.
      this.userLocation = (function() {
        //Primary user location system. This has the preference tree built in.
        //This is a self-calling anonymous function, so this.userLocation will always be a position
        //and does not need to be called explicitly.
        var c,
                // Grab location meta tag for location aware pages (theatre pages)
                meta = ($('meta[name="location"]').length > 0) ? $('meta[name="location"]').attr('content').split('&') : false;
        // see if a user has a location set already
        if (typeof (map_util.usrLoc) !== 'undefined') { //checks to see if an async location was declared
          return map_util.usrLoc.geometry.location;
        }
        else if (pref) { // then if the user has a pref
          if (meta) { //if the page is location aware
            if (meta[1] === '1') { //if the location aware page has an override set
              user.setIncidental(meta[0], true);
              pref = user.hasPref();
            }
            else { //if the location aware page does not override
              user.setIncidental(meta[0], false);
            }
            return map_util.getDataById(meta[0]).map.position;
          }
          else { //if the page is not location aware
            if (pref.type === 'location') { //if their preferred location is an input location
              return map_util.getDataById(pref.nearby[0][2]).map.position;
            }
            else { //if their preferred location is not an input location
              return new google.maps.LatLng(pref.lat, pref.lng);
            }
          }
        }
        else if (meta) { //if the user does not have a preference, but the page is location aware
          user.setIncidental(meta[0], false);
          pref = user.hasPref();
          return map_util.getDataById(meta[0]).map.position;
        }
        else { //If all else fails, just default to this location
          return new google.maps.LatLng(42.432595, -71.020453);
        }
      })();

      this.locHeader();

      // this.createMap($('#map_canvas'), $('#map_container'));

      if (pref && pref.type !== 'location') {
        this.closestMark(this.userLocation.lat(), this.userLocation.lng());
      }
      else {
        this.closestMark(pref.lat, pref.lng);
      }
    },
    /**
     * @public
     * @description best function ever (returns all available theatre data from id)<br />
     * Called by: tons of functions<br />
     * Notes: This has gone through a number of iterations, so pay no attention to the
     * separate functions<br />
     * TODO: Merge with vestdata() again
     * @param {str} theatreId ID of the theatre to get data
     * @return {object} object contaiing all available information about a theatre
     */
    getDataById: function(theatreId) {
      var b, str = "" + theatreId,
              index = _.indexOf(this.index, str);
      return this.vestData(index);
    },
    /**
     * @public
     * @description Superfluous function for getting the data
     * @param  {int} index the index of the target theatre in the data arrays
     * @return {object} An object containing all the available information about the theatre
     */
    vestData: function(index) {
      return {
        'general': this.locationInfo[index],
        'map': this.markers ? this.markers[index] : false,
        'index': index
      };
    },
    /**
     * @public
     * @description Calls the Google geocode function, then routes a user to the closest mark<br />
     * Called by: geoGraph()<br />
     * Notes: Calls to the google code to get the coordinates of a given address
     * @param {str} value An address string
     * @param {function} callback The function to be called on success
     */
    geoCode: function(value, callback) {
      // Scope messy
      if (!MapsUtility.geoCoder) {
        MapsUtility.geoCoder = new google.maps.Geocoder();
      }
      MapsUtility.geoCoder.geocode({
        'address': value
      }, callback);
    },
    /**
     * @public
     * @description Acts as a wrapper for geoCode()<br />
     * Called by: document form submission (listener on document ready)<br />
     * Notes: This uses the partial function implementation, so codex is actually a function
     * that acts as the callback on the geoCode function. This function went through several
     * iterations, and this works for now. Please do not touch unless absolutely necessary.<br />
     * TODO: This includes a direct interaction with the map literal that it really shouldn't have.
     * @param {str} value An address string
     * @param {function} callback A function to be called on the success of this specific function
     */
    geoGraph: function(value, callback) {
      var codex = this.geoCode.partial(undefined, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          MapsUtility.usrLoc = results[0];
          var matrix = MapsUtility.closestMark(MapsUtility.usrLoc.geometry.location.lat(), MapsUtility.usrLoc.geometry.location.lng());
          if (MapsUtility.closestList().length > 0) {
            user.setLocation(MapsUtility.usrLoc, MapsUtility.closestList());
            //this.openInfo(matrix);
            callback();
          }
          else {
            window.alert("I'm sorry, there are no Showcase Cinemas locations in this area.");
          }
        }
        else {
          window.alert("I'm sorry, but I couldn't find any locations with that name or ZIP code.");
        }
      });
      codex(value);
    },
    /**
     * @public
     * @description Finds the closest theater to a given lat and lon<br />
     * Called by: init(), geoCode()<br />
     * Notes: This uses the haversine formula to do a calculation on the distance between points
     * on a sphere. It's not an amazing solution, but it's close enough. This function also
     * relies on a dirty, dirty (but kind of awesome) hack of the Array prototype to add a
     * mergeSort function.
     * @return {Google.Map.Marker} The map marker closest to the input location. (Also defines the tDist Array in
     * the this object, which is an array of all the distances, and their corresponding
     * map marker indexes).
     * @param {float} uLat The user's latitude
     * @param {float} uLon The user's longitude
     */
    closestMark: function(uLat, uLon) {
      var t = this.markers,
              distance = [],
              closest;
      // Haversine formula variables
      var userLat = parseFloat(uLat);
      var userLon = parseFloat(uLon);
      // var R = 6371; // in km
      var R = 3956.6; // in miles
      for (var i = 0; i < t.length; i += 1) {
        var theaterLat = t[i].position.lat();
        var theaterLon = t[i].position.lng();
        var distLat = this.rad(theaterLat - userLat);
        var distLon = this.rad(theaterLon - userLon);
        var a = Math.sin(distLat / 2) * Math.sin(distLat / 2) + Math.sin(distLon / 2) * Math.sin(distLon / 2) * Math.cos(this.rad(theaterLat)) * Math.cos(this.rad(userLat));
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        distance[i] = [d, i, this.locationInfo[i].house_id];
      }
      this.tDist = distance.mergeSort(distance);
      closest = this.tDist[0][1];

      return this.markers[closest];
    },
    closestTheatre: function(uLat, uLon) {
      var t = this.locationInfo,
              distance = [],
              closest;
      // Haversine formula variables
      var userLat = parseFloat(uLat);
      var userLon = parseFloat(uLon);
      // var R = 6371; // in km
      var R = 3956.6; // in miles
      for (var i = 0; i < t.length; i += 1) {
        var theaterLat = parseFloat(t[i].lat);
        var theaterLon = parseFloat(t[i].lon);
        var distLat = this.rad(theaterLat - userLat);
        var distLon = this.rad(theaterLon - userLon);
        var a = Math.sin(distLat / 2) * Math.sin(distLat / 2) + Math.sin(distLon / 2) * Math.sin(distLon / 2) * Math.cos(this.rad(theaterLat)) * Math.cos(this.rad(userLat));
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        distance[i] = [d, i, this.locationInfo[i].house_id];
      }
      this.theatreDist = distance.mergeSort(distance);
      closest = this.theatreDist[0][1];

      return this.locationInfo[closest];
    },
    closestTheatresList: function() {
      var distances = this.theatreDist,
              inRange = [];
      var top = distances.slice(0, 5);
      for (var i = 0; i < top.length; i += 1) {
        if (top[i][0] < 100) {
          inRange.push(top[i]);
        }
      }

      return inRange;
    },
    /**
     * @public
     * @description Creates an array of up to the top five theaters within 100 miles<br />
     * Called by: Called explicitly by the document
     * @return {array} An array of the top five closest theaters within 100 miles
     * [[distance, index of the theater in the map marker array]]
     */
    closestList: function() {
      var distances = this.tDist,
              inRange = [];
      var top = distances.slice(0, 5);
      for (var i = 0; i < top.length; i += 1) {
        if (top[i][0] < 100) {
          inRange.push(top[i]);
        }
      }

      return inRange;

    },
    /**
     * @public
     * @description Appends the currently preferred location to the location object<br />
     * Called by: init();<br />
     * Notes: This will be depreciated by the preferred location function<br />
     * TODO: Swap out for a preferred location function
     */
    locHeader: function() {
      var c = user.getLocation(),
              target = $('.current_location');
      if (typeof (c) !== 'undefined') {
        target.text(c.city + ', ' + c.state).data({
          lat: c.lat,
          lng: c.lng
        });
      }
      else {
        target.parent().detach();
      }
    },
    /**
     * @public
     * @description converts degrees to radians<br />
     * Called by: closestMark()
     * @return {float} distance in radians
     * @param {float} x an angle expressed in degrees
     */
    rad: function(x) {
      return x * Math.PI / 180;
    }
  };


  return MapsUtility;
});
