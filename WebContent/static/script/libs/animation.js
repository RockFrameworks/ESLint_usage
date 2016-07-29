/**
* @author 
* @description 
* @comment 
*/
define([], function () {

  return {

    slideleft: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      inView.addClass('animatestart');
      inView.addClass('sliderightin');

      inView._onshow();
      // $('div[pageurl="'+ outView.viewname +'"]').hide();
      
      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        inView.removeClass('animatestart');
        inView.removeClass('sliderightin');

        if (outView) outView._onhide(inView.viewname);

        callback && callback.call(scope, inView, outView);
      }, 340);
    },
    slideright: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      if (outView) {
        outView.addClass('animatestart');
        outView.addClass('sliderightout');
      }

      inView._onshow();

      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        if (outView) {
          outView.removeClass('animatestart');
          outView.removeClass('sliderightout');
          outView._onhide(inView.viewname);
        }

        callback && callback.call(scope, inView, outView);

      }, 340);
    },


    noAnimate: function (inView, outView, callback, scope) {
      //减少重绘和回流
      this.mainframe.hide();

      //in 一定会有 out则不一定
      if (outView) outView._onhide(inView.viewname);
      inView._onshow();

      this.mainframe.show();

      callback && callback.call(scope, inView, outView);

    }

  };
});