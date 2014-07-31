'use strict';

angular.module('my-services', []);

angular.module('my-services')
	.service('Tools', function($http){
		this.getTools = function(){
			return $http.get('data/tools.json');
		};

		this.addObjectFromCollection = function(source, target, property, value){
        // function gets source array, target array, property name, and value
        for(var i = 0, j = source.length; i < j; i++){
            if(source[i][property] === value){
                var add = true;
                for(var k = 0, l = target.length; k < l; k++){
                	if(target[k][property] === value){
                		add = false;
                	}
                }
                if(add){
               		target.push(source[i]); 	
                }
                

            }
        }
    }; 
    this.addItemToArray = function(myarray, item) {
        var itemIndex = myarray.indexOf(item);
        if(itemIndex === -1 ){
            myarray.push(item)
        }else{
            myarray.splice(itemIndex, 1);
        }
    }
    this.removeObjectFromCollection = function(target, property, value){
        // function gets source array, target array, property name, and value
        var removeIndex = -1;
        for(var i = 0, j = target.length; i < j; i++){
            if(target[i][property] === value){
              removeIndex = i;  
            }
        }
        target.splice(removeIndex, 1);
    };

     

		

});

angular.module('my-services')
    .service('serverServices', function($http){
        this.initializeSearch = function(){
            return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
        };

        this.runSearch = function(data){
            return $http.get('http://public.cyi.ac.cy/starcRepo/map/search', {params: data});
        }  
    })