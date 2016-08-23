function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 51);
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
};

var DrawEye = function(eyecontainer, pupil, eyeposx, eyeposy){
  var r = document.querySelector(pupil).offsetWidth/2;
  var center = {
    x: document.querySelector(eyecontainer).offsetWidth/2 - r,
    y: document.querySelector(eyecontainer).offsetHeight/2 - r
  };
  var distanceThreshold = document.querySelector(eyecontainer).offsetWidth/2 - r;
  var mouseX = 0, mouseY = 0;
  //Mouse movement
  document.addEventListener('mousemove', throttle(function(e){
    var d = {
      x: e.pageX - r - eyeposx - center.x,
      y: e.pageY - r - eyeposy - center.y
    };
    var distance = Math.sqrt(d.x*d.x + d.y*d.y);
    if (distance < distanceThreshold) {
      mouseX = e.pageX - eyeposx - r;
      mouseY = e.pageY - eyeposy - r;
    } else {
      mouseX = d.x / distance * distanceThreshold + center.x;
      mouseY = d.y / distance * distanceThreshold + center.y;
    }
  }));

  // Update pupil location
  var pupil = document.querySelector(pupil);
  var xp = 0, yp = 0;
  var loop = setInterval(function(){
    // change 1 to alter damping/momentum - higher is slower
    xp += (mouseX - xp) / 1;
    yp += (mouseY - yp) / 1;
    pupil.style.left = xp+"px";
    pupil.style.top = yp+"px";
  }, 1);
};
var w = window;
var avatareye1 = new DrawEye(".eyeleft", ".pupilleft", (w.innerWidth/2 + 52.0625), (w.innerHeight - 97.595));
var avatareye2 = new DrawEye(".eyeright", ".pupilright", (w.innerWidth/2 - 84.0625), (w.innerHeight - 95.595));


var getPosition = function(el){
  var xPos = 0;
  var yPos = 0;

  while (el){
    if (el.tagName = "BODY"){
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
