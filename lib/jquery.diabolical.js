(function($){
   var Diabolical = function(element, options)
   {
       var elem = $(element);
       var obj = this;
       var settings = {
         'dialogWidth':400,
         'fadeOutDialog':0
       };
       
       if (options) { $.extend(settings, options); };

       // Public methods
       this.show = function() {
           console.log('show() called!');
           elem.append(obj.modalContainer);
       };
       
       this.getWindowSize = function() {
         var result = new Array(2);
         var myWidth = 0, myHeight = 0;
         if (typeof (window.innerWidth) == 'number') {
             //Non-IE
             myWidth = window.innerWidth;
             myHeight = window.innerHeight;
         } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
             //IE 6+ in 'standards compliant mode'
             myWidth = document.documentElement.clientWidth;
             myHeight = document.documentElement.clientHeight;
         }
         result[0] = myWidth;
         result[1] = myHeight;

         console.log(result);
         return result;
       }
       
       // Private methods
       var setup = function() {
         console.log('setup called');
         var windowSize = obj.getWindowSize();
         obj.modalContainer = $('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});

         var closeLink = $('<a/>', {id:'dialogClose', href:'#'}).text('Close');

         var dialogCloseBar = $('<p/>', {id:'dialogCloseBar'}).append(closeLink);
         var dialogBox = $('<div/>', {id:'dialogBox', css: {left: windowSize[0] / 2 - settings.dialogWidth / 2, top: 40}}).append($('<h2/>')).append($('<div/>', {id:'dialogContent'})).append(dialogCloseBar);
         obj.modalContainer.append(dialogBox);
         
         // bind close click
       };
       
       setup();
   };

   $.fn.diabolical = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('diabolical')) return;

           var diabolical = new Diabolical(this, options);

           // Store plugin object in this element's data
           element.data('diabolical', diabolical);
       });
   };
})(jQuery);







function Dialog(options) {
  // set defaults
  this.dialogWidth = 450;
  this.fadeOutDialog = 1;
  // init
  this.options = options;
  
  
  
  // parts
  
  this.setup = function() {
    var windowSize = this.getWindowSize();
  
  this.modalContainer = jQuery('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});
 
  this.closeLink = jQuery('<a/>', {id:'dialogClose', href:'#'}).text('Close');

  this.dialogCloseBar = jQuery('<p/>', {id:'dialogCloseBar'}).append(this.closeLink);
  this.dialogBox = jQuery('<div/>', {id:'dialogBox', css: {left: windowSize[0] / 2 - this.dialogWidth / 2, top: 40}}).append(jQuery('<h2/>')).append(jQuery('<div/>', {id:'dialogContent'})).append(this.dialogCloseBar);
  this.modalContainer.append(this.dialogBox);

  this.closeLink.bind('click', function(){
    console.log(this.fadeOutDialog);
    console.log('clicked');
    // console.log('fadeOutDialog: ' + parseInt(this.fadeOutDialog));
    console.log('delay');
    var holder = jQuery(this).parent().parent().parent();
    
    if (1==1) {
      holder.fadeOut(500, function() { jQuery(this).remove()});
    } else {
      holder.remove();
    }
    
    return false;
  });

  // TODO - figure out how to bind to resize
  }
  // document.write(unescape('%3Clink rel="stylesheet" href="../lib/jquery.diabolical.css"%3E'));
  
  // methods
  this.show = function() {
    this.setup();
    jQuery('body').append(this.modalContainer);
  };
  
  this.hide = function() {
    console.log('hide');
    this.modalContainer.remove();
  }
  
  this.handleResize = function() {
    var windowSize = this.getWindowSize();
    jQuery('#dialogBackground').css({'width':windowSize[0], 'height': windowSize[1]});
    jQuery('#dialogBox').css({'left': windowSize[0] / 2 - 450 / 2});
  }
  
  this.getWindowSize = function() {
    var result = new Array(2);
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    result[0] = myWidth;
    result[1] = myHeight;
    
    console.log(result);
    return result;
  };


  return(this);
}

