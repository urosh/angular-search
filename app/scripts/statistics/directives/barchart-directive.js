/**
 * Created by urosdamnjanovic on 9/26/14.
 */

function BarchartDirective(d3Service, searchService){
  "use strict";

  return {
    restrict: 'E',
    scope: {
      bartitle: '@'
    },
    replace: true,
    template: '<div class="barchart-div"><p class="title">{{ title }}</p></div>',
    controller: BarchartController,
    link: function(scope, element, attrs){
      d3Service.d3()
        .then(function(d3) {

          //return
          scope.$watch('data', function(data, oldData){
            if(data){
              var format = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

              var margin = {top: 10, right: 10, bottom: 50, left: 10},
                width = 530 - margin.left - margin.right,
                height = 320 - margin.top - margin.bottom;

              data.sort(function(a, b){
                return new Date(a.time) - new Date(b.time);
              });

              var x = d3.time.scale()
                .domain([new Date('2012 11 1'), d3.time.month.offset(new Date(), 1)])
                .range([0, width]);

              var months = d3.time.months(new Date('2012 11 1'), d3.time.month.offset(new Date(), 1));

              var histogramBins = [];
              var currentDate;
              for (var i = 0; i < months.length-1; i++) {
                histogramBins[i] = 0;
                for (var j = 0; j < data.length; j++) {
                  currentDate = new Date(data[j].time);

                  if( currentDate < months[i+1] && currentDate > months[i]){
                    histogramBins[i]++;
                  }

                }

              }

              var xAxis = d3.svg.axis()
                .scale(x)
                .tickFormat(d3.time.format("%Y-%m"))
                .tickSize(2,0)
                .tickValues(months)
                .orient("bottom");




              var maxBin = d3.max(histogramBins, function(d){
                return d;
              });

              var y = d3.scale.linear()
                .domain([0, maxBin])
                .range([height, 0]);


              var svg = d3.select(element[0]).append("svg")
                .attr("width", width + margin.left + margin.right )
                .attr("height", height + margin.top + margin.bottom)



              var bar = svg.selectAll(".bar")
                .data(histogramBins)
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d, i){
                  return "translate(" + (x(months[i]) + 5)  + "," + y(d) + ")";
                });

              bar.append("rect")
                .attr("x", 1)
                .attr("width", function(d, i){
                  return  x(months[i+1]) - x(months[i]) -2;
                })
                .attr("height", function(d) {
                  return height - y(d);
                });


              bar.append("text")
                .text(function(d) {
                  if(d < 35){ return '';}
                  else{
                    return d;
                  }
                })
                .attr("x", function(d, i) {
                  //return 4;
                  return ( x(months[i+1]) - x(months[i]) ) / 2;
                })
                .attr("y", function(d) {
                  return 12;
                  //return height - y(d.y) + 15;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");

              svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(5," + (height) + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-1em")
                .attr("dy", "-.2em")
                .attr("transform", "rotate(-90)" );
            }


          })
        });

    }
  };
}

BarchartDirective.$inject = ['d3Service', 'searchService'];