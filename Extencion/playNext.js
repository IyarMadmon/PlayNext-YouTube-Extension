var picHeight = 25;
var picwidth = 25;
var picClass = "TusCommentosPNButton";
var enabledPicSrc = chrome.extension.getURL('images/PNEnabled.png');
var disabledPicSrc = chrome.extension.getURL('images/PNDisabled.png');
var picElements;
var video;

$(document).ready(function(){
	setTimeout(checkPlayerState, 1000);
});

function init()
{	
	video = document.querySelector('video.video-stream');
	loadPics();
	
	$("." + picClass).click(function() {
		if(this.getAttribute("isPicEnabled") == "false") {
			$("[isPicEnabled='true']").attr('isPicEnabled',false).attr('src', disabledPicSrc);
			this.src = enabledPicSrc
			this.setAttribute("isPicEnabled", true);	
		} else {
			this.src = disabledPicSrc
			this.setAttribute("isPicEnabled", false);	
		}
	})
} // End of init

function loadPics() {
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
} // End of loadPics

function checkPlayerState() {
	var dest = $("[isPicEnabled='true']").attr('id');
	
	if(isVideoPage() && (!$("." + picClass).length)) {
		init();
	} else if(dest != undefined && video && video.currentTime == video.duration) {
		window.location="https://www.youtube.com" + dest;
	}
	
	setTimeout(checkPlayerState, 1000);
} // End of checkPlayerState

function isVideoPage() {
    return location.href.indexOf("/watch") !== -1;
} // End of isVideoPage