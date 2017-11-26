jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"com/ramesh/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"com/ramesh/test/integration/pages/Worklist",
		"com/ramesh/test/integration/pages/Object",
		"com/ramesh/test/integration/pages/NotFound",
		"com/ramesh/test/integration/pages/Browser",
		"com/ramesh/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.ramesh.view."
	});

	sap.ui.require([
		"com/ramesh/test/integration/WorklistJourney",
		"com/ramesh/test/integration/ObjectJourney",
		"com/ramesh/test/integration/NavigationJourney",
		"com/ramesh/test/integration/NotFoundJourney",
		"com/ramesh/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});