styler = {
	pg : {
		temp : "",
		code : {
			"backgroundColor" : "background-color",
			"fontColor" : "color",
			"fontSize" : "font-size"
		}
	},
	ui : {
		openPopup : function(){
			$("#stylePopup").fadeIn("fast");
			$("html, body").animate({ scrollTop: 0 }, "fast");
		},
		closePopup : function(){
			$("#stylePopup").fadeOut("fast");
		}
	},
	ctl : {
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
			$(".colorPick").ColorPicker({
				onShow : function (colpkr){
					$(colpkr).fadeIn(500);
					styler.pg.temp = "#" + $(this).attr("id");
					return false;
				},
				onHide: function (colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},
				onChange: function (hsb, hex, rgb, el) {
					var temp = styler.pg.temp;
					$(temp).val('#' + hex);
				}
			});
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