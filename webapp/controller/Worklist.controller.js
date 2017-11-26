sap.ui.define([
		"com/ramesh/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"com/ramesh/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, JSONModel, History, formatter, Filter, FilterOperator) {
		"use strict";

		return BaseController.extend("com.ramesh.controller.Worklist", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () {
				var oViewModel,
					iOriginalBusyDelay,
					oTable = this.byId("table");

				// Put down worklist table's original value for busy indicator delay,
				// so it can be restored later on. Busy handling on the table is
				// taken care of by the table itself.
				iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
				// keeps the search state
				this._aTableSearchState = [];

				// Model used to manipulate control states
				oViewModel = new JSONModel({
					worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
					saveAsTileTitle: this.getResourceBundle().getText("saveAsTileTitle", this.getResourceBundle().getText("worklistViewTitle")),
					shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
					shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
					shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
					tableNoDataText : this.getResourceBundle().getText("tableNoDataText"),
					editable : false,
					tableBusyDelay : 0
				});
				this.setModel(oViewModel, "worklistView");

				// Make sure, busy indication is showing immediately so there is no
				// break after the busy indication for loading the view's meta data is
				// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
				oTable.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
					oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
				});
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Triggered by the table's 'updateFinished' event: after new table
			 * data is available, this handler method updates the table counter.
			 * This should only happen if the update was successful, which is
			 * why this handler is attached to 'updateFinished' and not to the
			 * table's list binding's 'dataReceived' method.
			 * @param {sap.ui.base.Event} oEvent the update finished event
			 * @public
			 */
			onUpdateFinished : function (oEvent) {
				// update the worklist's object counter after the table update
				var sTitle,
					oTable = oEvent.getSource(),
					iTotalItems = oEvent.getParameter("total");
				// only update the counter if the length is final and
				// the table is not empty
				if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
				} else {
					sTitle = this.getResourceBundle().getText("worklistTableTitle");
				}
				this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
			},
editEmployee : function(oEvent){
//	this.getView().getModel()
var editableState = 	this.getModel("worklistView").getProperty("/editable");
	this.getModel("worklistView").setProperty("/editable", !editableState);
},
refreshData :function(oEvent){
this.getModel().refresh();	
},
addEmployee : function(){
		var that = this;
		if (!this.addDialog) {
			this.addDialog = new sap.m.Dialog({
				title: "Draggable Available Products",
				contentWidth: "80%",
				draggable: true,
				beginButton: new sap.m.Button({
					text: 'Save',
					press: function () {
						var oForm = sap.ui.getCore().byId("createForm");
						var oFormModel = this.getModel();
						if(oFormModel){
							var oFormData = this.getModel().getProperty(oForm.getBindingContext().sPath);
							oFormModel.setUseBatch(false);
							oFormModel.create("/calcView",oFormData,null,null,function(oData){
								 sap.m.MessageToast.show("Success");
							},
							function(oData){
								sap.m.MessageToast.show("Fail");
							});
						}
							that.getModel().deleteCreatedEntry(oForm.getBindingContext());
								oFormModel.setUseBatch(true);
						this.addDialog.close();
						this.getModel().refresh();
					}.bind(this)
				}),
				endButton: new sap.m.Button({
					text: 'Close',
					press: function () {
					
					
							that.getModel().deleteCreatedEntry();
						
						
						this.addDialog.close();
					}.bind(this)
				})
			});

			//to get access to the global model
			this.getView().addDependent(this.addDialog);
		}
		this.addDialog.destroyContent();
		var form = that.createAddForm();
		this.addDialog.addContent(form);
		this.addDialog.open();
	
	
},
saveEmployee : function(oEvent){
	var oDataModel = this.byId("table").getModel();
	oDataModel.submitChanges({
		success : function(oData){
				sap.m.MessageToast.show("Saved Successfully");
			
		},
		error : function(oError){
			sap.m.MessageToast.show("Error");
		}
	});
	
	
},
	createAddForm : function(){
		var form = new sap.ui.layout.form.SimpleForm("createForm",{editable:true,layout:"ResponsiveGridLayout",
			labelSpanXL:4,labelSpanL:3,labelSpanM:2,labelSpanS:12,adjustLabelSpan:false,
			emptySpanXL:0,emptySpanL:2,emptySpanM:0,emptySpanS:0,
			columnsXL:2,columnsL:1,columnsM:2,singleContainerFullSize:false });
		var context = this.getModel().createEntry("calcView");
		var newContextPath = context.sPath;
		var oDataModel = this.getModel();
		oDataModel.setDefaultBindingMode("TwoWay");
		form.bindElement(newContextPath);
		form.addContent(new sap.ui.core.Title({text:""}));
	//	for (var i = 0;i < fields.length; i++){
			//label: new sap.m.Text({text: headerText,wrapping : true}),
			form.addContent(new sap.m.Label({text:"Employee ID"}));
			form.addContent( new sap.m.Input({value:"{EMPID}"}));
			
			form.addContent(new sap.m.Label({text:"Employee Name"}));
			form.addContent( new sap.m.Input({value:"{EMPNAME}"}));
			
			form.addContent(new sap.m.Label({text:"Date of Joining"}));
			form.addContent(new sap.m.DatePicker({ valueFormat:"dd/MM/YYYY" ,dateValue:"{EMPDATE}"}));
			
			form.addContent(new sap.m.Label({text:"SALARY"}));
			form.addContent( new sap.m.Input({value:"{SAL}",type:"Number"}));
			
			form.addContent(new sap.m.Label({text:"Department"}));
			form.addContent( new sap.m.Input({value:"{DEPTNAME}"}));
				
			form.addContent(new sap.m.Label({text:"Bonus"}));
			form.addContent( new sap.m.Input({value:"{BONUS}",type:"Number"}));
			return form;
	},
	deleteEmployee : function(oEvent){
		var selectedItems = this.byId("table").getSelectedItems();
			if(selectedItems){
				for(var i = 0; i < selectedItems.length; i++){
				this.getModel().remove(selectedItems[i].getBindingContext().sPath,{
					success : function(oData){
						sap.m.MessageToast.show("Record Deleted Successfully");
					},
					error : function(oData){
							sap.m.MessageToast.show("Error while Deleting ");
					}
				});
				}
			}else{
				sap.m.MessageToast.show("No Rows selected to Deleted");
			}
	},
			/**
			 * Event handler when a table item gets pressed
			 * @param {sap.ui.base.Event} oEvent the table selectionChange event
			 * @public
			 */
			onPress : function (oEvent) {
				// The source is the list item that got pressed
				this._showObject(oEvent.getSource());
			},



			/**
			 * Event handler when the share in JAM button has been clicked
			 * @public
			 */
			onShareInJamPress : function () {
				var oViewModel = this.getModel("worklistView"),
					oShareDialog = sap.ui.getCore().createComponent({
						name: "sap.collaboration.components.fiori.sharing.dialog",
						settings: {
							object:{
								id: location.href,
								share: oViewModel.getProperty("/shareOnJamTitle")
							}
						}
					});
				oShareDialog.open();
			},

			onSearch : function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					// Search field's 'refresh' button has been pressed.
					// This is visible if you select any master list item.
					// In this case no new search is triggered, we only
					// refresh the list binding.
					this.onRefresh();
				} else {
					var aTableSearchState = [];
					var sQuery = oEvent.getParameter("query");

					if (sQuery && sQuery.length > 0) {
						aTableSearchState = [new Filter("BONUS", FilterOperator.Contains, sQuery)];
					}
					this._applySearch(aTableSearchState);
				}

			},

			/**
			 * Event handler for refresh event. Keeps filter, sort
			 * and group settings and refreshes the list binding.
			 * @public
			 */
			onRefresh : function () {
				var oTable = this.byId("table");
				oTable.getBinding("items").refresh();
			},

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Shows the selected item on the object page
			 * On phones a additional history entry is created
			 * @param {sap.m.ObjectListItem} oItem selected Item
			 * @private
			 */
			_showObject : function (oItem) {
				this.getRouter().navTo("object", {
					objectId: oItem.getBindingContext().getProperty("EMPID")
				});
			},

			/**
			 * Internal helper method to apply both filter and search state together on the list binding
			 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
			 * @private
			 */
			_applySearch: function(aTableSearchState) {
				var oTable = this.byId("table"),
					oViewModel = this.getModel("worklistView");
				oTable.getBinding("items").filter(aTableSearchState, "Application");
				// changes the noDataText of the list in case there are no filter results
				if (aTableSearchState.length !== 0) {
					oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
				}
			}

		});
	}
);