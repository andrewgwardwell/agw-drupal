define([
  'backbone',
],
  function (Backbone) {
    var router = Backbone.Router.extend({
      routes: {
        'resume': 'resume'
      },

    resume: function(){
        $('.page').addClass('resume');
        //this.navigate('resume');
    },

      initialize: function(){
        this.on('route', this.trackPage);
      }

    });

    return router;
  });