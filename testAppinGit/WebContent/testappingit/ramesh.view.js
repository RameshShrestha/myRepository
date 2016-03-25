sap.ui.jsview("testappingit.ramesh", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf testappingit.ramesh
	*/ 
	getControllerName : function() {
		return "testappingit.ramesh";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf testappingit.ramesh
	*/ 
	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Title",
			content: [
			new sap.m.Button({text:"Ramesh"})
			]
		});
	}

});