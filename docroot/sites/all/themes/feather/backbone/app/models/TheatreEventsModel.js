/**
 * Created by Awardwell on 2/18/14.
 */
define([
  'backbone'
], function(Backbone){

  var TheatreEventsModel = Backbone.Model.extend({
    idAttribute: 'event_id',
    defaults: {
      theatre_ids : ["Theatre IDs mappable to CMS nids"],
      house_ids : ["House IDs"],
      event_id : "Event ID mappable to the CMS",
      title : "Title of the event",
      image_url: "Image url",
      start_time : "Starting time of the event",
      end_time : "Ending time of the event",
      description : "Description of the event",
      link : "Location of the Event"
    }

  });
  return TheatreEventsModel;
})
