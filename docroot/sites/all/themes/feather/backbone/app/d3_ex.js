/**
 * Created by Awardwell on 8/11/14.
 */

var svg = d3.select("body").append('svg').style({width: '100%', height: '600px'}),
    data = [1,3,5,6,8,34,23,643,234,64,45,45],
    data_2 = [
      {
            'class' : 'complex-class',
            'width': Math.random()*100,
            'height': Math.random()*100
      },
      {
        'class' : 'complex-class',
        'width': Math.random()*100,
        'height': Math.random()*100

      },
      {
        'class' : 'complex-class',
        'width': Math.random()*100,
        'height': Math.random()*100
      },

    ];



svg
  .selectAll('circle')
  .data(data_2)
  .enter()
  .append('circle')
  .attr('data-number', function(d){
    return d.class;})
  .attr('fill', 'yellow')
  .attr({
    r: function(d){return d.width+'px';},
    cx:  function(d){return d.height;},
    cy:  function(d){return d.width;}
  });