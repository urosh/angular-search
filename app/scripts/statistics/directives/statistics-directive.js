function StatisticsDirective(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		controller: StatisticsController,
		templateUrl: 'scripts/statistics/templates/statistics.tpl.html',

	}
}