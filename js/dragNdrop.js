dragNdrop = {
	pg : {
		content : {
			"header" : 0,
			"content" : 0
		}
	},
	ui : {
		appendHeader : function(){
			if(dragNdrop.pg.content.header == 0){
				dragNdrop.pg.content.header = 1;
				var temp = "<div id='droppedHeader'>";
				temp += "<div class='message'>Drag an image <br>to upload it.</div>"
				temp += "</div>";
				$("#page").append(temp);
				dragNdrop.ui.imageUpload();
			}else{
				alert("Only one header at a time")
			}
		},
		appendContent : function(){
			dragNdrop.pg.content.content += 1;
			var temp = "<div class='droppedContent' data-num='"+dragNdrop.pg.content.content+"'>";
			temp += "Double Click to Style"
			temp += "</div>";
			$(temp).draggable({
				containment: "#page",
				grid : [25,25]
			}).resizable({
				containment: "#page",
				grid: 25,
				handles: "n, e, s, w, ne, se, sw, nw",
				start : function(event,ui){
					var temp = "<div id='resizingOverlay'></div>";
					ui.element.append(temp);
				},
				resize : function(event, ui){
					var height = ui.helper.height() + 2;
					var width = ui.helper.width() + 2;
					var temp = "<div id='resizingD'>";
					temp += width+" X "+height;
					temp += "</div>";
					$("#resizingOverlay").html(temp)
					$("#resizingD").css({
						"margin-left" : -($("#resizingD").width()/2)+"px",
						"margin-top" : -($("#resizingD").height()/2)+"px",
					})
				},
				stop: function(event,ui){
					$("#resizingOverlay").remove();
				}
			}).appendTo($("#page"));
		},
		imageUpload : function(){
			if(window.FileReader){
				var obj = $("#droppedHeader");
				obj.on('dragenter', function (e) {
				    e.stopPropagation();
				    e.preventDefault();
				});
				obj.on('dragover', function (e) {
				     e.stopPropagation();
				     e.preventDefault();
				});
				obj.on('drop', function (e) {
				     e.preventDefault();
				     var files = e.originalEvent.dataTransfer.files;
				 
				     for (var i=0; i<files.length; i++) {
				    	    var file = files[i];
				    	    //Only pics
			                if(!file.type.match('image')){
			                	alert("Invalid File Type");
				                continue;	
			                }
//			                Max size
			                if(file.size > 1049000){
			                	alert("Invalid File Size : Max 1Mb");
			                	continue;
			                }
				    	    var reader = new FileReader();
				    	    reader.readAsDataURL(file);
				    	    reader.addEventListener('loadend', function(e, filez) { 
				    	    	var bin = this.result; 
				    	    	$("#droppedHeader .message").remove();
				    	    	$("#droppedHeader").css({
				    	    		"border-bottom" : "none",
				    	    		"height" : "auto"
				    	    	})
				    	    	var image = "<img style='width:100%;height:auto;position:absolute;top:0;left:0;' src='"+bin+"'/>";
				    	    	$("#droppedHeader").append(image);
				    	    }, false);
				     }
				});
			}	
		}
	},
	ctl : {
		initDraggable : function(){
			$(".draggable").draggable({
				appendTo: "#page",
				helper: "clone"
			})
		},
		initDroppable : function(){
			$("#page").droppable({
				accept: ".draggable",
				over: function(event, ui){
					index.ui.closePanel();
				},
				drop : function(event, ui){
					var className = ui.draggable.attr("class");
					 
					if(className.indexOf("headerItem") != -1){
						dragNdrop.ui.appendHeader();
					}else if (className.indexOf("contentItem") != -1){
						dragNdrop.ui.appendContent();
					}
				}
			})
		},
	}
}

$(function(){
	dragNdrop.ctl.initDroppable();
	dragNdrop.ctl.initDraggable();
})