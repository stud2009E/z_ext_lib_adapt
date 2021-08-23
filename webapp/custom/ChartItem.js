sap.ui.define([
    "sap/ui/core/Element"
], function(
    Element
){
    "use strict";

    return Element.extend("z.ext.lib.adapt.custom.ChartItem",{
        metadata: {
            properties:{
                label: {
                    type: "string",
                    defaultValue: null
                },
                data: {
                    type: "float",
                    defaultValue: null
                },
                backgroundColor: {
                    type: "string",
                    defaultValue: "#ffffff"
                },
                borderColor: {
                    type: "string",
                    defaultValue: "#000000"
                }
            }
        }
    });

}, true);