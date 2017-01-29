/**
 * Created by Awardwell on 2/18/14.
 */
define([
'backbone'
], function(Backbone){

  var TheatreModel = Backbone.Model.extend({
    idAttribute: 'theatre_id',

    defaults: {
      title: "Title of the theatre",
      theatre_id: "Maps to the CMS Node id",
      image_url: "Fully formated URL of the Theatre image",
      house_id: "House ID differs from the theatre ID",
      house_name: "Name of the Theatre (house)",
      theatre_type: "Such as Superluxe",
      location: "location of the theatre",
      address: "Address of the theatre",
      city: "Name of the city such as Warwick",
      state: "State abbreviation such as RI",
      zip: "The Zip Code of the Model",
      country: "Name of the Country",
      county: "Name of the County",
      technologies: ["What technologies are used such as Dolby or IMAX"],
      numscreens: "Number of Screens",
      lat: "Latitude of the theatre",
      lon: "Longitude of the theatre",
      amenities: ["An array with the amenities"],
      description: "A Description of the theatre for use in the detail view of the theatre",
      features: ["Features at the selected theatre"],
      ad: "The relevent ad link for the theatre",
      age_policy: "The age policy for the theatre."
    }

  });

  return TheatreModel;

})