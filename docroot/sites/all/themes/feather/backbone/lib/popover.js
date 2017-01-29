define([
  'jquery',
  'placeholder'
],
function($, placeholder){
// pop over plugin
  /**
   * Creates a popover object
   * @constructor
   * @private
   * @param {DOMElement} element Element the popover should attach to
   * @param {obj}        options Options for the generated popover
   */
  var Popover = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.enabled = true;
    this.$element.trigger('customEVENT');
  };

  Popover.prototype = {

    /**
     * Shows the popover
     * @param  {DOMElement} parent the clicked element on the DOM
     */
    show: function (parent) {
      var placement = this.options.placement,
        tp, pos, $tip, realHeight, realWidth;

      $(parent).addClass('active');
      $tip = this.options.content;
      $tip.remove().css({
        top: 0,
        left: 0,
        display: 'block'
      }).prependTo(document.body);

      realHeight = $tip[0].offsetHeight;
      realWidth = $tip[0].offsetWidth;


      pos = $.extend({}, this.$element.offset(), {
        width: this.$element[0].offsetWidth,
        height: this.$element[0].offsetHeight
      });

      switch (placement) {
        case 'below':
          tp = {
            top: pos.top + pos.height + this.options.offset - 1,
            left: pos.left + pos.width / 2 - realWidth / 2
          };
          break;
        case 'above':
          tp = {
            top: pos.top - realHeight - this.options.offset,
            left: pos.left + pos.width / 2 - realWidth / 2
          };
          break;
        case 'left':
          tp = {
            top: pos.top + pos.height / 2 - realHeight / 2,
            left: pos.left - realWidth - this.options.offset
          };
          break;
        case 'right':
          tp = {
            top: pos.top + pos.height / 2 - realHeight / 2,
            left: pos.left + pos.width + this.options.offset
          };
          break;
        case 'leftAlign':
          tp = {
            top: pos.top + pos.height - 1,
            left: pos.left - 1
          };
          break;
      }

      $tip.css(tp).addClass(placement).addClass('in');
      this.$element.addClass('active_pop');
      if (this.$element.attr('id') === 'nav_events') {

        $tip.data('form-type', 'eventsCal');
      }
      if (this.$element.attr('id') === 'nav_showtime') {
        $tip.data('form-type', 'showtimes');
      }
      else if (this.$element.hasClass('changer')) {
        $tip.data('form-type', 'movie_listing');
      }

      //Add placeholder text support for IE and things
      $('input[placeholder], textarea[placeholder]').placeholder();
    },

    /**
     * Hides a popover
     * @param  {DOMElement} parent The element that the popover is 'attached' to
     */
    hide: function (parent) {
      var that = this,
        $tip = this.options.content;
      $(parent).removeClass('active');
      $tip.removeClass('in');
      this.$element.removeClass('active_pop');
      $tip.detach();
    },

    /**
     * Sets the markup to be displayed in the popover
     * @param {HTML} content The HTML to be displayed in the popver
     */
    setContent: function (content) {
      var $tip = this.pop();
      var inner = $tip.find('.locForm').html(content);
      $tip.append(inner);
      this.options.content = $tip;
    },

    /**
     * Changes the content for a popver to an empty string
     */
    unsetContent: function () {
      this.setContent('');
    },

    /**
     * @ignore
     */
    hasContent: function () {

    },

    /**
     * Decides whether to show or hide the popover
     * @param  {DOMElement} parent The element the popover should be 'attached' to
     */
    toggle: function (parent) {
      this[this.options.content.hasClass('in') ? 'hide' : 'show'](parent);
    },

    /**
     * Generates the block to be appended to the page
     * @return {HTML} An HTML snippet that contains the Markup set in setContent()
     */
    pop: function () {
      return $('<div class="popBox" />').html(this.options.template);
    }
  };

  /**
   * jQuery popover function call
   * @param  {obj}    options Object with all the options for the popover
   * @return {jQuery}         Self returning for jQuery chaining
   */
  $.fn.popover = function (options) {
    $.fn.popover.initWith(this, options, Popover, 'popover');
    return this;
  };

  /**
   * Initializes the jQuery instance of the popover
   * @constructs
   * @param  {DOMElement} el          The element that the popover is being applied to
   * @param  {obj}        options     Options the popover should be instantiated with
   * @param  {function}   Constructor The constructor function to create the popover
   * @param  {str}        name        The name of the popover being created
   */
  $.fn.popover.initWith = function (el, options, Constructor, name) {
    var opt = $.extend({}, $.fn.popover.defaults, options);

    /**
     * Gets the popover info for a given element, if no popover exists on that element, one is created
     * @param  {DOMElement} el The element to get the popover for
     * @return {Popover}       Returns the popover object
     */
    function get(el) {
      var popover = $.data(el, name);

      if (!popover) {
        popover = new Constructor(el, opt);
        $.data(el, name, popover);
      }

      return popover;
    }

    /**
     * Proxy function to set the markup for the popover
     * @param {DOMElement} element The element to check for the popover
     */
    function setData(element) {
      var pop = get(element);
      pop.setContent(opt.content);
    }

    /**
     * Grabs events on the popover and decides what to do with them
     * @param  {Event} e The triggering event object
     * @return {bool}    True if the user has a pref, otherwise false
     */
    function observeEvent(e) {
      var t;
      if ((t = window.User.hasPref()) && !opt.override) {
        return true;
      }
      else {
        e.preventDefault();
        e.stopPropagation();
        var pop = get(this);
        pop.toggle(this);
        if(opt.customevent){
          $(document).trigger(opt.customevent);
        }
        return false;
      }
    }

    /**
     * Hides the currently displaying popover box
     * @param  {Event}  e Triggering hide event
     */
    function hider(e) {
      e.preventDefault();
      e.stopPropagation();
      var pop = get($('.active_pop'));
      pop.hide();
    }

    //Set the data on document ready
    setData(el);

    //Part of the initWith method
    if (opt.trigger !== 'manual') {
      $(document).off(opt.trigger, el.selector);
      $(document).on(opt.trigger, el.selector, observeEvent);
      $(document).on('submit', '.locForm', hider);
      $(document).on('hidePop', hider);
    }
  };

  $.fn.popover.defaults = {
    offset: 0,
    html: true,
    trigger: 'click',
    template: '<form class="locForm popForm"></form>',
    placement: 'leftAlign',
    override: false,
    // An event for binding events to
    customevent: 'popOverCreated',
    content: '<label for="location">Find showtimes near:</label><input type="text" name="location" placeholder=" Zip Code or City, State"><input type="submit" name="submit" value="Search">'
  };
});
