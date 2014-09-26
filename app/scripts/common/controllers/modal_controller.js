'use strict';

function ModalController($scope, CommonServices, requestNotificationChannel){
	$scope.active = false;
	$scope.loading = false;
	
	
	
	var showDetails = function(docID){
		$scope.modal = 'scripts/common/templates/modal.tpl.html';

		var result = CommonServices.getItem(docID);
		result.then(function(res){
			$scope.metadata = [];
			$scope.title = res.data.title;
			$scope.imageLocation = res.data.imageLocation;

			for (var i in res.data.metadataList ){
				for( var property in res.data.metadataList[i]){
					$scope.metadata.push([property, res.data.metadataList[i][property]]);
				}
			}
			$scope.loading = true;
			$scope.active = true;
			
		});
	};
	requestNotificationChannel.onItemSelected($scope, showDetails);
};



var emptyCollection = function(){
	$scope.modal = 'scripts/common/templates/collections-dialog.tpl.html';
	$scope.loading = true;
	$scope.active = true;
	
}


ModalController.$inject = ['$scope', 'CommonServices', 'requestNotificationChannel'];
