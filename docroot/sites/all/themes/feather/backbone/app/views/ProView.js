define([
  'app/views/BaseView',
  'moment',
  'text!app/templates/proview.html'
], function (BaseView, moment, template) {
  var ProView = BaseView.extend({
    tagName: 'div',
    id: function(){
      return this.model.get('nid');
    },
    className: 'project',
    template: template

  });

  return ProView;
});