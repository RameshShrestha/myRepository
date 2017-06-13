sap.ui.define([
	"sap/ui/core/Control"
], function(Control) {
	"use strict";
	return Control.extend("com.ramesh.miizRotateText.controls.CustomTile", {
		metadata: {
			properties: {
				actualValue: {
					type: "String",
					defaultValue: "0"
				},
				
				actualValueText: {
					type: "String",
					defaultValue: "50"
				},
				targetValue: {
					type: "String",
					defaultValue: ""
				},
				ytdValue: {
					type: "String",
					defaultValue: ""
				},
				height: {
					type: "float",
					defaultValue: 0
				},
				width: {
					type: "float",
					defaultValue: 0
				},
				unit: {
					type: "String",
					defaultValue: ""
				},
				url: {
					type: "String",
					defaultValue: ""
				},
				type: {
					type: "String",
					defaultValue: ""
				}
			},
			aggregations: {
				_MainBox: {
					type: "sap.m.VBox",
					multiple: false,
					visibility: "public"
				},
				_label: {
					type: "sap.m.Label",
					multiple: false,
					visibility: "public"
				},
				_button: {
					type: "sap.m.Button",
					multiple: false,
					visibility: "public"
				},
				_input: {
					type: "sap.m.Input",
					multiple: false,
					visibility: "public"
				}
			},
			events: {
				change: {
					parameters: {
						value: {
							type: "int"
						}
					}
				}
			}
		},
		init: function() {

			this.setAggregation("_input", new sap.m.Input({
				value: this.getActualValue()
			}));
			/*	this.setAggregation("_label", new sap.m.Label({
						text: "{i18n>productRatingLabelInitial}"
					}).addStyleClass("sapUiTinyMargin"));
					this.setAggregation("_button", new sap.m.Button({
						text: "{i18n>productRatingButton}",
						press: this._onSubmit.bind(this)
					}));*/
		},
		createTypeRows: function(control) {
			var that = this;
			var tileBox = new sap.m.VBox({
				height: "110px"
			}).addStyleClass("tilesMannualEntry");

			var currVal = new sap.m.Input({
				value: "",
				width: "90px"
			}).addStyleClass("firstText");
			var currValUnit = new sap.m.Text({
				text: that.getUnit()
			}).addStyleClass("firstText");
			var currValUnitBox = new sap.m.HBox({
				width: "100%"
			});
			currValUnitBox.addItem(currVal);
			currValUnitBox.addItem(currValUnit);
			var currText = new sap.m.Text({
				text: control.getActualValueText()
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
				text: that.getTargetValue(),
				visible: false
			}).addStyleClass("greyColor"));
			lowerVBox1.addItem(new sap.m.Text({
				text: "Target Value",
				visible: false
			}).addStyleClass("greyColor"));

			var lowerVBox2 = new sap.m.VBox({
				alignContent: "Center",
				alignItems: "Center",
				width: "50%"
			});
			lowerVBox2.addItem(new sap.m.Text({
				text: that.getYtdValue(),
				visible: false
			}).addStyleClass("greyColor"));
			lowerVBox2.addItem(new sap.m.Text({
				text: "YTD Value",
				visible: false
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
			tileBox.data("url", that.getUrl());
			tileBox.data("type", that.getType());
			tileBox.data("currentText", that.getActualValueText());

			return tileBox;
		},
		renderer: function(oRM, oControl) {
			var actualValue = oControl.getActualValue();
			var actualValueText = oControl.getActualValueText();
			var targetValue = oControl.getTargetValue();
			var ytdValue = oControl.getYtdValue();
			var height = oControl.getHeight();
			var width = oControl.getWidth();
			var unit = oControl.getUnit();
			var url = oControl.getUrl();
			var type = oControl.getType();
			console.log(actualValue + " , " + actualValue + " , " + actualValueText + " , " + targetValue + " , " + ytdValue + " , " + height +
				" , " + width + " ," + url + " ," + type + "," + unit);
			//	this.setAggregation("_MainBox", this.createTypeRows(this));
		//	oRM.write("<div");
		//	oRM.writeControlData(oControl);
			//	oRM.addClass("myAppDemoWTProductRating");
		//	oRM.writeClasses();
		//	oRM.write(">");
		//	oRM.renderControl(oControl.getAggregation("_MainBox"));
			/*	oRM.renderControl(oControl.getAggregation("_label"));
				oRM.renderControl(oControl.getAggregation("_button"));*/
		//	oRM.write("</div>");

			//New codee

			oRM.write("<div");
			oRM.writeControlData(oControl);

			oRM.addClass("mcTile");
			oRM.writeClasses();

			oRM.addStyle("width", oControl.getWidth());
			oRM.addStyle("height", oControl.getHeight());
			oRM.writeStyles();

			oRM.write(">");

			oRM.write("<div>");
			oRM.renderControl(oControl.getAggregation("_fieldInput"));
			oRM.renderControl(oControl.getAggregation("_fieldIcon"));
			oRM.write("</div>");
			oRM.write("<div style='font-weight: bold; text-indent: 15px;'>" + oControl.getActualValue() + "</div>");
			oRM.write("<div>");
			oRM.write("<div style='width: 90px; float: right; line-height: 1px; font-size: smaller;'>");
			oRM.write("<p>" + oControl.getTargetValue() + "</p>");
			oRM.write("<p>Target Value</p>");
			oRM.write("</div>");
			oRM.write("<div style='width: 90px; float: right; line-height: 1px; font-size: smaller;'>");
			oRM.write("<p>" + oControl.getActualValue() + "</p>");
			oRM.write("<p>YTD Value</p>");
			oRM.write("</div>");
			oRM.write("</div>");

			oRM.write("</div>");

			//New code

		}
	});
});