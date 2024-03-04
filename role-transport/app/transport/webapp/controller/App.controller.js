sap.ui.define([
    "sap/ui/Device",
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
    "sap/m/ButtonType",
	"sap/m/library",
    "sap/m/PlacementType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    // @ts-ignore
    function (Device, Controller, JSONModel, Popover,ButtonType, Button, library, PlacementType) {
        "use strict";

        return Controller.extend("transport.controller.App", {
            onInit: function () {
                this._setToggleButtonTooltip(!Device.system.desktop);
            },

            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                // @ts-ignore
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },
    
            handleUserNamePress: function (event) {
                var oPopover = new Popover({
                    showHeader: false,
                    placement: PlacementType.Bottom,
                    content: [
                        new Button({
                            text: 'Feedback',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Help',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Logout',
                            type: ButtonType.Transparent
                        })
                    ]
                }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
    
                oPopover.openBy(event.getSource());
            },
    
            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                // @ts-ignore
                var bSideExpanded = oToolPage.getSideExpanded();
    
                this._setToggleButtonTooltip(bSideExpanded);
    
                // @ts-ignore
                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },
    
            _setToggleButtonTooltip: function (bLarge) {
                var oToggleButton = this.byId('sideNavigationToggleButton');
                if (bLarge) {
                    oToggleButton.setTooltip('Large Size Navigation');
                } else {
                    oToggleButton.setTooltip('Small Size Navigation');
                }
            }
        });
    });
