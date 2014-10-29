
'use strict';

angular.module('app.collections')
  .service('collectionsService', CollectionsService);

function CollectionsService($http){
	
	this.saveCollection = function(_title, _text, _items){
		var title = _title;
		var text = '';
		if(_text) {
			text = _text;
		}
		var items = '';
		
		_.each(_items, function(_item){
			if(items){
				items = items + ', ' + _item.docID;
			}else{
				items =_item.docID;
			}
		});

		var collectionData = {
			'title': title,
			'text': text,
			'items': items

		};
		JSON.stringify(collectionData);
		
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		
		return $http.post('http://public.cyi.ac.cy/starcRepo/map/savecollection', collectionData);




	};

};

CollectionsService.$inject = ['$http'];

