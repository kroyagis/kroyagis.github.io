/* Variable declarations */
/* Avatar elements */
var cap = document.querySelector(".cap");

var pupils = document.getElementsByClassName("pupils");
var eyes = document.getElementsByClassName("eyes");
var brows = document.getElementsByClassName("brows");

var mouseover = false;
/* Project elements */
var projects = document.getElementsByClassName("project");

var soom = document.querySelector(".soom");
var newmedia = document.querySelector(".newmedia");
var seatyourself = document.querySelector(".seatyourself");
var crowdfunder = document.querySelector(".crowdfunder");


/* Cap light function */
var capLightOn = function(e){
  cap.classList.toggle('capOn');
  cap.style.background = getComputedStyle(e).borderColor;
}

/* Eye glows function */
var eyeBeamOn = function(){
  for (var j = 0; j < eyes.length; j++){
    pupils[j].classList.toggle('pupiloff');
    eyes[j].classList.toggle('eyeOn');
  }
}

/* Back to default function */
var lightsOff = function(){
  // cap.style.boxShadow = "";
  cap.classList.toggle('capOn');
  cap.style.background = '#E9E9E9';
  for (var j = 0; j < eyes.length; j++){
    pupils[j].classList.toggle('pupiloff');
    eyes[j].classList.toggle('eyeOn');
  }
}

/* mouseover event on project links */
for (var i = 0; i < projects.length; i++){
  projects[i].onmouseover = function(e){
    mouseover = true;
    this.style.transition = "";
    capLightOn(this);
    eyeBeamOn();
  }
}

/* mouseout event on project links */
for (var i = 0; i < projects.length; i++){
  projects[i].onmouseout = function(e){
    mouseover = false;
    lightsOff();
  }
}
