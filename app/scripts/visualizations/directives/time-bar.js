/**
 * Created by urosdamnjanovic on 10/14/14.
 */

angular.module('visualizationModule')
  .controller('timeBarController', ['$scope', 'searchService', 'visService', 'requestNotificationChannel', 'display', '$filter', 'DataModel',  function($scope, searchService, visService, requestNotificationChannel, display, $filter, DataModel){
    var data = [];
    $scope.dataSource = 'repo';
    $scope.filterActive = false;
    $scope.histogramData = [];
    $scope.histogramBins = [];

    $scope.getData = function(){
      searchService.getStatTime().then(function(res){
        $scope.data = res.data;
        data = res.data;  // this is our data from the repository. It holds information about all existing objects.

        $scope.$watch('datasrc', function(val){
          $scope.resetDisplay();
          if(val){
            $scope.dataSource = 'search';
            /* source = search results */
            $scope.data = visService.getResultsData(data);
          }else{
            $scope.dataSource = 'repo';
            $scope.data = data;
          }
        });

      });
    }

    requestNotificationChannel.onSearchResultsReady($scope, function(){

      $scope.resetDisplay();
      if($scope.dataSource === 'search'){

        $scope.data = visService.getResultsData(data);
      }
    });

    $scope.barClicked = function(i, selected){
      if($scope.dataSource === 'search'){
        if(selected){
          $scope.$apply(display.resetDisplay());
        } else{
          $scope.$apply(filterData(i));
        }

      }else{
        $scope.$apply(searchData(i));
      }
    };


    var filterData = function(i){

      $scope.filterActive = true;
      display.addDisplayData($filter('filter')(DataModel.searchResults, function(item){
        var result = false;
        _.each($scope.histogramData[i], function(obj){
          if(item.docID === obj) {
            result = true;
          }
        });
        return result;
      }), 'vis');
    };

    var searchData = function(i){
      requestNotificationChannel.searchStarted();
      searchService.listItems($scope.histogramData[i]);
    };

    $scope.resetDisplay = function(){

      if($scope.filterActive){
        $scope.filterActive = false;
        display.resetDisplay();
      }

    };



  }]);

angular.module('visualizationModule')
  .directive('timeBar',['d3Service', function (d3Service) {
    return {
      restrict: 'E',
      scope: {
        bartitle: '@',
        datasrc: '='
      },
      controller: 'timeBarController',
      template: '<div class="barchart-div"><p class="title">{{ bartitle }}</p></div>',
      link: function(scope, element, attrs){





        var margin = {top: 10, right: 10, bottom: 50, left: 10},
          width = 530 - margin.left - margin.right,
          height = 320 - margin.top - margin.bottom;


        d3Service.d3()
          .then(function(d3){
            scope.getData();



            var x = d3.time.scale()
              .domain([new Date('2012 11 1'), d3.time.month.offset(new Date(), 1)])
              .range([0, width]);

            var months = d3.time.months(new Date('2012 11 1'), d3.time.month.offset(new Date(), 1));

            var xAxis = d3.svg.axis()
              .tickFormat(d3.time.format("%Y-%m"))
              .tickSize(2,0)
              .tickValues(months)
              .orient("bottom")
              .scale(x);


            var y = d3.scale.linear()
              .range([height, 0]);

            var svg = d3.select(element[0]).append("svg")
              .attr("width", width + margin.left + margin.right )
              .attr("height", height + margin.top + margin.bottom)

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(5," + (height) + ")")
              .call(xAxis)
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-1em")
              .attr("dy", "-.2em")
              .attr("transform", "rotate(-90)" );




            scope.$watch('data', function(data, oldData){
              if(!data) return;



              var currentDate;

              for (var i = 0; i < months.length-1; i++) {
                scope.histogramBins[i] = 0;
                scope.histogramData[i] = [];
                for (var j = 0; j < data.length; j++) {
                  currentDate = new Date(data[j].time);
                  if( currentDate < months[i+1] && currentDate > months[i]){
                    scope.histogramBins[i]++;
                    scope.histogramData[i].push(data[j].docID);
                  }
                }
              }

              y.domain([0, d3.max(scope.histogramBins, function(d){ return d; }) ]);


              if(!oldData) {
                /* Initializae visualization */
                svg.selectAll(".bar")
                  .data(scope.histogramBins)
                  .enter()
                    .append("g")
                    .attr("class", "bar")
                    .attr("transform", function (d, i) { return "translate(" + (x(months[i]) + 5) + "," + y(d) + ")"; })
                    .append("rect")
                      .attr("x", 1)
                      .on("click", function(d, i){
                        var selected = d3.select(this).classed("active");
                        d3.selectAll('rect').classed("active", false);
                        if(!selected) {
                          d3.select(this).classed("active", true);
                        }else{
                          d3.select(this).classed("active", false);
                        }
                        scope.barClicked(i, selected);
                      })
                      .attr("width", function (d, i) { return  x(months[i + 1]) - x(months[i]) - 2; })
                      .attr("height", function (d) { return height - y(d); });


                svg.selectAll(".bar")
                  .append("text")
                  .text(function(d) {
                    if(height - y(d) < 10){ return '';}
                    else{
                      return d;
                    }
                  })
                  .attr("x", function(d, i) {  return ( x(months[i+1]) - x(months[i]) ) / 2; })
                  .attr("y", function(d) { return 10; })
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "9px")
                  .attr("fill", "white")
                  .attr("text-anchor", "middle");

              }else{
                /* Update visualization */
                d3.selectAll('rect').classed("active", false);

                svg.selectAll(".bar")
                  .data(scope.histogramBins)
                  .transition()
                  .duration(500)
                  .attr("transform", function (d, i) { return "translate(" + (x(months[i]) + 5) + "," + y(d) + ")"; })
                  .select("rect")
                    .attr("height", function (d) { return height - y(d); });


                svg.selectAll(".bar")
                  .data(scope.histogramBins)
                  .select("text")
                  .text(function(d) {
                    //console.log(d);
                    if(height - y(d) < 10){ return '';}
                    else{
                      return d;
                    }
                  });

              }

            });
          });

      }
    };
  }]);

