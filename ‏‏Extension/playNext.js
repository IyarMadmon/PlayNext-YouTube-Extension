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
        setTimeout(buttons.init.bind(buttons), 500);
        setTimeout(likePercentage.init.bind(likePercentage), 500, 25);
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

  picHeight: 22,
  picwidth: 22,
  picClass: "PlayNextButton",
  enabledPicSrc: chrome.extension.getURL('images/PNEnabled.png'),
  disabledPicSrc: chrome.extension.getURL('images/PNDisabled.png'),
  selectedButton: null,

  init: function() {
    this.createButtons(25);
    $("#watch-more-related-button").click(this.attachMoreVideos.bind(this));
  },

  attachMoreVideos : function() {
  },

  createButtons: function(attemptsLeft) {
    var returned = $(".content-wrapper:not(.picClassprev)").each(this.innerCreateButton.bind(this));
    if(returned.length == 0 && attemptsLeft > 0) {
      setTimeout(this.createButtons.bind(this), 100, attemptsLeft-1);
    }
  },

  innerCreateButton: function(key, contentWrapperElem) {
    $(contentWrapperElem).addClass("picClassprev");
    var el = $( '<div></div>' );
    el.html(contentWrapperElem.innerHTML);
    var currHref = $('a', el).first().attr('href');
    var elem = $("<img></img>").
        attr("src", this.disabledPicSrc).
        attr("height", this.picHeight).
        attr("width", this.picwidth).
        attr("class", this.picClass).
        attr("id", currHref);
    $(contentWrapperElem).after(elem);
    $(elem).click(this.toggleButton.bind(this));
  },
  toggleButton: function (event) {
    if(this.selectedButton === null) {
      event.target.setAttribute("src", this.enabledPicSrc);
      this.selectedButton = event.target;
    } else if(this.selectedButton === event.target){
      this.selectedButton = null;
      event.target.setAttribute("src", this.disabledPicSrc);
    } else {
      this.selectedButton.setAttribute("src", this.disabledPicSrc);
      event.target.setAttribute("src", this.enabledPicSrc);
      this.selectedButton = event.target;
    }
  },
  nextVideo: function() {
    return this.selectedButton;
  }
};

var likePercentage = {
  init: function(attemptsLeft) {
    var calc = 0;
    var numberoflikes = $('.like-button-renderer-like-button');
  	if(numberoflikes.length > 0) {
      numberoflikes = parseInt((numberoflikes).find('span.yt-uix-button-content').html().split(',').join(''));
      var numberofdislikes = parseInt($('.like-button-renderer-dislike-button').find('span.yt-uix-button-content').html().split(',').join(''));
    	if(numberoflikes !== 0 || numberofdislikes !== 0) {
        calc = (numberoflikes / (numberoflikes+numberofdislikes)) * 100;
      }
    	$('.like-button-renderer').before($("<span style='color:#167ac6;'>"  +calc.toFixed(2)+ "%</span>"));
      return;
    }
    if(attemptsLeft > 0) setTimeout(this.init.bind(this), 100, attemptsLeft-1);
  }
};

engine.start();
