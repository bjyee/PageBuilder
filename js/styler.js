styler = {
	pg : {
		temp : ""
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
})