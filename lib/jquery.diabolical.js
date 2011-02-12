function Dialog() {
  // init
  
  // document.write(unescape('%3Clink rel="stylesheet" href="../lib/jquery.diabolical.css"%3E'));
  
  // methods
  this.show = function() {
    var windowSize = this.getWindowSize();
    console.log('windowsize:' + windowSize);
    var modalContainer = jQuery('<div/>', {id: 'dialogBackground', css: { width: windowSize[0], height: windowSize[1], top: 0, left: 0, 'min-height': windowSize[1] }});
   
    var closeLink = jQuery('<p/>').append(jQuery('<a/>', {id:'dialogClose', href:window.top.location}).text('Close'));
    var dialogBox = jQuery('<div/>', {id:'dialogBox', css: {left: windowSize[0] / 2 - 500 / 2, top: windowSize[1] / 2 - 600 / 2}}).append(jQuery('<h2/>')).append(jQuery('<div/>', {id:'dialogContent'})).append(closeLink);
    
    
    
    modalContainer.append(dialogBox);
    jQuery('body').append(modalContainer);
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
    return result;
  };
}