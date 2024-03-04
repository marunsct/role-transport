sap.ui.define([
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../Component",
    "sap/ui/model/Model",
    "sap/ui/model/resource/ResourceModel",
    "sap/base/i18n/ResourceBundle",
    "sap/ui/core/routing/Router",
    "sap/ui/core/routing/History",
    "sap/ui/core/Control",
    "sap/ui/core/Fragment",
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
    function (Device, Controller, UIComponent, AppComponent, Model,
        // @ts-ignore
        ResourceModel, ResourceBundle, Router, History, Control, Fragment,
        // @ts-ignore
        JSONModel, Popover, ButtonType, Button, library, PlacementType) {
        "use strict";

        return Controller.extend("transport.controller.App", {



            onInit: function () {
                // @ts-ignore
                this._fragments = {};
                //  this._setToggleButtonTooltip(!Device.system.desktop);
            },

            /**
             * Convenience method for accessing the component of the controller's view.
             * @returns The component of the controller's view
             */
            getOwnerComponent: function () {
                return (this.getOwnerComponent());
            },

            /**
             * Convenience method to get the components' router instance.
             * @returns The router instance
             */
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            /**
             * Convenience method for getting the i18n resource bundle of the component.
             * @returns The i18n resource bundle of the component
             */
            getResourceBundle: function () {
                const oModel = this.getOwnerComponent().getModel("i18n");
                // @ts-ignore
                return oModel.getResourceBundle();
            },

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @param [sName] The model name
             * @returns The model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @param oModel The model instance
             * @param [sName] The model name
             * @returns The current base controller instance
             */
            setModel: function (oModel, sName) {
                this.getView().setModel(oModel, sName);
                return this;
            },

            /**
             * Convenience method for triggering the navigation to a specific target.
             * @public
             * @param sName Target name
             * @param [oParameters] Navigation parameters
             * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
            navTo: function (sName, oParameters, bReplace) {
                // @ts-ignore
                this.getRouter().navTo(sName, oParameters, undefined, bReplace);
            },

            /**
             * Convenience event handler for navigating back.
             * It there is a history entry we go one step back in the browser history
             * If not, it will replace the current entry of the browser history with the master route.
             */
            onNavBack: function () {
                const sPreviousHash = History.getInstance().getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    // @ts-ignore
                    this.getRouter().navTo("main", {}, undefined, true);
                }
            },


            loadFragment: async function (fragmentName) {
                let fragment = this._fragments[fragmentName];
                if (!fragment) {
                    fragment = await Fragment.load({
                        id: this.getView().getId(),
                        name: "miyasuta.transportui.fragment." + fragmentName,
                        controller: this
                    });
                    this.getView().addDependent(fragment);
                    this._fragments[fragmentName] = fragment;
                }
                return fragment;
            }
        });
    });
