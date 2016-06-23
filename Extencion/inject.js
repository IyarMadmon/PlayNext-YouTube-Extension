var picHeight = 15;
var picwidth = 15;
var picClass = "TusCommentosPNButton";
var enabledPicSrc = chrome.extension.getURL('images/PNEnabled.png');
var disabledPicSrc = chrome.extension.getURL('images/PNDisabled.png');
var picElements;

$(document).ready(function(){
	init();
});

function init()
{
	$(".watch-title").click(function(){
        console.log($(".watch-title").text());
    });
	
	$(".content-wrapper").each(function() {
		var el = $( '<div></div>' );
		el.html(this.innerHTML);
		var currHref = $('a', el).first().attr('href');
		
		var elem = $("<img></img>").
				attr("src", disabledPicSrc).
				attr("height", picHeight).
				attr("width", picwidth).
				attr("class", picClass).
				attr("isPicEnabled", false).
				attr("id", currHref);
				
		console.log("IYAR. currHref = " + currHref);
		console.log("IYAR. elem.id = " + elem.attr("isPicEnabled"));
		$(this).after(elem);
	})
	
	$("." + picClass).click(function() {
		if(this.getAttribute("isPicEnabled") == "false") {
			this.src = chrome.extension.getURL('images/PNEnabled.png');
			this.setAttribute("isPicEnabled", true);	
		} else {
			this.src = chrome.extension.getURL('images/PNDisabled.png');
			this.setAttribute("isPicEnabled", false);	
		}
	})
} // End of init