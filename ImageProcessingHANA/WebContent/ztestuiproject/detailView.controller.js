sap.ui.controller("ztestuiproject.detailView", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ztestuiproject.viewOne
*/
	onInit: function() {
        /*  jQuery.ajax({
               url: "/ImageProcessingHANA/services/GetImageJSON.xsjs",
               method: 'GET',
               dataType: 'json',
               success: this.onSuccessDataLoad,
               error: this.onErrorCall });
               
               
               	  var oModel, oView;
          oModel = new sap.ui.model.odata.ODataModel("/ImageProcessingHANA/services/GetImageOdata.xsodata", false);
          oView = this.getView();
          oView.setModel(oModel);*/
	},
	onSuccessDataLoad : function(response){
	    console.log(response);
	/*  var oModelJSON = new sap.ui.model.json.JSONModel();
	  
	    this.byId("table").*/
	},
	photoFormat : function(sValue){
				if(!sValue){
						return "";
				}
		//	sValue = sValue.substr(104);
			return "data:image/jpg;base64," + sValue;
			}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ztestuiproject.viewOne
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ztestuiproject.viewOne
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ztestuiproject.viewOne
*/
//	onExit: function() {
//
//	}

});