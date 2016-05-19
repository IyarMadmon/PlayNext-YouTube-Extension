//init
function init()
{
	$(".watch-title").click(function(){
        console.log($(".watch-title").text());
    });
	console.log("IYAR - INIT");
}

$(document).ready(function(){
	init();
});