sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(
    Controller,
    JSONModel
){
    "use strict";

	return Controller.extend("z.ext.lib.adapt.ext.controller.VizFrame", {
		onInit: function(){        
            var oView = this.getView();
            var oModel = new JSONModel(this.getData());

            oView.setModel(oModel, "local");
            oView.bindElement({
                model: "local",
                path: "/"
            });

        },

        onChartPress: function(oEvent){
            console.log(oEvent);
        },
        
        /*
            n-line
                valueAxis max,min,avg
                categoryAxis date
            
            n-column
                valueAxis max,min,avg
                categoryAxis date

            combination 1 column - n lines
                valueAxis avg                      (column)
                valueAxis min,max,agg    (line)
                categoryAxis date

            stacked_column
                valueAxis max,min,avg
                categoryAxis date

            dual_stacked_column
                valueAxis  max,min
                valueAxis2 max,min
                categoryAxis date
            
            donut
                size max
                color date

        */
        getData: function(){
            return {
                type: "stacked_column",
                vizData: [{
                    month: "01",
                    max: 134,
                    min: 23,
                    agg: 34,
                    avg: 65
                },{
                    month: "02",
                    max: 75,
                    min: 45,
                    agg: 40,
                    avg: 50
                },{
                    month: "03",
                    max: 100,
                    min: 35,
                    agg: 34,
                    avg: 78
                },{
                    month: "04",
                    max: 99,
                    min: 55,
                    agg: 45,
                    avg: 66
                },{
                    month: "05",
                    max: 121,
                    min: 12,
                    agg: 52,
                    avg: 34
                },{
                    month: "06",
                    max: 89,
                    min: 23,
                    agg: 63,
                    avg: 48
                }],
                chartData: [{
                    label: "Red",
                    data: 12,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)"
                },{
                    label: "Blue",
                    data: 9,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)"
                },{
                    label: "Yellow",
                    data: 3,
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 206, 86, 1)"
                },{
                    label: "Green",
                    data: 5,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "gba(75, 192, 192, 1)"
                },{
                    label: "Purple",
                    data: 2,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(153, 102, 255, 1)"
                },{
                    label: "Orange",
                    data: 3,
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                    borderColor: "rgba(255, 159, 64, 1)"
                }]
            };
        }
    });

}, true);