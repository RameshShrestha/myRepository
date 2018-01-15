sap.ui.controller("ztestuiproject.viewOne", {
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf ztestuiproject.viewOne
	 */
	onInit: function() {
		jQuery.ajax({
			url: "/ImageProcessingHANA/services/GetImageJSON.xsjs",
			method: 'GET',
			dataType: 'json',
			success: this.onSuccessDataLoad,
			error: this.onErrorCall
		});
		var oModel, oView;
		oModel = new sap.ui.model.odata.ODataModel("/ImageProcessingHANA/services/GetImageOdata.xsodata", false);
		oView = this.getView();
		oView.setModel(oModel);
	},
	onChangeFile: function(e) {
		var that = this;
		var file = e.getParameter("files") && e.getParameter("files")[0];
		var srcUpload = e.getSource();
		if (srcUpload.getId() === "fileUploaderCreate") {
			srcUpload.getModel("createModel").setProperty("/0/IMAGE_NAME", file.name);
		} else {
			srcUpload.getModel("jsonModel").setProperty("/0/IMAGE_NAME", file.name);
		}
		if (file && window.FileReader) {
			var reader = new FileReader();
			reader.onload = function(evn) {
				var convertedData = that.arrayBufferToBase64(evn.target.result);
				if (srcUpload.getId() === "fileUploaderCreate") {
					var imageCreateLoc = sap.ui.getCore().getElementById("imageViewCreate");
					imageCreateLoc.getModel("createModel").setProperty("/0/IMAGE_CONTENT", convertedData);
				} else {
					var imageLoc = sap.ui.getCore().getElementById("imageView");
					imageLoc.getModel("jsonModel").setProperty("/0/IMAGE_CONTENT", convertedData);
				}
			};
			reader.readAsArrayBuffer(file);

		}
	},
	arrayBufferToBase64: function(buffer) {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		// console.log(window.btoa( binary ));
		return window.btoa(binary);
	},
	editPress: function(oEvent) {
		var that = this;
		if (!this._oDialog) {
			this._oDialog = sap.ui.xmlfragment("com.root.ztestuiproject.editView", that);
			this.getView().addDependent(this._oDialog);
		}
		var path = oEvent.getSource().getParent().getBindingContext().sPath;
		var contextValue = oEvent.getSource().getParent().getModel().getProperty(path);
		var newData = {};
		newData.COUNTER = contextValue.COUNTER;
		newData.IMAGE_CONTENT = contextValue.IMAGE_CONTENT;
		newData.IMAGE_NAME = contextValue.IMAGE_NAME;
		newData.NAME = contextValue.NAME;

		var oModelJSON = new sap.ui.model.json.JSONModel();
		//	oModelJSON.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		oModelJSON.setData([newData]);
		this._oDialog.setModel(oModelJSON, "jsonModel");
		oModelJSON.refresh();
		this._oDialog.rerender();
		this._oDialog.open();
	},
	onCloseDialog: function() {
		this._oDialog.close();
	},
	onSave: function(oEvent) {
		var data = oEvent.getSource().getParent().getModel("jsonModel").getData();
		var saveBtn = oEvent.getSource();
		$.ajax({
			url: '/ImageProcessingHANA/services/UpdateImageJSON.xsjs',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			dataType: 'json',
			success: function( /*response*/ ) {
				sap.m.MessageToast.show("Upload  Success");
				saveBtn.getParent().getParent().getParent().getModel().refresh();
			},
			error: function( /*jqXHR, textStatus, errorThrown*/ ) {
				sap.m.MessageToast.show("Service call error");
			}
		});
		this._oDialog.close();
	},
	deletePress: function(oEvent) {
		var path = oEvent.getSource().getParent().getBindingContext().sPath;
		var contextValue = oEvent.getSource().getParent().getModel().getProperty(path);
		var oDataToDelete = {};
		oDataToDelete.COUNTER = contextValue.COUNTER;
		oDataToDelete.IMAGE_NAME = contextValue.IMAGE_NAME;
		oDataToDelete.NAME = contextValue.NAME;
		this.onApproveDialog(oDataToDelete, oEvent.getSource());
	},
	onApproveDialog: function(oDataToDelete, deleteBtn) {
		var dialog = new sap.m.Dialog({
			title: 'Delete',
			type: 'Message',
			state: 'Warning',
			content: new sap.m.Text({
				text: 'Are you sure you want to Delete Permanently !!!'
			}),
			beginButton: new sap.m.Button({
				text: 'Delete',
				press: function() {
					$.ajax({
						url: '/ImageProcessingHANA/services/DeleteImageJSON.xsjs',
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(oDataToDelete),
						dataType: 'json',
						success: function( /*response*/ ) {
							sap.m.MessageToast.show("Deleted Successfully");
							deleteBtn.getParent().getParent().getParent().getModel().refresh();
						},
						error: function( /*jqXHR, textStatus, errorThrown*/ ) {
							sap.m.MessageToast.show("Service call error");
						}
					});
					dialog.close();
				}
			}),
			endButton: new sap.m.Button({
				text: 'Cancel',
				press: function() {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();
	},
	addPress: function(oEvent) {
		sap.m.MessageToast.show("Add  Pressed" + oEvent.getSource().getId());

		var that = this;
		if (!this._oDialogCreate) {
			this._oDialogCreate = sap.ui.xmlfragment("com.root.ztestuiproject.createView", that);
			this.getView().addDependent(this._oDialogCreate);
		}
		var newData = {};
		newData.IMAGE_CONTENT = "";
		newData.IMAGE_NAME = "";
		newData.NAME = "";
		var oModelJSON = new sap.ui.model.json.JSONModel();
		oModelJSON.setData([newData]);
		this._oDialogCreate.setModel(oModelJSON, "createModel");
		oModelJSON.refresh();
		this._oDialogCreate.rerender();
		this._oDialogCreate.open();
	},
	photoFormat: function(sValue) {
		if (!sValue) {
			return "";
		}
		return "data:image/jpg;base64," + sValue;
	},
	onCloseDialogCreate: function() {
		this._oDialogCreate.close();
	},
	onCreatePress: function(oEvent) {
		var data = oEvent.getSource().getParent().getModel("createModel").getData();
		// console.log(data);
		var createBtn = oEvent.getSource();
		$.ajax({
			url: '/ImageProcessingHANA/services/CreateImageJSON.xsjs',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			dataType: 'json',
			success: function( /*response*/ ) {
				sap.m.MessageToast.show("Create  Success");
				//  sap.ui.getCore().getElementById("table").getModel().refresh();
				createBtn.getParent().getParent().getParent().getModel().refresh();
			},
			error: function( /*jqXHR, textStatus, errorThrown*/ ) {
				sap.m.MessageToast.show("Service call error");
			}
		});
		this._oDialogCreate.close();
	},
	exportToExcel: function() {
		var model = this.getView().getModel();
		var data = model.oData;
		var arr = []
		for (var event in data) {
			var dataCopy = data[event];
			arr.push(dataCopy);
		}

		var ShowLabel = true;
		//	var JSONData = this.getView().getModel("jsonViewDataModel").getData().results;
		var ReportTitle = "Testing Excel";
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		var arrData = typeof arr !== 'object' ? JSON.parse(arr) : arr;

		var CSV = '';
		//Set Report title in first row or line

		CSV += ReportTitle + '\r\n\n';

		//This condition will generate the Label/Header
		if (ShowLabel) {
			var row = "";

			//This loop will extract the label from 1st index of on array
			for (var index in arrData[0]) {

				//Now convert each value to string and comma-seprated
				if (index !== "__metadata") {
					row += index + ',';
				}
			}

			row = row.slice(0, -1);

			//append Label row with line break
			CSV += row + '\r\n';
		}

		//1st loop is to extract each row
		for (var i = 0; i < arrData.length; i++) {
			var row = "";

			//2nd loop will extract each column and convert it in string comma-seprated

			for (var index in arrData[i]) {
				//  row += '"' + arrData[i][index] + '",';

				if (index !== "__metadata") {

					if (index === "IMAGE_CONTENT") {
						//  row += '"' + this.convertDataURIToBinary(arrData[i][index]) + '",'; 
						var contentType = 'image/png';
						var b64Data = arrData[i][index];

						var blob = this.b64toBlob(b64Data, contentType);
						var blobUrl = URL.createObjectURL(blob);
						row += blobUrl + ',';
					} else {
					  row += '"' + arrData[i][index] + '",'; 
					
					}

				}
			}

			row.slice(0, row.length - 1);

			//add a line break after each row
			CSV += row + '\r\n';
		}

		if (CSV == '') {
			alert("Invalid data");
			return;
		}

		//Generate a file name
		var fileName = "MyReport_";
		//this will remove the blank-spaces from the title and replace it with an underscore
		fileName += ReportTitle.replace(/ /g, "_");

		//Initialize file format you want csv or xls
		var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension    

		//this trick will generate a temp <a /> tag
		var link = document.createElement("a");
		link.href = uri;

		//set the visibility hidden so it will not effect on your web-layout
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";

		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

	},

	convertDataURIToBinary: function(dataURI) {
		var raw = window.atob(dataURI);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));
		var i;
		for (i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	},

	b64toBlob: function(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {
			type: contentType
		});
		return blob;
	},
	expandImage : function(oEvent){
	    var image = oEvent.getSource();
	    var src = image.getSrc();
	    //var image2 = image.clone().setSrc(src);
	    // create popover
	      var imageNew = new sap.m.Image({height:"500px", width:"500px"});
	         imageNew.setSrc(src);
			if (! this._oPopover) {
			  
			    this._oPopover = new sap.m.Popover({content : imageNew,contentWidth:"500px", contentHeight :"500px",showHeader: false});
			//	this._oPopover = sap.ui.xmlfragment("sap.m.sample.Popover.Popover", this);
				this.getView().addDependent(this._oPopover);
			//	this._oPopover.bindElement("/ProductCollection/0");
			}
        this._oPopover = new sap.m.Popover({content : imageNew,contentWidth:"500px", contentHeight :"500px"});
			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
		//	var image = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(image);
			});
	    
	},
	screenshotPreview : function(oEvent){   
    /* CONFIG */
       var  xOffset = 10;
       var  yOffset = 30;
        // these 2 variable determine popup's distance from the cursor
        // you might want to adjust to get the right result
    /* END CONFIG */
    $("a.screenshot").hover(function(e){
        //this.rel matches the hidden img control id.
      //  var imgHidden = document.getElementById(this.rel);
      //  var imgSrc = imgHidden.src;
        //or use this, should be same.
    /*    this.t = this.title;
        this.title = "";   
        var c = (this.t != "") ? "<br/>" + this.t : "";*/
        $("body").append("<p id='screenshot'><img src='" + oEvent.getSource().getSrc() +"' alt='loading...' /></p>");                              
        $("#screenshot")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px")
            .fadeIn("fast");                       
    },
    function(){
        this.title = this.t;   
        $("#screenshot").remove();
    });
    $("a.screenshot").mousemove(function(e){

        $("#screenshot")

            .css("top",(e.pageY - xOffset) + "px")

            .css("left",(e.pageX + yOffset) + "px");

    });        

}

	

});