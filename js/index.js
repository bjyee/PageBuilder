index = {
	pg : {
		content : {
			header : {
				icon : "img/header.png",
				label : "header"
			},
			content : {
				icon : "img/content.png",
				label : "content"
			}
		}
	},
	ui : {
		openPanel : function(){
			var totalWidth = $(window).width();
			$("#panel").animate({
				"margin-right" : "0px"
			},500,function(){
				$("#panel").css({
					"margin-right" : "0px"
				})
				$("#panel").data("status", "open");
			})
		},

		closePanel : function(){
			$("#panel").animate({
				"margin-right" : "-500px"
			},500,function(){
				$("#panel").css({
					"margin-right" : "-500px"
				})
				$("#panel").data("status", "close");
			})
		},
		drawPanelContent : function(){
			var temp = 	"<div id='panelContent'>";
			$.each(index.pg.content, function(index,item){
				temp += "<div style='position:relative'class='"+index+"Item draggable'>"
				temp += "<img style='height:100px;width:auto;' src='"+item.icon+"'/>";
				temp += "<div style='height:100px;line-height:100px;font-size:30px;position:absolute;left: 150px; top:0px;'>"+item.label+"</div>";
				temp += "</div>";	
			})
			temp += 	"</div>";
			$("#panel").append(temp);
		},
	},
	ctl : {
		eventBinding : function(){
			$("#banner").on("click",function(e){
				var target = $(e.target);
				if(target.attr("id") == "menu" && ($("#panel").data("status") != "open" || typeof $("#panel").data("status") == "undefined")){
					index.ui.openPanel();
				}else if(target.attr("id") == "menu" && $("#panel").data("status") == "open"){
					index.ui.closePanel();
				}
			})
			
			$("#page").on("dblclick",function(e){
				var target = $(e.target);
				if(target.attr("class").indexOf("droppedContent") != -1){
					styler.ui.openPopup(target.attr("data-num"));
				}
			})
		}
	}
}
$(function(){
	index.ctl.eventBinding();
	index.ui.drawPanelContent();
})