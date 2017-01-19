var engine = {

  lastPageUrl: {},

  start: function() {
    lastPageUrl = {href: location.href, isLoaded: false};
    this.checkPlayerState();
  },
  checkPlayerState: function () {
    if(this.isVideoPage()) {
      if(this.hasNavigated()) {
        lastPageUrl = {href: location.href, isLoaded: true};
        setTimeout(buttons.init, 800);
        setTimeout(likePercentage.init, 800);
      }
    }
    setTimeout(this.checkPlayerState.bind(this), 2000);
  },
  isVideoPage: function() {
    return location.href.indexOf("/watch") !== -1;
  },
  hasNavigated: function() {
    return location.href !== lastPageUrl.href ||
           !lastPageUrl.isLoaded;
  }
};

var buttons = {
  init: function() {
    console.log('buttons');
  }
};

var likePercentage = {
  init: function() {
    console.log('likes');
    var calc = 0;
  	var numberoflikes = parseInt($('.like-button-renderer-like-button').find('span.yt-uix-button-content').html().replace(',', ''));
  	var numberofdislikes = parseInt($('.like-button-renderer-dislike-button').find('span.yt-uix-button-content').html().replace(',', ''));
  	if(numberoflikes !== 0 || numberofdislikes !== 0) { calc = (numberoflikes / (numberoflikes+numberofdislikes)) * 100;}
  	$('.like-button-renderer').before($("<span id='likesPercentage' style='color:#167ac6;'>"  +calc.toFixed(2)+ "%</span>"));
  }
};

engine.start();
