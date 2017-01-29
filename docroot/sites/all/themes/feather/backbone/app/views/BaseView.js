define([
  'backbone',
  'mustache',
], function (Backbone, mustache) {
  var BaseView = Backbone.View.extend({

    render: function() {
      var data = {};
      if(this.model) {
        data = this.model.toJSON();
      }
      this.preprocess(data);
      this.$el.html(mustache.render(this.template, data));
      this.postprocess();

      return this;
    },

    // Good for manipulating the data before it gets rendered on the page
    preprocess: function(data) {},

    // Good for doing some other stuff that I am not clear on
    postprocess: function() {}
  });

  return BaseView;
});