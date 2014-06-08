styler = {
	pg : {
		temp : "",
		code : {
			"backgroundColor" : "background-color",
			"fontColor" : "color",
			"fontSize" : "font-size",
			"fontWeight" : "font-weight",
		}
	},
	ui : {
		openPopup : function(id){
			$("#stylePopup").fadeIn("fast");
			$("html, body").animate({ scrollTop: 0 }, "fast");
			styler.ctl.loadValues(id);
		},
		closePopup : function(){
			$("#stylePopup").fadeOut("fast");
		}
	},
	ctl : {
		loadValues : function(id){
			var target = $("*[data-num='"+id+"']")
			$.each(styler.pg.code, function(index,item){
				console.log(target.css(item))
				if(typeof target.css(item) == "string" && target.css(item).indexOf("rgb") != -1){
					var rgb = target.css(item);
					$("#"+index).val(target.css(item));
				}else{
					var removePX = target.css(item).replace("px", "");
					$("#"+index).val(removePX);
				}
			})
		},
		initLivePreview : function(){
			preview = setInterval(function(){
				var string = "";
				$.each($(".liveUpdate"), function(index,item){
					var temp = styler.pg.code[$(item).attr("id")]
					string += temp+":"+ $(item).val()+";";
				})
				$("#stylingPreview").attr("style", string);
			},500)
		},
		initColorPicker : function(){
			$(".colorPick").spectrum({
				showAlpha : true,
				move: function(color){
					var output = $(this).attr("id").replace("1", "")
					$("#"+output).val(color.toRgbString())
				}
			})
		},
		eventBinding : function(){
			$("#stylePopup").on("click",function(e){
				var target = $(e.target);
				if(target.attr('id') == "stylePopup"){
					styler.ui.closePopup();		
				}
			})
		}
	}
}

$(function(){
	styler.ctl.eventBinding();
	styler.ctl.initColorPicker();
	styler.ctl.initLivePreview();
})