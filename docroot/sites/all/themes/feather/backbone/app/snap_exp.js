/**
 * Created by Awardwell on 4/26/14.
 */

// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);

//big_circle.animate({r: 50}, 1500);
//big_circle.animate({r: 55}, 1500);
//Body
  /*
var body = s.circle(260, 200, 65);
//Head
//var head = s.circle(260, 260, 35);
var head = s.circle(260, 140, 45);
var ear_1 = s.circle(230, 100, 25);
var ear_2 = s.circle(290, 100, 25);
var eye_1 = s.circle(245, 130, 5);
var eye_2 = s.circle(265, 130, 5);
var i_ear_1 = s.circle(230, 100, 15);
var i_ear_2 = s.circle(290, 100, 15);
var leg_1 = s.line(230, 200, 230, 750);
var leg_2 = s.line(290, 200, 290, 750);
var bear = s.group(body, head, ear_2, ear_1);
var legs = s.group(leg_2, leg_1);

legs.attr({
  stroke : "brown",
  strokeWidth: 20
});

var _body = s.circle(260, 200, 45);

_body.attr({
  fill : "beige"
});

var in_ear = s.group(i_ear_1, i_ear_2);
var eyes = s.group(eye_1, eye_2);

var nose = s.circle(255, 150, 15);
var nos_1 = s.circle(250, 140, 2);
var nos_2 = s.circle(260, 140, 2);
var mouth = s.circle(255, 150, 7);
var _mouth = s.circle(255, 150, 2);


var nostrils = s.group(nos_1, nos_2);

nostrils.attr({
  fill : "Black"
});


mouth.attr({
  fill : "Black"
});

_mouth.attr({
  fill : "black",
  mask: mouth
});



bear.attr({
  fill : "Brown"
});

nose.attr({
  fill : "beige"
});

//in_ear_mask.attr({
//  fill : "black"
//});

in_ear.attr({
  fill : "black"
//  mask : in_ear_mask
});

eyes.attr({
  fill : "black"
//  mask : in_ear_mask
});

*/







var s = Snap('#svg');
/**
 * Lines.
 * @type {*}
 */



function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//start = 0;
//start_1 = 0;
//start_2 = 400;
//start_2_op = 'front';
//start_op = 'front';
//start_1_op = 'front';

//function buildLineCube(){
//  var center_1 = getRandomArbitrary(0, 1400),
//    line = s.line(center_1, 0, center_1, 200);
//  line.attr({
////  with a masking effect the darkening works the same way as in photoshop
////  darks == the level of transprency
//    stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
//    strokeWidth: 1
//  });
//  var i = getRandomArbitrary(600, 800);
//    line.animate({y2: 500}, 100, function(){
//      var tilt = getRandomArbitrary(2, 100);
////      var color = '#'+Math.floor(Math.random()*16777215).toString(16)
//      this.animate({x1: start}, 200, mina.bounce);
//      this.animate({x2: start}, 200, mina.bounce);
//      if (tilt < 50){
//        tilt = start-tilt;
//      } else {
//        tilt = start+tilt;
//      }
//      this.animate({x2: tilt}, 400, mina.bounce, function(){
//        if(start > 1000 && start_op === 'front'){
//          start_op = 'back';
//        }
//        if(start < 1 && start_op === 'back'){
//          start_op = 'front';
//        }
//        if (start_op === 'back'){
//          start = start - 85;
//        } else {
//          start = start + 100;
//        }
//        buildLineCube();
//      });
//    });
//}

//function buildLineCube_1(){
//  var center_1 = getRandomArbitrary(0, 1400),
//    line = s.line(center_1, 500, center_1, 800);
//  line.attr({
////  with a masking effect the darkening works the same way as in photoshop
////  darks == the level of transprency
//    stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
//    strokeWidth: 2
//  });
////  var i = getRandomArbitrary(600, 800);
//  line.animate({y1: 600}, 100, mina.bounce, function(){
//    var tilt = getRandomArbitrary(2, 70);
////      var color = '#'+Math.floor(Math.random()*16777215).toString(16)
//    this.animate({x1: start}, 400, mina.bounce);
//    this.animate({x2: start}, 400, mina.bounce);
////    var x1 = this.x1;
//    if (tilt < 35){
//      tilt = start-tilt;
//    } else {
//      tilt = start+tilt;
//    }
//    this.animate({x1: tilt}, 600, mina.bounce, function(){
//      if(start_1 > 1000 && start_1_op === 'front'){
//        start_1_op = 'back';
//      }
//      if(start_1 < 1 && start_1_op === 'back'){
//        start_1_op = 'front';
//      }
//      if (start_1_op === 'back'){
//        start_1 = start_1 - 15;
//      } else {
//        start_1 = start_1 + 25;
//      }
//      buildLineCube_1();
//    });
//  });
//}

