/**
 * Created with JetBrains PhpStorm.
 * User: Awardwell
 * Date: 5/27/13
 * Time: 6:44 PM
 * To change this template use File | Settings | File Templates.
 */

(function($){
  Drupal.entickle = {};
  Drupal.entickle.sticky_header = function () {
   if (matchMedia('(max-width: 320px)').matches){
   var nav = $('#nav-wrapper');
   nav.waypoint('sticky', {
     offset: -60
   });
   } else {
     var nav = $('#nav-wrapper');
     var header = $('#header-wrapper');
     nav.waypoint('sticky', {
       offset: -1
     });
   }
  };

  Drupal.entickle.masonryImages = function() {
    Drupal.entickle.masInit();
  };

  Drupal.entickle.masInit = function (){
    var main_wrapper = $('#main-wrapper');
    var images_container = $('#block-ent-ajax-home-page-view-area');
    //    images_container.imagesLoaded(function(){
    var node = $('.node__project');
    images_container.imagesLoaded(function(){
      if(node.length > 0){
      images_container.masonry({
        itemSelector: '.node__project',
//        columnWidth: images_container.querySelector('.node__project'),
        columnWidth: function( containerWidth ) {
          return containerWidth / 160;
        },
//        isAnimated: true,
//        gutterWidth: 1,
        isFitWidth: true
      });
      }
    });
  };

  Drupal.entickle.active_form_element = function(){
    $('.form-item label').removeClass('active');
    var tid = Drupal.settings.current_form_element;
    $('[for="edit-work-'+tid+'"]').addClass('active');
    $('body').addClass('no-resize');
  };

  Drupal.entickle.main_height = function(){
    var fimage = $('.front-page-image');
    if(fimage.length > 0){
      var wid_ht = $(window).height();
      if (matchMedia('(max-width: 320px)').matches){
      } else {
        fimage.css('height', wid_ht-120+'px');
      }
    }else{

    }
  };

  Drupal.entickle.skills = function(){
    $('.skills__trigger').on('click', function(){
      var skills = $('.footer__skills');
      var perc = $('.skill__perc');
      var wrapht = $('#main-wrapper').height();
      var mobile_scroll = $('.logos__skills').offset();
      console.log(skills.css('opacity'));
      if (skills.css('opacity') < 1){
        $(this).addClass('active-trigger');
        skills.animate({opacity: 1}, 1000, function(){
        $.each(perc, function(key, value){
          var tage = $(this).attr('data-perc')-10;
          $(this).css('width', tage+'%');
        });
          if (matchMedia('(max-width: 320px)').matches){
            $("html, body").animate({scrollTop: mobile_scroll.top+'px'}, 1000);
          } else {
            $("html, body").animate({scrollTop: wrapht+'px'}, 1000);
          }
        });
      } else {
        $(this).removeClass('active-trigger');
        $.each(perc, function(key, value){
          $(this).css('width', '20px');
        });
        skills.animate({opacity : 0}, 1000);
        $("html, body").animate({scrollTop: '0px'}, 1000);
      }
    });
  }

  Drupal.entickle.flexsliderInit = function (){
    if($('.not-front').length > 0){
     $('.flexslider').flexslider({
       animation: "slide",
       controlNav: "thumbnails",
       smoothHeight: true,
       duration: 10000,
       after: function() {
         if (matchMedia('(max-width: 768px)').matches){
           $('html').animate({scrollTop:0}, 500);
         } else {
         }
       }
     });
    }
  };

   /**
   * Send an event to Google Analytics.
   *
   * @param array vars
   *  An array of variables to send to Google Analytics.
   *  Valid vars include: category, label, action, value.
   */
  Drupal.entickle.trackGaEvent = function(vars) {
      ga('send', {
        hitType: 'event',
        eventCategory: vars.category,
        eventAction: vars.action,
        eventLabel: vars.label,
        eventValue: vars.value
      });
  }


  Drupal.entickle.menuSelectionTrack = function (){
    $('#edit-work .form-item').on('click', function(event){
      var value = this.innerText;
      var vars = {
        category: 'Menu Tracking',
        action: 'Click',
        label: value
      }
      if (event.target.tagName.toUpperCase() == 'LABEL'){
      Drupal.entickle.trackGaEvent(vars);        
      }
    })
  }


  $(document).ready(function(){
    Drupal.entickle.sticky_header();
    Drupal.entickle.skills();
    Drupal.entickle.main_height();
    Drupal.entickle.menuSelectionTrack();
  });

  $(window).load(function(){
    Drupal.entickle.flexsliderInit();
  });

  $(window).resize(function(){
//    setTimeout(Drupal.entickle.main_height(), 250);
  });

  $(document).ajaxComplete(function(){
    Drupal.entickle.active_form_element();
    Drupal.entickle.masonryImages();
  });

})(jQuery);