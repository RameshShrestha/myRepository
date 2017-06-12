sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/ramesh/miizRotateText/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.ramesh.miizRotateText.Component", {

		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "com.ramesh.miizRotateText.view.App",
				type: sap.ui.core.mvc.ViewType.XML
			},
			"dependencies": {
				"libs": ["sap.ui.core", "sap.m", "sap.ui.layout"]
			},
			"config": {
				"i18nBundle": "com.ramesh.miizRotateText.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": ""
			},
			"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"viewPath": "com.ramesh.miizRotateText.view",
				"controlId": "app",
				"controlAggregation": "pages",
				/*"bypassed": {
					"target": [
						"notFound"
					]
				},*/
				"async": true
			},
			"routes": [
				{
					"pattern": ["","Home"],
					"name": "homeContent",
					"target": [
						"homeContent"
					]
				},
				{
					"pattern": "ManualDataEntry",
					"name": "ManualDataEntry",
					"target": [
						"ManualDataEntry"
					]
				},
				{
					"pattern": "StructureComm",
					"name": "StructureComm",
					"target": [
						"StructureComm"
					]
				}
			],
			"targets": {
				"homeContent": {
					"viewName": "HomeContent",
					"viewId": "homeContent",
					"viewLevel": 1
				},
				"ManualDataEntry": {
					"viewName": "MannualEntryView",
					"viewId": "MannualEntryView",
					"viewLevel": 1
				},
				"StructureComm": {
					"viewName": "firstView",
					"viewId": "StructureComm",
					"viewLevel": 1
				}
				
				/*,
				"objectNotFound": {
					"viewName": "ObjectNotFound",
					"viewId": "objectNotFound"
				},
				"notFound": {
					"viewName": "NotFound",
					"viewId": "notFound"
				}*/
			}
		}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();

			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		getComponentRouter : function(){
			return this.getRouter();
		}
		
	});
});