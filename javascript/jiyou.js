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

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

function Xeyes(faceClass, e1Class, e1Lft, e1Top, e1Radius, e2Class, e2Lft, e2Top, e2Radius)
{
  var faceObj = document.querySelector(faceClass),
      eye1Obj = document.querySelector(e1Class),
      eye2Obj = document.querySelector(e2Class),
      e1x, e1y,    // eye centre relative to top left of doc
      r1,
      e1xLoc, e1yLoc,   // eye top left relative to top left of parent
      e2x, e2y,
      r2,          // eye radii
      e2xLoc, e2yLoc;

  // setup initial eye locations
  var eyesInit = debounce(function()
  {
    var faceWidth = faceObj.offsetWidth,
        faceHeight = faceObj.offsetHeight,
        tmp;

    function getPosition(el) {
      var xPos = 0;
      var yPos = 0;

      while (el) {
        if (el.tagName == "BODY") {
          // deal with browser quirks with body/window/document and page scroll
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTop;

          xPos += (el.offsetLeft - xScroll + el.clientLeft);
          yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
          // for all other non-BODY elements
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

    // get left,top of eyes relative to parent
    e1xLoc = 0.01*e1Lft*faceWidth - eye1Obj.offsetWidth/2;
    e1yLoc = 0.01*e1Top*faceHeight - eye1Obj.offsetHeight/2;
    e2xLoc = 0.01*e2Lft*faceWidth - eye2Obj.offsetWidth/2;
    e2yLoc = 0.01*e2Top*faceHeight - eye2Obj.offsetHeight/2;

    // get absolute position of centre of eyes
    e1x = window.innerWidth/2 + 60;
    e1y = window.innerHeight - 86;
    e2x = window.innerWidth/2 - 60;
    e2y = window.innerHeight - 86;

    r1 = 0.01*e1Radius*faceWidth;
    r2 = 0.01*e2Radius*faceWidth;
    // now move the eyes to a less goggle-eye position until mouse moves
    eye1Obj.style.left = e1xLoc+"px";        // "12.4em";
    eye1Obj.style.top = e1yLoc+r1/1.5+"px";    // "16.3em";
    eye2Obj.style.left = e2xLoc+"px";        // "21.0em";
    eye2Obj.style.top = e2yLoc+r2/1.5+"px";    // "16.3em";
  }, 250);

  var moveEyes = throttle(function(e){
    var csrX, csrY,
        x, y,
        dx, dy,
        R, d;

    if (e.pageX)
    {
      csrX = e.pageX;
      csrY = e.pageY;
    }
    else
    {
      // IE case
      d = (document.documentElement && document.documentElement.scrollLeft != null) ?
             document.documentElement : document.body;
      csrX = e.clientX + d.scrollLeft;
      csrY = e.clientY + d.scrollTop;
    }
    // eye 1 first
    dx = csrX - e1x;
    dy = csrY - e1y;
    R = Math.sqrt(dx*dx+dy*dy);     // distance from eye centre to csr
    x = (R < r1)? dx : dx*r1/R;
    y = (R < r1)? dy : dy*r1/R;
    eye1Obj.style.left = x + e1xLoc + "px";
    eye1Obj.style.top = y + e1yLoc + "px";
    // now for eye 2
    dx = csrX - e2x;
    dy = csrY - e2y;
    R = Math.sqrt(dx*dx+dy*dy);
    x = (R < r2)? dx : dx*r2/R;
    y = (R < r2)? dy : dy*r2/R;
    eye2Obj.style.left = x + e2xLoc + "px";
    eye2Obj.style.top = y + e2yLoc + "px";
  });

  eyesInit();
  // if the browser window is resized eye locations must be re-calculated
  addEvent(window, "resize", eyesInit);
  // setup handler for cursor move
  addEvent(document, "mousemove", moveEyes);
}

var cap = document.querySelector(".cap");

var projects = document.getElementsByClassName("project");
var pupils = document.getElementsByClassName("pupils");
var eyes = document.getElementsByClassName("eyes");
var brows = document.getElementsByClassName("brows");

var soom = document.querySelector(".soom");
var newmedia = document.querySelector(".newmedia");
var seatyourself = document.querySelector(".seatyourself");
var crowdfunder = document.querySelector(".crowdfunder");

var capLight = function(e){
  cap.style.transition = "";
  cap.style.background = getComputedStyle(e).borderColor
}


var eyeBeamOn = function(){
  for (var j = 0; j < eyes.length; j++){
    pupils[j].style.display = "none";
    eyes[j].style.transition = ""
    eyes[j].style.boxShadow = "0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #F3F315 , 0 0 70px #F3F315";
  }
}

var lightsOff = function(){
  cap.style.transition = "all 0.2s ease-in-out";
  cap.style.boxShadow = "";
  cap.style.background = '#E9E9E9';
  for (var j = 0; j < eyes.length; j++){
    eyes[j].style.transition = "all 0.1s ease-in-out";
    pupils[j].style.display = "block";
    eyes[j].style.background = "white";
    eyes[j].style.boxShadow = "";
  }
}

for (var i = 0; i < projects.length; i++){
  projects[i].onmouseout = function(e){
    lightsOff();
  }
}

for (var i = 0; i < projects.length; i++){
  projects[i].onmouseover = function(e){
    capLight(this);
    eyeBeamOn();
  }
}
