//init
function init()
{
	$(".watch-title").click(function(){
        console.log($(".watch-title").text());
    });
	
	
	
	console.log("IYAR - INIT");
	console.log($(".comment-renderer-text-content:first").val());
	
}

$(document).ready(function(){
	init();
});