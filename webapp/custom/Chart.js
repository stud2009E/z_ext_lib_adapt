sap.ui.define([
    "sap/ui/core/Control"
], function(
    Control
){

    "use strict";

    var ChartWrapper = Control.extend("z.ext.lib.adapt.custom.Chart",{
        metadata:{
            properties: {
                width : {
                    type : "sap.ui.core.CSSSize",
                    defaultValue : "auto"
                },
                height: {
                    type : "sap.ui.core.CSSSize",
                    defaultValue : "auto"
                },
                type: {
                    type: "string",
                    defaultValue: "bar"
                },
                title: {
                    type: "string",
                    defaultValue: null
                },
                options: {
                    type: "any",
                    defaultValue: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                }
            },
            events:{
                press: {
                    parameters:{
                        payload: {type: "object"}
                    }
                }
            },
            aggregations:{
                items: {
                    type: "z.ext.lib.adapt.custom.ChartItem",
                    multiple : true,
                    singularName: "items"
                }
            }
        },

        init: function(){
            this._canvas = document.createElement("canvas");
        },

        onBeforeRendering: function(){
            var sType = this.getType();
            var ctx = this._canvas.getContext("2d");
            
            if(!this._chart){
                this._chart= new Chart(ctx, {
                    type: sType
                });
            }
        },

        renderer: function(oRm, oControl){
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("zSapUiChart");
            oRm.writeClasses();

            if(oControl.getHeight()){
                oRm.addStyle("height", oControl.getHeight());
            }
            if(oControl.getWidth()){
                oRm.addStyle("width", oControl.getWidth());
            }
            oRm.writeStyles();
            
            oRm.write(">");

            oRm.write("<div");
            oRm.writeAttribute("id", oControl.getId() + "-innerChart");
            oRm.addClass("zSapUiChartInner");
            oRm.writeClasses();
            oRm.write(">")
            oRm.write("</div>");

            oRm.write("</div>");
        },

        onAfterRendering: function(){
            var sTitle = this.getTitle();
            var aItems = this.getItems();
            var oOptions = this.getOptions();
            
            var aLabels = [];
            var aData = [];
            var aBackColors = [];
            var aBorderColor = [];
            
            $.each(aItems, function(i, oItem){
                aLabels.push(oItem.getLabel());
                aData.push(oItem.getData());
                aBackColors.push(oItem.getBackgroundColor());
                aBorderColor.push(oItem.getBackgroundColor());
            });

            this.$("innerChart").append(this._canvas);

            this._chart.options = oOptions;
            this._chart.options.events = ["click"];
            this._chart.options.onClick = function(){
                this.fireEvent("press", {
                    payload: arguments[1]
                });
            }.bind(this);
            
            this._chart.data.labels = aLabels;
            this._chart.data.datasets = [{
                label: sTitle,
                data: aData,
                backgroundColor: aBackColors,
                borderColor: aBorderColor,
                borderWidth: 1
            }];
            
            this._chart.update({
                duration: 0
            });
        },

        destroy: function(bSuppressInvalidate){
            this._chart.destroy();
            this._canvas.remove();

            this._chart = null;
            this._canvas = null;

            Control.prototype.destroy.call(this, bSuppressInvalidate);
        }
    });


    return ChartWrapper;

});