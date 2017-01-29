define([
    'app/views/BaseView',
    'text!app/templates/resumeview.html'
], function (BaseView, template) {
    var ResumeView = BaseView.extend({
        tagName: 'div',
        el: '#resume-container',
        className: 'resume',
        template: template
    });

    return ResumeView;
});