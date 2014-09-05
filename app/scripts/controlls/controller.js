var ControllerFunction = function(ControllsService,  DataModel){
		this.selectedTools = DataModel.selectedTools;
    this.DataModel = DataModel;
    this.ControllsService = ControllsService;

		this.tools = [];
    var promise = this.ControllsService.getTools();
  	var _this = this;
    

    promise.then(function(res){
      _this.tools = res.data;
    });

		this.toolSelected = function(e){
			_this.toolSelectedHandler(e, _this);

      
    };

    this.removeItem = function(e){
    	
      _this.removeToolHandler(e, _this);
      //CommonServices.removeObjectFromCollection(DataModel.model.selectedTools, 'name', e);
    };


}
ControllerFunction.prototype.toolSelectedHandler = function(e, _this){
  _this.DataModel.selectTool(_this.tools, e);
      
};
ControllerFunction.prototype.removeToolHandler = function(e, _this){
  _this.DataModel.removeTool(e);
};

ControllerFunction.$inject = ['ControllsService',  'DataModel']