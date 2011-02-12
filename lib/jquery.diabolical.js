function Dialog(options) {
  // set defaults
  this.dialogWidth = 450;
  
  // init
  this.options = options;
  
  
  
  // parts
  
  this.setup = function() {
    var windowSize = this.getWindowSize();
  
  this.modalContainer = jQuery('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});
 
  this.closeLink = jQuery('<a/>', {id:'dialogClose', href:window.top.location}).text('Close');
  this.dialogCloseBar = jQuery('<p/>', {id:'dialogCloseBar'}).append(this.closeLink);
  this.dialogBox = jQuery('<div/>', {id:'dialogBox', css: {left: windowSize[0] / 2 - this.dialogWidth / 2, top: 40}}).append(jQuery('<h2/>')).append(jQuery('<div/>', {id:'dialogContent'})).append(this.dialogCloseBar);
  this.modalContainer.append(this.dialogBox);



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



}

