function FacetDirective(){
	return {
		restrict: 'E',
		replace: true,
		scope:{

		},
		templateUrl: 'scripts/search/templates/facets.tpl.html',
		controller: FacetController
	}
}