styler = {
	pg : {
		temp : "",
		code : {
			"backgroundColor" : "background-color",
			"fontColor" : "color",
			"fontSize" : "font-size",
			"fontWeight" : "font-weight",
			"textDecoration" : "text-decoration",
		},
		fontWeight : {
			400 : "normal",
			700 : "bold"
		},
		textDecoration : {
			"none" : "none",
			"underline" : "underline",
		}
	},
	ui : {
		openPopup : function(id){
			$("#stylePopup").fadeIn("fast");
			$("html, body").animate({ scrollTop: 0 }, "fast");
			styler.pg.temp = id;
			styler.ctl.loadValues(id);
		},
		closePopup : function(){
			$("#stylePopup").fadeOut("fast");
			$("#dropdown").hide();
		},
		openDropdown : function(id){
			var newTop = $("#"+id).position().top;
			var newLeft = $("#"+id).position().left;
			$("#dropdown").css({
				"top" : $("#"+id).position().top + 25 + "px",
				"left" : $("#"+id).position().left
			})
			$("#dropdown").show().empty();
			
			$.each(styler.pg[id], function(index, item){
				var temp = "<div class='dropdownItem' data-content='"+index+"' data-type='"+id+"'>"+item+"</div>";
				$("#dropdown").append(temp)
			})
		}
	},
	ctl : {
		loadValues : function(id){
			var target = $("*[data-num='"+id+"']")
			$.each(styler.pg.code, function(index,item){
				if(typeof target.css(item) == "string"){
					var value = ""
					if(index == "textDecoration"){
						var string = target.css(item);
						string = string.split(" ")
						value = string[0];
					}else if(target.css(item).indexOf("rgb") != -1){
						var rgb = target.css(item);
						value = target.css(item);
						$("#"+index+"1").spectrum("set", value);
					}else{
						var removePX = target.css(item).replace("px", "");
						value = removePX;
					}
				}else{
					if(index == "fontWeight"){
						value = styler.pg.fontWeight[target.css(item)]
					}
				}
				$("#"+index).val(value);
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
				},
				hide : function(color){
					var output = $(this).attr("id").replace("1", "")
					$(this).spectrum("set", $("#"+output).val());
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
			
			$("#styler").on("click", function(e){
				var target = $(e.target);
				if(target.attr("class") != null && target.attr("class").indexOf("dropDown") != -1){
					styler.ui.openDropdown(target.attr("id"));
				}
				
				if(target.attr("id") == "save"){
					var temp = $("*[data-num='"+styler.pg.temp+"']").attr("style");
					temp += $("#stylingPreview").attr("style");
					$("*[data-num='"+styler.pg.temp+"']").attr("style", temp);
					styler.ui.closePopup();
				}
				
				if(target.attr("id") == "cancel"){
					styler.ui.closePopup();
				}
			})
			
			$("#dropdown").on("click", function(e){
				var target = $(e.target);
				if(typeof target.attr("class") != "undefined" && target.attr("class").indexOf("dropdownItem") != -1){
					$("#"+target.attr("data-type")).val(target.html());
				}
				$("#dropdown").hide();
			})
		}
	}
}

$(function(){
	styler.ctl.eventBinding();
	styler.ctl.initColorPicker();
	styler.ctl.initLivePreview();
})