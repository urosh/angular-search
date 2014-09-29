/**
 * Created by urosdamnjanovic on 9/26/14.
 */

function BarchartDirective(d3Service, searchService){
  "use strict";

  return {
    restrict: 'E',
    scope: {},
    replace: true,
    template: '<div class="barchart-div"></div>',
    controller: BarchartController,
    link: function(scope, element, attrs){
      d3Service.d3().then(function(d3){
        var format = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
        var margin = {top: 10, right: 10, bottom: 50, left: 10},
          width = 530 - margin.left - margin.right,
          height = 320 - margin.top - margin.bottom;

        searchService.getStatTime().then(function(res){
          var data = res.data;
          data.sort(function(a, b){
            return new Date(a.time) - new Date(b.time);
          });


          var x = d3.time.scale()
            .domain([new Date('2012 11 1'), new Date()])
            .range([0, width]);

          var months = d3.time.months(new Date('2012 11 1'), new Date());

          var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.time.format("%Y-%m"))
            .tickSize(2,0)
            .tickValues(months)
            .orient("bottom");

          var histogram = d3.layout.histogram()
            .bins(22)
            .value(function(d) {return format(d.time) })
          (data);


          var maxBin = d3.max(histogram, function(d){
            return d.y;
          });

          var y = d3.scale.linear()
            .domain([0, maxBin])
            .range([height, 0]);

          console.log(element);

          var svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.top + margin.bottom)



          var bar = svg.selectAll(".bar")
            .data(histogram)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + (x(d.x) - 2) + "," + y(d.y) + ")"; });

          bar.append("rect")
            .attr("x", 1)
            .attr("width", function(d){
              var w =   x(histogram[1].x) - x(histogram[0].x) -1 ;
              return w;
            })
            .attr("height", function(d) {
              var h = height - y(d.y);
              return h;
            });

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(5," + (height) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", "-.2em")
            .attr("transform", "rotate(-90)" );

        });


      });
    }
  };
}

BarchartDirective.$inject = ['d3Service', 'searchService'];