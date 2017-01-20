var engine = {

  lastPageUrl: {},
  video: null,

  start: function() {
    lastPageUrl = {href: location.href, isLoaded: false};
    this.checkPlayerState();
  },
  checkPlayerState: function () {
    if(this.isVideoPage()) {
      if(this.hasNavigated()) {
        lastPageUrl = {href: location.href, isLoaded: true};
        video = document.querySelector('video.video-stream');
        setTimeout(buttons.init.bind(buttons), 800);
        setTimeout(likePercentage.init.bind(likePercentage), 800);
      } else if (this.hasVideoEnded()) {
        var nextVideo;
        if(nextVideo = buttons.nextVideo()) {
          window.location="https://www.youtube.com" + nextVideo.getAttribute("id");
        }
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
  },
  hasVideoEnded: function() {
    return video && video.currentTime == video.duration;
  }
};

var buttons = {

  picHeight: 25,
  picwidth: 25,
  picClass: "PlayNextButton",
  enabledPicSrc: chrome.extension.getURL('images/PNEnabled.png'),
  disabledPicSrc: chrome.extension.getURL('images/PNDisabled.png'),
  selectedButton: null,

  init: function() {
    this.createButtons();
    this.bindEvents();
  },

  createButtons: function() {
    console.log("createButtons", new Date().getTime());
    $(".content-wrapper").each(function() {
  		if(!$(this).next().hasClass(buttons.picClass)) {
  			var el = $( '<div></div>' );
  			el.html(this.innerHTML);
  			var currHref = $('a', el).first().attr('href');
  			var elem = $("<img></img>").
  					attr("src", buttons.disabledPicSrc).
  					attr("height", buttons.picHeight).
  					attr("width", buttons.picwidth).
  					attr("class", buttons.picClass).
  					attr("id", currHref);
  			$(this).after(elem);
  		}
    });
  },
  bindEvents: function() {
    $("." + this.picClass).on("click", this.toggleButton);
    $("#watch-more-related-button").click(function() {
      console.log("more", new Date().getTime());
  		setTimeout(buttons.createButtons, 1000);
  	});
  },
  toggleButton: function () {
    if(buttons.selectedButton === null) {
      this.setAttribute("src", buttons.enabledPicSrc);
      buttons.selectedButton = this;
    } else if(buttons.selectedButton === this){
      buttons.selectedButton = null;
      this.setAttribute("src", buttons.disabledPicSrc);
    } else {
      buttons.selectedButton.setAttribute("src", buttons.disabledPicSrc);
      this.setAttribute("src", buttons.enabledPicSrc);
      buttons.selectedButton = this;
    }
  },
  nextVideo: function() {
    return this.selectedButton;
  }
};

var likePercentage = {
  init: function() {
    var calc = 0;
  	var numberoflikes = parseInt($('.like-button-renderer-like-button').find('span.yt-uix-button-content').html().split(',').join(''));
  	var numberofdislikes = parseInt($('.like-button-renderer-dislike-button').find('span.yt-uix-button-content').html().split(',').join(''));
  	if(numberoflikes !== 0 || numberofdislikes !== 0) {
      calc = (numberoflikes / (numberoflikes+numberofdislikes)) * 100;
    }
  	$('.like-button-renderer').before($("<span style='color:#167ac6;'>"  +calc.toFixed(2)+ "%</span>"));
  }
};

engine.start();
