sap.ui.define([
		"com/ramesh/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.ramesh.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);