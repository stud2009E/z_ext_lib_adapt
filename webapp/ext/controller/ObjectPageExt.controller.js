jQuery.sap.require("sap/ui/generic/app/util/MessageUtil");
var MessageUtil = sap.ui.require("sap/ui/generic/app/util/MessageUtil");

sap.ui.controller("z.ext.lib.adapt.ext.controller.ObjectPageExt", {
	onInit: function () {
		var oEventBus = sap.ui.getCore().getEventBus();
		
		oEventBus.subscribe("sb.fiori.lib.spl.reuse.upload", "uploadComplete", this.onUploadCollectionEvent, this);
		oEventBus.subscribe("sb.fiori.lib.spl.reuse.upload", "fileDeleted", this.onUploadCollectionEvent, this);
		oEventBus.subscribe("sb.fiori.lib.spl.reuse.upload", "typeMissmatch", this.onUploadCollectionEvent, this);
		oEventBus.subscribe("sb.fiori.lib.spl.reuse.upload", "fileSizeExceed", this.onUploadCollectionEvent, this);
		this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded, this);

		this.orderId = "1234567";
	},

	/**
	 * handle event for upload collection
	 * @param {string} sChannel channel name
	 * @param {string} sEventId event id
	 * @param {sap.ui.base.oEvent} oEvent event object
	 */
	onUploadCollectionEvent: function(sChannel, sEventId, oEvent){
		console.log(sChannel, sEventId, oEvent);
	},

	onPageDataLoaded: function(oCtxWrapping){
		this.ctx = oCtxWrapping.context;
	},


	provideCustomStateExtension: function(oState){
		oState.positionAdding = {
			data: this.orderId,
			lifecycle: {
				session: true
			}
		}
	},

	applyCustomStateExtension: function(oState, bIsSameAsLast){
		if(bIsSameAsLast){
			return;
		}

		this.isAdoptingState = true;
		this.setPositionAdding(oState.positionAdding);
		this.isAdoptingState = false;
	},

	onPositionAddingChange: function(sOrderId){
		if(!this.isAdoptingState){
			this.orderId = sOrderId;
			this.extensionAPI.onCustomAppStateChange();
		}
	},

	setPositionAdding: function(sOrderId){
		this.orderId = sOrderId;
		
		console.log("set new order",  sOrderId);
	}

});