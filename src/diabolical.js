(function($){
  var Diabolical = function(element, options) {
    // init
    var elem = $(element);
    var obj = this;
    var settings = {
      'dialogWidth':400,
      'dialogLeftPosition':'',
      'closeText':'Close',
      'title': '',
      'contentText' : '',
      'fadeOutDialog':1,
      'fadeInDialog':1,
      'cssTheme':'default.css',
      'pluginLocation':'/javascripts/diabolical/src/'
    };
    if (options) { $.extend(settings, options); };
    var cssPath = settings.pluginLocation + settings.cssTheme;

    // Public methods
    this.show = function() {
      var contentBox = obj.modalContainer.find('#dialogContent');
      // set content (from a URL or settings)
      if (settings.contentURL) {
        contentBox.html($('<img/>',{src: settings.pluginLocation + 'spinner.gif'}));
        $.get(settings.contentURL, function(data) {
          contentBox.html(data);
        });
      } else {
        contentBox.html(settings.contentText);
      }
        
      var e = elem.append(obj.modalContainer);
      if (settings.fadeInDialog == 1) {
        obj.modalContainer.hide().fadeIn();
      };
      $('html, body').animate({scrollTop:20}, 'slow');
    };
     
    this.hide = function() {
      if (settings.fadeOutDialog == 1) {
        $(obj.modalContainer).fadeOut(500, function() { $(this).remove() }); 
      } else {
        $(obj.modalContainer).remove();
      }
    };
     
    this.handleResize = function() {
      var windowSize = this.getWindowSize();
      $('#dialogBackground').css({'width':windowSize[0], 'height': windowSize[1]});
      $('#dialogBox').css({'left': obj.leftPosition});
    };
     
    this.getWindowSize = function() {
      var result = new Array(2);
      result[0] = $(window).width();
      result[1] = $(document).height();
      return result;
    };
    
    this.leftPosition = function () {
      if (settings.dialogLeftPosition != '') {
        return leftPosition = settings.dialogLeftPosition;
      } else {
        return leftPosition = windowSize[0] / 2 - settings.dialogWidth / 2;
      }
    };
      
       
    // Private methods
    var setup = function() {
      var windowSize = obj.getWindowSize();
      obj.modalContainer = $('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});
      var closeLink = $('<a/>', {id:'dialogClose', href:'#'}).text(settings.closeText);
      var dialogCloseBar = $('<p/>', {id:'dialogCloseBar'}).append(closeLink);
      
      var dialogBox = $('<div/>', {id:'dialogBox', css: {left: obj.leftPosition, top: 40, 'width': settings.dialogWidth}}).append($('<h2/>').text(settings.title)).append($('<div/>', {id:'dialogContent'})).append(dialogCloseBar);
      obj.modalContainer.append(dialogBox);
      
      elem.append('<link rel="stylesheet" href="' + cssPath + '">');
      return true;
    };
   
    setup();
  };
   
  // jQuery interface
  $.fn.diabolical = function(options) {
    return this.each(function() {
      var element = $(this);
      
      // Return early if this element already has a plugin instance
      if (element.data('diabolical')) return;

      var diabolical = new Diabolical(this, options);

      // Store plugin object in this element's data
      element.data('diabolical', diabolical);
       
      // setup bind events
      $(window).bind('resize', function() { diabolical.handleResize(); });
      $('#dialogClose').live('click', function() { diabolical.hide(); return false; });
    });
  };
})(jQuery);