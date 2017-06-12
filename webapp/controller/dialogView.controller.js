sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.ramesh.miizRotateText.controller.dialogView", {
		onInit: function() {
				var jsonModel = new JSONModel();

				var chartData = [{
					"Date": "Green",
					"Count": "60"
				}, {
					"Date": "Amber",
					"Count": "50"
				}, {
					"Date": "awesome",
					"Count": "90"
				}, {
					"Date": "poor",
					"Count": "40"
				}, {
					"Date": "Today",
					"Count": "40"
				}];
		//		jsonModel.setData("/json/testData.json");
				jsonModel.loadData("json/testData.json");
				var barChart = this.getView().byId("idBarMII");
				barChart.setModel(jsonModel);
				var lineChart = this.getView().byId("idLineMII");
				lineChart.setModel(jsonModel);
					var commentTable = this.getView().byId("idCommentTable");
			commentTable.setModel(jsonModel);
				/*	barChart.setUiConfig({
				"applicationSet": "fiori"
			});
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: "Status",
					value: "{Status}"
				}],
				measures: [{
					name: "Count",
					value: "{Count}"
				}],
				data: {
					path: "/"
						// Filter: "oFilters"
				}
			});
			barChart.setDataset(oDataset);

			var valueFeed = new sap.viz.ui5.controls.common.feeds.FeedItem({
					uid: "size",
					"type": "Measure",
					"values": ["Count"]
				}),
				categoryFeed = new sap.viz.ui5.controls.common.feeds.FeedItem({
					uid: "color",
					"type": "Dimension",
					"values": ["Status"]
				});
			barChart.addFeed(valueFeed);
			barChart.addFeed(categoryFeed);
			barChart.setVizProperties({
				dataLabel: {
                    visible: true
                },
				legend: {
					title: {
						visible: true
					}
				},
				title: {
					visible: false
				},
				valueAxis: {

					title: {
						visible: true,
						text: "" //Add custom title to Value Axis  
					}
				}
			});*/

			},
			onPressAddComment : function(oEvent){
					var commentTable = this.getView().byId("idCommentTable");
		var modelData = 	commentTable.getModel().getProperty("/Comments");
		modelData.push({
        "Date": (new Date()).toLocaleString(), 
        "Comment": "",
         "Editable" : true
    			});
    			commentTable.getModel().setProperty("/Comments",modelData);
    	/*			jsonModel.loadData("json/testData.json");
				var barChart = this.getView().byId("idBarMII");
				barChart.setModel(jsonModel);
				var lineChart = this.getView().byId("idLineMII");
				lineChart.setModel(jsonModel);
					var commentTable = this.getView().byId("idCommentTable");
			commentTable.setModel(jsonModel);*/
			commentTable.getModel().refresh();
	
				
				oEvent.getSource().setVisible(false);
				this.byId("idUpdateCommentBtn").setVisible(true);
				this.byId("idCancelCommentBtn").setVisible(true);
			},
				onPressUpdateComment : function(oEvent){
					var commentTable = this.getView().byId("idCommentTable");
					
		var modelData = 	commentTable.getModel().getProperty("/Comments");
						commentTable.getModel().setProperty("/Comments/" + (modelData.length - 1 ) + "/Editable" , false);
						this.byId("idAddCommentBtn").setVisible(true);
						oEvent.getSource().setVisible(false);
				this.byId("idCancelCommentBtn").setVisible(false);
			},
				onPressCancelComment : function(oEvent){
						var commentTable = this.getView().byId("idCommentTable");
					
		     var modelData = commentTable.getModel().getProperty("/Comments");
		     modelData.pop();
		     commentTable.getModel().setProperty("/Comments/",modelData);
		     			commentTable.getModel().refresh();
					this.byId("idAddCommentBtn").setVisible(true);
					oEvent.getSource().setVisible(false);
					this.byId("idUpdateCommentBtn").setVisible(false);
				
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.ramesh.miizRotateText.view.dialogView
			 */
			//	onInit: function() {
			//
			//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ramesh.miizRotateText.view.dialogView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ramesh.miizRotateText.view.dialogView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ramesh.miizRotateText.view.dialogView
		 */
		//	onExit: function() {
		//
		//	}

	});

});