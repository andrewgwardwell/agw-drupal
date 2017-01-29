define([
  'backbone',
  'mustache',
  'app/views/ProView',
  'text!app/templates/navview.html'
], function (Backbone, mustache, ProView, template) {
  var NavView = Backbone.View.extend({
    template: template,

    initialize: function () {
      this.listenTo(this.collection, 'reset', this.render);
      if(matchMedia('(min-width: 768px)').matches){
        this.$el.on('transitionend', function(){
        var $this = $(this);
        if($this.hasClass('closed')){
          $('.page').addClass('two');
          $this.removeClass('closed').addClass('open');
        }
      });
      }
    },

    events:{
      "click .project" : "detailView"
    },

    preprocess: function(data){
      if(matchMedia('(min-width: 768px)').matches){
        var height = $(window).height();
        this.$el.css('min-height', height);
      }
    },

    render: function() {
      this.$el.html('');
      var data = {};
      this.preprocess(data);
//      this.$el.html(mustache.render(this.template, data));
      this.collection.each(function(item) {
        var view = new ProView({
          model: item
        });
        this.$el.append(view.render().el);
      }, this);
      this.postprocess();
      return this;
    },

    postprocess: function(){
        if(this.$el.hasClass('open')){
        $('.page').removeClass('three').removeClass('two');
        this.$el.removeClass('open').addClass('closed');
      } else {
        this.$el.addClass('open').removeClass('closed');
        $('.page').removeClass('three').addClass('two');
      }
    },

    detailView : function(e){
      var project_id = e.currentTarget.id;
      $('.active').removeClass('active');
      $(e.currentTarget).addClass('active');
      this.trigger('detailOpen', project_id);
    }

  });

  return NavView;
});
