styler = {
	pg : {
		
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