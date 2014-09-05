'use strict';

function CommonsController($scope, CommonServices){
	$scope.active = false;
		$scope.loading = false;
		this.modal = 'scripts/common/templates/modal.tpl.html';
		var _this = this;
		$scope.object = {};
		$scope.$on('itemClicked', function(e, docID){
  		

  		var result = CommonServices.getItem(docID);
  		// this i can do from controller i need to retrieve object based on id. 
  		result.then(function(res){
  			$scope.loading = true;
				$scope.metadata = [];
				$scope.title = res.data.title;
				$scope.imageLocation = res.data.imageLocation;

				for (var i in res.data.metadataList ){
					for( var property in res.data.metadataList[i]){
						$scope.metadata.push([property, res.data.metadataList[i][property]]);
					}
				}
				$scope.active = true;
				
			});
  		// ok so i need to set classes 
  	})
};
CommonsController.$inject = ['$scope', 'CommonServices'];