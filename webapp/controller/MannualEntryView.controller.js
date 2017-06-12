sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/ramesh/miizRotateText/model/formatter"
], function(Controller, JSONModel,formatter) {
	"use strict";

	return Controller.extend("com.ramesh.miizRotateText.controller.MannualEntryView", {
		/*addTile : function  (){
			var mybox = new sap.m.VBox();
			mybox.addItem(new sap.m.Text({text:"hello"}));
		} 
		 */
	formatter : formatter,
		onInit: function() {
			var levelData = [{
				"key": "Level1",
				"text": "Level 1"
			}, {
				"key": "Level2",
				"text": "Level 2"
			}, {
				"key": "Level3",
				"text": "Level 3"
			}, {
				"key": "Level4",
				"text": "Level 4"
			}];
			var oLevelModel = new sap.ui.model.json.JSONModel();
			oLevelModel.setData(levelData, "levelData");
		//	this.byId("levelSelect").setModel(oLevelModel);
			//	 week to date (WTD), month to date (MTD), quarter to date (QTD), year to date (YTD)

			var timeFrameData = [
					{
				"key": "blank",
				"text": ""
			},
				{
				"key": "shift1",
				"text": "Shift1"
			}, {
				"key": "Shift2",
				"text": "Shift2"
			}, {
				"key": "Shift3",
				"text": "Shift3"
			}, {
				"key": "prodDay",
				"text": "Production Day"
			}, {
				"key": "prevDay",
				"text": "Previous Day"
			}, {
				"key": "WTD",
				"text": "WTD"
			}, {
				"key": "MTD",
				"text": "MTD"
			}, {
				"key": "QTD",
				"text": "QTD"
			}, {
				"key": "YTD",
				"text": "YTD"
			}];
			var oTimeFrameModel = new sap.ui.model.json.JSONModel();
			oTimeFrameModel.setData(timeFrameData, "levelData");
			this.byId("timeFrame").setModel(oTimeFrameModel);
			var processAreaData = [{
				"paType": "Brewing",
				"subProcess": [{
					"subtype": "Wort Production/Brewhouse"
				}, {
					"subtype": "Wort Cooling"
				}, {
					"subtype": "Fermentation"
				}, {
					"subtype": "Maturation"
				}, {
					"subtype": "Sterile Beverage Delivery"
				}, {
					"subtype": "Hot Side"
				}, {
					"subtype": "Cold Side"
				}]
			}, {
				"paType": "Packaging",
				"subProcess": [{
						"subtype": "Wort Production/Brewhouse"
					}, {
						"subtype": "Wort Cooling"
					}, {
						"subtype": "Fermentation"
					}, {
						"subtype": "Maturation"
					},

					{
						"subtype": "Hot Side"
					}, {
						"subtype": "Cold Side"
					}
				]
			}, {
				"paType": "Utility",
				"subProcess": [{
						"subtype": "Wort Production/Brewhouse"
					}, {
						"subtype": "Wort Cooling"
					}, {
						"subtype": "Fermentation"
					}, {
						"subtype": "Maturation"
					},

					{
						"subtype": "Cold Side"
					}
				]
			}, {
				"paType": "Customer Service",
				"subProcess": [{
					"subtype": "Wort Production/Brewhouse"
				}, {
					"subtype": "Wort Cooling"
				}, {
					"subtype": "Fermentation"
				}, {
					"subtype": "Maturation"
				}, {
					"subtype": "Sterile Beverage Delivery"
				}, {
					"subtype": "Hot Side"
				}, {
					"subtype": "Cold Side"
				}]
			}];

			var oProcessAreaModel = new sap.ui.model.json.JSONModel();
			oProcessAreaModel.setData(processAreaData, "processAreaData");
			this.getView().setModel(oProcessAreaModel, "paModel");

			var that = this;
			that.byId("dateToday").setText((new Date()).toLocaleString());
		
		/*	var jsonModel = new JSONModel();
			jsonModel.loadData("json/testData.json", "", false);

			var totalTiles = jsonModel.getProperty("/testTiles").length;
			if (totalTiles > 0) {
				var data = jsonModel.getProperty("/testTiles/");

				for (var i = 0; i < totalTiles; i++) {

					var tile = this.createTypeRows(data[i]);
					var container = this.byId(data[i].Type + "Layout");
					if (container) {
						container.addContent(tile);
					}
				}
			}*/
			if (this.byId("openMenu")) {

				this.byId("openMenu").attachBrowserEvent("tab keyup", function(oEvent) {
					this._bKeyboard = oEvent.type === "keyup";
				}, this);
			}

		},
		navigateHome : function(){
				this.getOwnerComponent().getComponentRouter().navTo("Home");
		},
		getMetricTiles : function(){
			this.onCancel();
				var jsonModel = new JSONModel();
			jsonModel.loadData("json/testData.json", "", false);

			var totalTiles = jsonModel.getProperty("/testTiles").length;
			if (totalTiles > 0) {
				var data = jsonModel.getProperty("/testTiles/");

				for (var i = 0; i < totalTiles; i++) {

					var tile = this.createTypeRows(data[i]);
					var container = this.byId(data[i].Type + "Layout");
					if (container) {
						container.addContent(tile);
					}
				}
			}
		},
		createTypeRows: function(dataRow) {
			var that = this;
			var tileBox = new sap.m.VBox({
				height: "110px"
			}).addStyleClass("tilesMannualEntry");

			var currVal = new sap.m.Input({
				value: "",
				type:"Number",
				tooltip : "Please Enter number upto 2 precision",
				placeholder : "##.##",
				change : that.changeInputValue,
				width : "90px"
			}).addStyleClass("firstText");
			currVal.data({"type":dataRow.currentValUnit});
			var currValUnit = new sap.m.Text({text :dataRow.currentValUnit}).addStyleClass("firstText");
			var currValUnitBox  = new sap.m.HBox({	width: "100%"});
			currValUnitBox.addItem(currVal);
			currValUnitBox.addItem(currValUnit);
			var currText = new sap.m.Text({
				text: dataRow.currentText
			}).addStyleClass("secondText");
			var innerBox1 = new sap.m.VBox({
				width: "90%"
			});
			innerBox1.addItem(currValUnitBox);
			innerBox1.addItem(currText);

			var innerBox2 = new sap.m.VBox({
				width: "10%"
			});
			/*var imageTop = new sap.m.Image({
				src: "./images/redArrow.png",
				height: "16px",
				width: "16px",
				alt: "indication arrow"
			});
			if (dataRow.currentValue >= parseInt(dataRow.TargetValue, 10)) {
				imageTop.setSrc("./images/UpArrow.png");
			}
			var imageTwo = new sap.ui.core.Icon({
				src: "sap-icon://vertical-bar-chart",
				height: "16px",
				width: "16px",
				color: "#796d63",
				alt: "indication arrow"
			});
			innerBox2.addItem(imageTop);
			innerBox2.addItem(imageTwo);*/
			var firstRow = new sap.m.HBox().addStyleClass("sapUiTinyMarginTop");
			firstRow.addItem(innerBox1);
			firstRow.addItem(innerBox2);

			var lowerVBox1 = new sap.m.VBox({
				alignContent: "Center",
				alignItems: "Center",
				width: "50%"
			});
			lowerVBox1.addItem(new sap.m.Text({
				text: dataRow.TargetValue,
				visible : false
			}).addStyleClass("greyColor"));
			lowerVBox1.addItem(new sap.m.Text({
				text: "Target Value",
				visible : false
			}).addStyleClass("greyColor"));

			var lowerVBox2 = new sap.m.VBox({
				alignContent: "Center",
				alignItems: "Center",
				width: "50%"
			});
			lowerVBox2.addItem(new sap.m.Text({
				text: dataRow.ytdValue,
				visible : false
			}).addStyleClass("greyColor"));
			lowerVBox2.addItem(new sap.m.Text({
				text: "YTD Value",
				visible : false
			}).addStyleClass("greyColor"));

			var secondRow = new sap.m.HBox().addStyleClass("sapUiTinyMarginTop");
			secondRow.addItem(lowerVBox1);
			secondRow.addItem(lowerVBox2);

			tileBox.addItem(firstRow);
			tileBox.addItem(secondRow);
			tileBox.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({
				minWidth: 200,
				width: "200px"
			}));
			tileBox.data("url", dataRow.url);
			tileBox.data("type", dataRow.Type);
			tileBox.data("currentText", dataRow.currentText);
			/*	<layoutData>
			<l:ResponsiveFlowLayoutData minWidth="200px" width="200px"/>
			</layoutData>*/
			//	tileBox.attachBrowserEvent("click",this.fnTileClick);
		//	var that = this;
		/*	tileBox.addEventDelegate({
				onclick: function(oEvent) {
					console.log(that);
					console.log("clicked");
					var tileId = oEvent.currentTarget.id;
					if (tileId) {
						var url = sap.ui.getCore().getElementById(tileId).data("url");
						var type = sap.ui.getCore().getElementById(tileId).data("type");
						var currentText = sap.ui.getCore().getElementById(tileId).data("currentText");
						console.log("Click on Tile" + url + "  Type :  " + type);
						that.fnOpenDialog(currentText);
					}

				}
			});*/
			return tileBox;
		},
		changeInputValue : function(oEvent){
		var inputBox = oEvent.getSource();
			inputBox.setValue(parseFloat(inputBox.getValue()).toFixed( 2 ));
			inputBox.setValueState("Success");
		var inputBoxType = inputBox.data("type");
		if(inputBoxType === "%"){
			
			if(parseFloat(inputBox.getValue()) > 100){
			inputBox.setValueState("Error");
			inputBox.setValueStateText("Percent greater than 100");
			}
			else{
					inputBox.setValueState("Success");
			}
		}
		if(inputBox.getValue() === ""){
				inputBox.setValueState("None");
		}
		
		},
		fnTileClick: function(oEvent) {
			var tileId = oEvent.currentTarget.id;
			if (tileId) {
				var url = sap.ui.getCore().getElementById(tileId).data("url");
				var type = sap.ui.getCore().getElementById(tileId).data("type");
				console.log("Click on Tile" + url + "  Type :  " + type);
			}
			//	sap.ui.getCore().getElementById("mainApp").getParent().getController().fnOpenDialog();
		},
		onSave : function(){
			sap.m.MessageBox.error(	"Error while Processing");
		},
		onCancel : function(){
	this.getView().byId("SafetyLayout").destroyContent();	
	this.getView().byId("PeopleLayout").destroyContent();	
	this.getView().byId("QualityLayout").destroyContent();	
	this.getView().byId("ServiceLayout").destroyContent();	
	this.getView().byId("CostLayout").destroyContent();	
	this.getView().byId("OtherLayout").destroyContent();	
	//		$(".tilesMannualEntry").remove();
	
		},
		ClickListItem: function(oEvent) {
			window.open("https://www.w3schools.com");
		},
		fnOpenDialog: function(titleText) {
			/*	var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.ramesh.miizRotateText.fragments.dialog");
 		this.getView().addDependent(oDialog);
 			oDialog.open();
			}*/

			var that = this;
			if (!that.pressDialog) {
				that.pressDialog = new sap.m.Dialog({
					contentHeight: "550px",
					contentWidth: "80%",
					content: sap.ui.xmlview("com.ramesh.miizRotateText.view.dialogView"),
					beginButton: new sap.m.Button({
						text: 'Close',
						press: function() {
							that.pressDialog.close();
						}
					})
				});

				//to get access to the global model
				this.getView().addDependent(that.pressDialog);
			}

			that.pressDialog.setTitle(titleText);
			that.pressDialog.open();

		},
		handlePressOpenMenu: function(oEvent) {
			var oButton = oEvent.getSource();

			// create menu only once
			if (!this._menu) {
				this._menu = sap.ui.xmlfragment(
					"com.ramesh.miizRotateText.fragments.menufragment",
					this
				);
				this.getView().addDependent(this._menu);
			}
			var paModel = this.getView().getModel("paModel");
			this._menu.setModel(paModel);

			/*	var itemTemplate = new sap.ui.unified.MenuItem({text : "{paType}",  select: "handleMenuItemPress" });
	 		this._menu.setAggregation(itemTemplate);
			this._menu.bindAggregation("Item",{path : "/processAreaData", "template" : itemTemplate});*/
			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		},
		addMetricEntry: function(oEvent) {
			/*	var msg = "'" + oEvent.getSource().getTitle() + "' pressed";
			sap.m.MessageToast.show(msg);*/

			var that = this;
			if (!that.addEntryDialog) {
				that.addEntryDialog = new sap.m.Dialog({
					contentHeight: "500px",
					contentWidth: "700px",
					content: sap.ui.xmlfragment("com.ramesh.miizRotateText.fragments.MannualEntryScreen", that),
					afterClose: function() {
						that.addEntryDialog.destroy();
						that.addEntryDialog = null;
					},
					endButton: new sap.m.Button({
						text: "Close",
						press: function() {
							that.addEntryDialog.close();
						}
					}),
					beginButton: new sap.m.Button({
						text: "Save",
						press: function() {
							sap.m.MessageToast.show("Data Saved Successfully");
							that.addEntryDialog.close();

						}
					})
				});

				//to get access to the global model
				this.getView().addDependent(that.addEntryDialog);
				var levelDataModel = this.byId("timeFrame").getModel();
				sap.ui.getCore().getElementById("idTimeFrameEntry").setModel(levelDataModel);
			}

			that.addEntryDialog.setTitle("Manual Entry Screen");
			that.addEntryDialog.open();

		},
		handleMenuItemPress: function(oEvent) {
			var msg = "'" + oEvent.getParameter("item").getText() + "' pressed";
			sap.m.MessageToast.show(msg);
		var selectedProcess = 	oEvent.getSource().getParent().getParent().getText();
		var selectedSubProcess = oEvent.getParameter("item").getText();
			this.getView().byId("openMenu").setText(selectedProcess + "-->" + selectedSubProcess);
			
		},

		handleTextFieldItemPress: function(oEvent) {
			var msg = "'" + oEvent.getParameter("item").getValue() + "' entered";
			sap.m.MessageToast.show(msg);
		}
	});
});