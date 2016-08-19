function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 50);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold + last - now);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

var myFunction = throttle(function(e){
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    console.log(coor);
});
