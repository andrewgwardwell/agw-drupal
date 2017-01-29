define([
  'jquery',
  'filteredcollection',
  'Snap',
  'utility',
  'matchMedia',
  'app/views/NavView',
  'app/views/mobNavView',
  'app/views/ProjectsView',
  'app/views/ProjectDetailView',
  'app/views/ResumeView',
  'app/collections/ProCollection',
  'app/routers/router',
  'domReady!'
], function($, FilteredCollection, Snap, u, matchMedia, NavView, mobNavView, ProjectsView, ProjectDetailView, ResumeView, ProCollection, router) {
  var coll = new ProCollection,
//    set up the filtered collection
      sk_coll = FilteredCollection(coll),
      sk_coll_2 = FilteredCollection(coll),
      sk_coll_3 = FilteredCollection(coll),
//    give element and the collection to work off of
      nav,
      resume = new ResumeView(),
      display = new ProjectsView({el: '#display-container', collection: sk_coll_2}),
      detail = new ProjectDetailView({el: '#detail-container', collection: sk_coll_3}),
      mobile = matchMedia('(min-width: 768px)').matches,
      route = new router();
    Backbone.history.start();

  if(mobile){
    nav = new NavView({el: '#nav-container', collection: sk_coll});
  } else {
    nav = new mobNavView({el: '#nav-container', collection: sk_coll});
  }
//  reset the models in the origs
  coll.reset(Drupal.settings.projects, {silent: true});
//  filter to only professional projects
  nav.collection.filter(function(item){
    var project_cat = item.get('project_type');
//    return project_cat === 'B';
    return true;
  });

  display.listenTo(nav, 'filter', function(arg){
      if(arg != 'resume'){
          $('.page').removeClass('resume');
      }
    display.collection.filter(function(item){
      var skills = item.get('skills');
      return _.contains(skills, arg);
    });
      $(document).scrollTop(0);
  });



  detail.listenTo(display, 'detailOpen', function(project_id){
    detail.collection.filter(function(item){
      var item_id = item.get('nid');
      return item_id == project_id;
    });
      $(document).scrollTop(0);
  });

  $('.open-button').on('click', function(){
    $('.page').removeClass('three').addClass('two');
      $(document).scrollTop(0);
  });

  window.stick_count = 0;
  window.ring_count = 0;
  var s = Snap('#svg');
  var icon = Snap('.icon');
  resume.render();

    display.listenTo(nav, 'resumeView', function(){
      var hasClass = $('.page').hasClass('resume');
        if(hasClass){
            $('.page').removeClass('resume');
        } else {
            $('.page').addClass('resume');
        }
  });


  display.listenTo(nav, 'homeView', function(){
    $('.page').removeClass('two').removeClass('three').removeClass('resume');
    $('.open').removeClass('open');
    var lines = s.selectAll('line');
    lines.remove();
    if(window.stick_count > 300){
      window.stick_count = 0;
      boxOLines();
    } else {
      window.stick_count = 0;
    }
  });

  detail.listenTo(nav, 'homeView', function(){
    $('.page').removeClass('two').removeClass('three').removeClass('resume');
    $('.open').removeClass('open');
    var lines = s.selectAll('line');
    lines.remove();
    if(window.stick_count > 300){
      window.stick_count = 0;
      boxOLines();
    } else {
      window.stick_count = 0;
    }
  });

  function buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke, limit){
    var center_1 = u.getRandomArbitrary(0, 1400),
      line = s.line(x1, center_1, x2, center_1);
    line.attr({
      stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
      strokeWidth: stroke
    });
    line.animate({x1: x1-20}, 300, mina.bounce, function(){
      var tilt = u.getRandomArbitrary(2, 50),
        tilt_2 = u.getRandomArbitrary(1, 46);
      this.animate({y1: pointer}, 400, mina.bounce);
      this.animate({y2: pointer}, 400, mina.bounce);
      if (tilt < 25){
        tilt = pointer-tilt;
      } else {
        tilt = pointer+tilt;
      }
      if (tilt > 25){
        tilt_2 = pointer-tilt_2;
      } else {
        tilt_2 = pointer+tilt_2;
      }
      this.animate({y1: tilt}, 700, mina.bounce, function(){
        this.animate({y1: tilt_2}, 200, mina.bounceslide);
        if(pointer > end && dir === 'front'){
          dir = 'back';
        }
        if(pointer < start && dir === 'back'){
          dir = 'front';
        }
        if (dir === 'back'){
          pointer = pointer - 15;
        } else {
          pointer = pointer + 25;
        }
        if(window.stick_count < limit){
          buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke, limit);
          window.stick_count++;
        }
      });
    });
  }

  function buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke, limit){
//  Where we are coming from.
    var center_1 = u.getRandomArbitrary(0, 1400),
//    coords
      line = s.line(center_1, y1, center_1, y2);
//  characteristics
    line.attr({
      stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
      strokeWidth: stroke
    });
//  move the line little from the start in this case lengthing the height of the line
    line.animate({y1: y1+20}, 300, mina.bounce, function(){
//     we are going to tilt the line one way or the other increments 2-50
      var tilt = u.getRandomArbitrary(2, 50),
        tilt_2 = u.getRandomArbitrary(1, 46);
//    everytime we circle through we are moving the line along then tilting it later
      this.animate({x1: pointer}, 400, mina.bounce);
      this.animate({x2: pointer}, 400, mina.bounce);
//    tilting it from the start based on random number
      if (tilt < 25){
        tilt = pointer-tilt;
      } else {
        tilt = pointer+tilt;
      }

      if (tilt_2 > 25){
        tilt_2 = pointer-tilt_2;
      } else {
        tilt_2 = pointer+tilt_2;
      }
//    make the tilt happen
      this.animate({x1: tilt}, 700, mina.bounce, function(){
        this.animate({x2: tilt_2}, 200, mina.bounceslide);
//      now we determin the direction we are going on the next time around
        if(pointer > end && dir === 'front'){
//        the start or pointer is more than the end mark turn around
          dir = 'back';
        }

        if(pointer < start && dir === 'back'){
//        the pointer is less than the start
          dir = 'front';
        }
        if (dir === 'back'){
          pointer = pointer - 15;
        } else {
          pointer = pointer + 25;
        }
        if(window.stick_count < limit){
          buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke, limit);
          window.stick_count++;
        } else {
//          glowRings();
        }
      });
    });
  };



  function glowRings(mobile){
  //This can be the glowing function

    // Then use it as a fill on big circle
    if(mobile){
      var ic_3 = icon.circle(75, 75, 20);
      var ic_4 = icon.circle(75, 75, 10);
      var ic_5 = icon.circle(75, 75, 5);
      var small_rings = icon.group(ic_3, ic_4, ic_5);
    } else {
      var ic = icon.circle(75, 75, 50);
      var ic_1 = icon.circle(75, 75, 40);
      var ic_2 = icon.circle(75, 75, 30);
      var ic_3 = icon.circle(75, 75, 20);
      var ic_4 = icon.circle(75, 75, 10);
      var ic_5 = icon.circle(75, 75, 5);
      var small_rings = icon.group(ic, ic_1, ic_2, ic_3, ic_4, ic_5);
    }

    small_rings.attr({
//  with a masking effect the darkening works the same way as in photoshop
//  darks == the level of transprency
      stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
      strokeWidth: 2
    });

    // colors of the circles
    ic_3.attr({
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
    });

    ic_4.attr({
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
    });

    ic_5.attr({
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
    });
    if(!mobile){
    ic.attr({
//  stroke: "#000",
      strokeWidth: 2,
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
//  mask: small_rings
    });
    ic_1.attr({
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
    });

    ic_2.attr({
      fill: '#'+Math.floor(Math.random()*16777215).toString(16)
    });
    }

    $(document).ready(function(){
      if(matchMedia('(min-width: 768px)').matches){
        $('.icon').hover(function(){
          makeglow(small_rings, 'add');
        }, function(){
          makeglow(small_rings, 'minus');
        });
      }
    });
  }

  function makeglow(small_rings, op){
    for (var n = 0; n < 5; n++){
      var val, stroke, scolor, radius = parseInt(small_rings[n].attr('r')),
          color = '#'+Math.floor(Math.random()*16777215).toString(16);
      if(op == 'add'){
        scolor =  '#'+Math.floor(Math.random()*16777215).toString(16);
        val = radius + 9;
        stroke = 3;
      } else {
        scolor = 'white';
        val = radius - 9;
        stroke = 1;
      }
      if(val > 0){
        small_rings[n].animate({r: val}, 400, mina.bounce);
      }
      small_rings[n].animate({fill: color}, 1000, mina.easeInOutBounce);
      //  for (var i = 0; i < 5; i++){
      small_rings[n].animate({stroke: scolor}, 1000);
      small_rings[n].animate({strokeWidth: 3}, 400, function(){
        window.restoreCircle =  window.setInterval(function(){
          small_rings[0].animate({r:50}, 400, mina.bounce);
          small_rings[1].animate({r:40}, 400, mina.bounce);
          small_rings[2].animate({r:30}, 400, mina.bounce);
          small_rings[3].animate({r:20}, 400, mina.bounce);
          small_rings[4].animate({r:10}, 400, mina.bounce);
          small_rings[5].animate({r:5}, 400, mina.bounce);
        }, 40000);
      });
  }
}

function boxOLines(){
  //    top
  buildLineCube_h1(0, 150, 50, 600, 'front', 300, 1, 500);
//    bottom
  buildLineCube_h1(350, 500, 0, 600, 'back', 300, 1, 500);
//    horizontal x1 and x2 and sx and ex and pointer
//    left
  buildLineCube_v1(0, 150, 50, 500, 'back', 300, 1, 500);
//    right
  buildLineCube_v1(450, 600, 50, 500, 'front', 300, 1, 500);
}


  if(matchMedia('(min-width: 768px)').matches){
    glowRings(false);
  } else{
    glowRings(true);
  }

  if(matchMedia('(min-width: 768px)').matches){
    var ds = Snap.selectAll('.dot');
    $.each(ds, function(){
      var color = '#'+Math.floor(Math.random()*16777215).toString(16),
        scolor = '#'+Math.floor(Math.random()*16777215).toString(16),
        size = u.getRandomArbitrary(1, 4),
        ssize = u.getRandomArbitrary(0, 3);
      this.circle(5, 5, size);
      this.attr({
        fill: color,
        stroke: scolor,
        strokeWidth: ssize
      });
    });
  }

  window.setTimeout(function(){
    boxOLines();
  }, 1000);


});

