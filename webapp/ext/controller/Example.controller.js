sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/Toolbar",
    "sap/m/ToolbarSpacer",
    "sap/m/List",
    "sap/m/ActionListItem",
    "sap/ui/comp/smartmultiinput/SmartMultiInput"
], function(
    Controller,
    Popover,
    Button,
    Text,
    Toolbar,
    ToolbarSpacer,
    List,
    ActionListItem,
    SmartMultiInput
){
    "use strict";

	return Controller.extend("z.ext.lib.adapt.ext.controller.Example", {
		onInit: function(){
            var oHiddenArea = this.byId("hiddenBox");

            var oSmf = new SmartMultiInput({
                editable: true,
                enabled: true,
                value: "{Status}"
            });

            // oHiddenArea.addItem(oSmf);
        },
        
        onTestPress: function(oEvent){
            var oHiddenArea = this.byId("hiddenBox");
            var oSMI = oHiddenArea.getItems()[0];

            var oMI = oSMI.getInnerControls()[0]
            oMI.fireValueHelpRequest();
        },


        onLaneHeaderPress: function(oEvent){
            var oSource = oEvent.getSource();
            
            var oPopover = this.getPopover();

            oPopover.openBy(oSource);
            oPopover.attachAfterClose(function(){
                oPopover.destroy();
            });

            console.log(oEvent);
        },


        onNodePress: function(oEvent){
            var oSource = oEvent.getParameters();
            var oPopover = this.getPopover();

            oPopover.openBy(oSource);
            oPopover.attachAfterClose(function(){
                oPopover.destroy();
            });

            console.log(oEvent);
        },
        
        formatChidrenId: function(aChildKeys){
            var oView = this.getView();
            var oModel = oView.getModel();

            return $.map(aChildKeys, function(sKey){
                return oModel.getProperty("/" + sKey + "/ChildId");
            });
        },

        getPopover: function(){
            var oPopoverText = new Popover({
                showHeader: false,
                placement: "Top",
                content: [
                    new Text({
                        text: "Some description for possible actions",
                        wrapping: true
                    })
                ],
                footer: new Toolbar({
                    content: [
                        new ToolbarSpacer(),
                        new Button({
                            press: function(){
                                oPopoverText.close();
                            },
                            type: "Accept",
                            text: "Accept"
                        }),
                        new Button({
                            press: function(){
                                oPopoverText.close();
                            },
                            type: "Reject",
                            text: "Reject"
                        })
                    ]
                })
            }).addStyleClass("sapUiContentPadding");
            
            var oPopoverList = new Popover({
                showHeader: false,
                placement: "Top",
                content: [
                    new List({
                        itemPress: function(){
                            oPopoverList.close();
                        },
                        items: [
                            new ActionListItem({
                                text: "Action1"
                            }),
                            new ActionListItem({
                                text: "Action2"
                            }),
                            new ActionListItem({
                                text: "Action3"
                            })
                        ]
                    })
                ]
            });

            return Math.floor(Math.random() * Math.floor(10)) % 2 === 0 ? oPopoverText : oPopoverList;
        }
    });

}, true);