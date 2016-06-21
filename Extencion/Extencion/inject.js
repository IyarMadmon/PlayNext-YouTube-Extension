//init

function init()
{
	$(".watch-title").click(function(){
        console.log($(".watch-title").text());
    });
	
	
	var elem = document.createElement("img");
	//elem.src = 'https://cdn0.iconfinder.com/data/icons/command-buttons/512/Fast_Forward-512.png';
	elem.src = chrome.extension.getURL('images/PNDisabled.png');
	elem.setAttribute("height", "15");
	elem.setAttribute("width", "15");
	elem.setAttribute("class", "TusCommentosPNButton");
	elem.setAttribute("innerHTML", "false");
	
	$(".content-wrapper").after(elem);
	
	$(".TusCommentosPNButton").click(function() {
		if(this.getAttribute("innerHTML") == "false") {
			this.src = chrome.extension.getURL('images/PNEnabled.png');
			this.setAttribute("innerHTML", "true");	
		} else {
			this.src = chrome.extension.getURL('images/PNDisabled.png');
			this.setAttribute("innerHTML", "false");	
		}
		
		
	})
}

$(document).ready(function(){
	init();
});