define([
  'backbone',
  'mustache',
  'matchMedia',
  'waypoints',
  'waypointssticky',
  'text!app/templates/mobinavview.html'
], function (Backbone, mustache, matchMedia, waypoints, waypointssticky, template){
  var mobNavView = Backbone.View.extend({
    template: template,

    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
    },

    events:{
      "click .nav__item" : "filterSet",
      "click .name" : "menuView",
      "click #icon" : "menuView",
      "click .close-menu" : "closeMenu",
      "click #resume" : "resumeView",
      "click .nav-wrap" : "toggleMenu"
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
      var height = $(window).height();
      $('.skills-mobile').data('height', 'auto');
      $('.page').addClass('mobile');
    },

    filterSet : function(e){
      var target = $(e.currentTarget);
      var arg = target.data('skill');
      $('.active-item').removeClass('active-item');
      target.addClass('active-item');
      this.trigger('filter', arg);
      $('.page').removeClass('menu_open');
    },

    menuView : function(e){
      //var height = $('.skills-mobile').data('height');
      //$('.skills-mobile').css('height', height);
      $('.page').addClass('menu_open');
    },

    toggleMenu: function(){
      var open = $('.page').hasClass('menu_open');
      if(open){
         this.closeMenu();
      } else {
        this.menuView();
      }
    },

    closeMenu : function(e){
      //$('.skills-mobile').css('height', 0);
      $('.page').removeClass('menu_open');
    },

      resumeView : function(e){
          this.trigger('resumeView');
      }
  });

  return mobNavView;
});