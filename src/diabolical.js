(function($){
  var Diabolical = function(element, options) {
    // init
    var elem = $(element);
    var obj = this;
    var visible = false;
    var settings = {
      dialogWidth:400,
      dialogLeftPosition:'',
      dialogTopPosition:40,
      closeText:'Close',
      title:'',
      contentText: '',
      fadeOutDialog:1,
      fadeInDialog:1,
      scrollToDialog:1,
      cssTheme:'default.css',
      pluginLocation:'/javascripts/diabolical/src/',
      themeLocation:'/javascripts/diabolical/src/',
      usesSpinJs: false
    };
    if (options) { $.extend(settings, options); };
    var cssPath = settings.themeLocation + settings.cssTheme;

    // Public methods
    this.show = function() {
      var contentBox = obj.modalContainer.find('#dialogContent');
      // set content (from a URL or settings)
      if (settings.contentURL) {
        // spinner via spin.js (http://fgnass.github.com/spin.js/)
        if (settings.usesSpinJs) {
          try {
            var spinner = new Spinner(settings.spinnerSettings).spin();
            contentBox.html(spinner.el)
          } catch(e) {
            contentBox.html($('<img/>',{src: settings.pluginLocation + 'spinner.gif'}));
          }
        // or spinner.gif
        } else {
          contentBox.html($('<img/>',{src: settings.pluginLocation + 'spinner.gif'}));
        }
        
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
      if (settings.scrollToDialog == 1 && settings.dialogTopPosition > 20) {
        $('html, body').animate({scrollTop:settings.dialogTopPosition - 20}, 'slow'); // Scroll to 20px above the top of the dialog
      };
      obj.visible = true;
    };
     
    this.hide = function() {
      if (settings.fadeOutDialog == 1) {
        $(obj.modalContainer).fadeOut(500, function() { $(this).remove() }); 
      } else {
        $(obj.modalContainer).remove();
      }
      obj.visible = false;
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
    
    this.leftPosition = function() {
      var windowSize = obj.getWindowSize();
      if (settings.dialogLeftPosition != '') {
        return settings.dialogLeftPosition;
      } else {
        return windowSize[0] / 2 - settings.dialogWidth / 2;
      }
    };
    
    this.isVisible = function(){
      return obj.visible;
    };  
       
    // Private methods
    var setup = function() {
      var windowSize = obj.getWindowSize();
      obj.modalContainer = $('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});
      var closeLink = $('<a/>', {id:'dialogClose', href:'#'}).text(settings.closeText);
      var dialogCloseBar = $('<p/>', {id:'dialogCloseBar'}).append(closeLink);

      var dialogBox = $('<div/>', {id:'dialogBox', css: {left: obj.leftPosition(), top: settings.dialogTopPosition, 'width': settings.dialogWidth}}).append($('<h2/>').text(settings.title)).append($('<div/>', {id:'dialogContent'})).append(dialogCloseBar);
      if (settings.cssClass) {
        dialogBox.addClass(settings.cssClass)
      };
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