sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/ramesh/miizRotateText/controls/CustomTile",
		"com/ramesh/miizRotateText/model/formatter"
], function(Controller, CustomTile,formatter) {
	"use strict";

	return Controller.extend("com.ramesh.miizRotateText.controller.HomeContent", {
		formatter : formatter,
		onNavigate: function(oEvent) {
			var tilePressed = oEvent.getSource();
			if (tilePressed.getHeader() === "Structured Communication") {
				this.getOwnerComponent().getComponentRouter().navTo("StructureComm");

			} else if (tilePressed.getHeader() === "Manual Data Entry") {
				this.getOwnerComponent().getComponentRouter().navTo("ManualDataEntry");
			}
		},

		addNewTestTile: function() {
			/*	actualValue: 	{type : "float", defaultValue : 0},
				actualValueText: 	{type : "String", defaultValue : ""},
				targetValue: 	{type : "String", defaultValue : ""},
				ytdValue: 	{type : "String", defaultValue : ""},
				height: 	{type : "float", defaultValue : 0},
				width: 	{type : "float", defaultValue : 0},
				unit: 	{type : "String", defaultValue : ""},
				url :	{type : "String", defaultValue : ""},
				type :	{type : "String", defaultValue : ""}*/
				var hbox = this.byId("testBox");
				var newTile = new CustomTile({actualValue:"50",actualValueText :"Hello",unit:"$",url:"google.com"});
				hbox.addItem(newTile);
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.ramesh.miizRotateText.view.HomeContent
			 */
			//	onInit: function() {
			//
			//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ramesh.miizRotateText.view.HomeContent
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ramesh.miizRotateText.view.HomeContent
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ramesh.miizRotateText.view.HomeContent
		 */
		//	onExit: function() {
		//
		//	}

	});

});