//function buildLineCube_2(x1, x2){
//  var center_1 = getRandomArbitrary(0, 1400),
//    line = s.line(center_1, x1, center_1, x2);
//  line.attr({
////  with a masking effect the darkening works the same way as in photoshop
////  darks == the level of transprency
//    stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
//    strokeWidth: 15
//  });
////  var i = getRandomArbitrary(600, 800);
//  line.animate({y1: 555}, 100, mina.bounce, function(){
//    var tilt = getRandomArbitrary(2, 17),
//      tilt_2;
////      var color = '#'+Math.floor(Math.random()*16777215).toString(16)
//    this.animate({x1: start_2}, 400, mina.bounce);
//    this.animate({x2: start_2}, 400, mina.bounce, function(){
//      if(start_2 > 800 && start_2_op === 'front'){
//        start_2_op = 'back';
//      }
//      if(start_2 < 400 && start_2_op === 'back'){
//        start_2_op = 'front';
//      }
//      if (start_2_op === 'back'){
//        start_2 = start_2 - 45;
//      } else {
//        start_2 = start_2 + 50;
//      }
//      buildLineCube_2(x1, x2);
//    });
////    var x1 = this.x1;
//    if (tilt < 8){
//      tilt = start-tilt;
//      tilt_2 = start+tilt;
//    } else {
//      tilt = start+tilt;
//      tilt_2 = start-tilt;
//    }
//    this.animate({x1: tilt}, 600, mina.bounce, function(){
//      this.animate({x1: tilt_2}, 600, mina.bounce);
//      start_2 = start_2 + 5;
//      buildLineCube_2();
//    });
//  });
//}


function buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke){
  var center_1 = getRandomArbitrary(0, 1400),
    line = s.line(x1, center_1, x2, center_1);
  line.attr({
    stroke: '#'+Math.floor(Math.random()*16777215).toString(16),
    strokeWidth: stroke
  });
  line.animate({x1: x1-20}, 300, mina.bounce, function(){
    var tilt = getRandomArbitrary(2, 50),
      tilt_2 = getRandomArbitrary(1, 46);
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
      buildLineCube_v1(x1, x2, start, end, dir, pointer, stroke);
    });
  });
}

function buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke){
//  Where we are coming from.
  var center_1 = getRandomArbitrary(0, 1400),
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
    var tilt = getRandomArbitrary(2, 50),
        tilt_2 = getRandomArbitrary(1, 46);
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
      buildLineCube_h1(y1, y2, start, end, dir, pointer, stroke);
    });
  });
}



// This can be the glowing function
//  buildLineEtc();
//  horizontal y1 and y2 and sx and ex and pointer
window.setTimeout(function(){
  buildLineCube_h1(100, 250, 475, 925, 'front', 650, 3);
  buildLineCube_h1(450, 600, 475, 925, 'back', 650, 3);
//    horizontal x1 and x2 and sx and ex and pointer
  buildLineCube_v1(400, 550, 175, 525, 'back', 250, 3);
  buildLineCube_v1(850, 1000, 175, 525, 'front', 250, 3);
}, 1000);

window.setTimeout(function(){
  buildLineCube_h1(265, 255, 625, 760, 'front', 700, 2);
  buildLineCube_h1(445, 435, 625, 760, 'back', 700, 2);
//  horizontal x1 and x2 and sx and ex and pointer
  buildLineCube_v1(575, 585, 310, 445, 'back', 350, 2);
  buildLineCube_v1(815, 825, 310, 445, 'front', 350, 2);
}, 7000);

window.setTimeout(function(){
  buildLineCube_h1(315, 295, 635, 710, 'front', 675, 1);
  buildLineCube_h1(395, 375, 635, 710, 'back', 675, 1);
//  horizontal x1 and x2 and sx and ex and pointer
  buildLineCube_v1(625, 650, 340, 390, 'back', 360, 1);
  buildLineCube_v1(765, 790, 340, 390, 'front', 360, 1);
}, 3000);




/**
 * Circles
 * @type {*}
 */
//// Then use it as a fill on big circle
//var sc = s.circle(700, 300, 175);
//var sc_1 = s.circle(700, 300, 155);
//var sc_2 = s.circle(700, 300, 135);
//var sc_3 = s.circle(700, 300, 115);
//var sc_4 = s.circle(700, 300, 95);
//var sc_5 = s.circle(700, 300, 75);
//
//
//var small_rings = s.group(sc, sc_1, sc_2, sc_3, sc_4, sc_5);
//
//small_rings.attr({
////  with a masking effect the darkening works the same way as in photoshop
////  darks == the level of transprency
//  stroke: "brown",
//  strokeWidth: 5
//});
//
//// This can be the glowing function
////for (var i = 0; i < 4; i++){
////  small_rings[i].animate({stroke: 'black'}, 1500);
////  small_rings[i].animate({strokeWidth: 1}, 1500, function(){
////    for (var i = 0; i < 4; i++){
////      small_rings[i].animate({stroke: 'brown'}, 1500);
////      small_rings[i].animate({strokeWidth: 1}, 1500, function(){
////      });
////    }
////  });
////}
//
//
//
//// colors of the circles
//sc.attr({
////  stroke: "#000",
//  strokeWidth: 2,
//  fill: "red"
////  mask: small_rings
//});
//
//sc_1.attr({
//  fill: "yellow"
//});
//
//sc_2.attr({
//  fill: "green"
//});
//
//sc_3.attr({
//  fill: "lightblue"
//});
//
//sc_4.attr({
//  fill: "darkblue"
//});
//
//sc_5.attr({
//  fill: "black"
//});