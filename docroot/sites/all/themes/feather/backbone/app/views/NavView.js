define([
  'backbone',
  'mustache',
  'matchMedia',
  'text!app/templates/navview.html'
], function (Backbone, mustache, matchMedia, template) {
  var NavView = Backbone.View.extend({
    template: template,

    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
    },

    events:{
      "click .nav__item" : "filterSet",
      "click .name" : "homeView",
      "click #resume" : "resumeView",
      "click .icon" : "homeView"
    },

    preprocess: function(data){
      data.name = "Andrew Wardwell";
      data.skills = _.uniq(_.flatten(this.collection.pluck('skills')));
    },

    render: function() {
      this.$el.html('');
      var data = {};
      this.preprocess(data);
      this.$el.html(mustache.render(this.template, data));
      this.postprocess();
      return this;
    },

    postprocess: function(){
      if(matchMedia('(min-width: 768px)').matches){
        var height = $(window).height();
        this.$el.height(height);
      } else {

      }
    },

    filterSet : function(e){
      var arg = $(e.currentTarget).data('skill');
      this.trigger('filter', arg);
    },

    homeView : function(e){
      $('.page').removeClass('two').removeClass('three');
      this.trigger('homeView');
    },

    resumeView : function(e){
        var tar = $(e.currentTarget),
            act = tar.hasClass('active-res');
        if(act){
            tar.removeClass('active-res');
        } else {
            tar.addClass('active-res');
        }
        $('.page').removeClass('two').removeClass('three');
      this.trigger('resumeView');
    }
  });

  return NavView;
});