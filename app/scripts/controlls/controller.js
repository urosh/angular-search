function ControllerFunction(ControllsService, CommonServices, DataModel){
		this.selectedTools = DataModel.selectedTools;
		this.tools = [];
    var promise = ControllsService.getTools();
  	var that = this;
    

    promise.then(function(res){
      that.tools = res.data;
    });

		this.toolSelected = function(e){
			DataModel.selectTool(this.tools, e);
			
    };

    this.removeItem = function(e){
    	DataModel.removeTool(e);
      //CommonServices.removeObjectFromCollection(DataModel.model.selectedTools, 'name', e);
    };


	}