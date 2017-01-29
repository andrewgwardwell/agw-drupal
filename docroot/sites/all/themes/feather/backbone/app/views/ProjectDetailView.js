define([
  'backbone',
  'mustache',
  'matchMedia',
  'text!app/templates/projectdetail.html',
], function (Backbone, mustache, matchMedia, template) {
  var ProjectDetailView = Backbone.View.extend({
    template: template,

    events: {
//      'change .movie_multi_format' : 'getOtherVersion'
  },

    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
    },

    preprocess: function(data){
      if(matchMedia('(min-width: 768px)').matches){
        var height = $(window).height();
        this.$el.css('min-height', height);
      }
    },

    render: function() {
      var data = {};
      if(this.collection.models) {
        data = this.collection.models[0].toJSON();
      }
      this.preprocess(data);
      // Not extending from our base view becuase we need to make use of the append function
      this.$el.html(mustache.render(this.template, data));
      this.postprocess();
      return this;
    },

    postprocess : function(){
      $('.page').removeClass('two').addClass('three');
    },

    getOtherVersion : function(e){
    }
  });

  return ProjectDetailView;
});