sap.ui.define([
	"sap/suite/ui/generic/template/lib/AppComponent",
	"z/ext/lib/adapt/external/Chart"
], function (
	AppComponent,
	ChartLib
) {
	"use strict";

	return AppComponent.extend("z.ext.lib.adapt.Component", {
		metadata: {
			"manifest": "json"
		}
	});
});