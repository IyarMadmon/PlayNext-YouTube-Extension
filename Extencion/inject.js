var picHeight = 25;
var picwidth = 25;
var picClass = "TusCommentosPNButton";
var enabledPicSrc = chrome.extension.getURL('images/PNEnabled.png');
var disabledPicSrc = chrome.extension.getURL('images/PNDisabled.png');
var picElements;
var video;

$(document).ready(function(){
	video = document.querySelector('video.video-stream');
	setTimeout(checkPlayerState, 1000);
	init();
});

function init()
{	

	document.addEventListener("DOMContentLoaded", function() {
		console.log("DOM fully loaded and parsed");
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

function checkPlayerState() {
	var dest = $("[isPicEnabled='true']").attr('id');
	if(dest != undefined && video && video.currentTime == video.duration ) {
		window.location="https://www.youtube.com" + dest;
	}
	setTimeout(checkPlayerState, 1000);
}