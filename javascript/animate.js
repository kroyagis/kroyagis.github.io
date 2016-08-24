/* Variable declarations */
/* Avatar elements */
var cap = document.querySelector(".cap");

var pupils = document.getElementsByClassName("pupils");
var eyes = document.getElementsByClassName("eyes");
var brows = document.getElementsByClassName("brows");

/* Project elements */
var projects = document.getElementsByClassName("project");

var soom = document.querySelector(".soom");
var newmedia = document.querySelector(".newmedia");
var seatyourself = document.querySelector(".seatyourself");
var crowdfunder = document.querySelector(".crowdfunder");


/* Cap light function */
var capLight = function(e){
  cap.style.transition = "";
  cap.style.background = getComputedStyle(e).borderColor
}

/* Eye glows function */
var eyeBeamOn = function(){
  for (var j = 0; j < eyes.length; j++){
    pupils[j].style.display = "none";
    eyes[j].style.transition = ""
    eyes[j].style.boxShadow = "0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #F3F315 , 0 0 70px #F3F315";
  }
}

/* Back to default function */
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

/* mouseover event on project links */
for (var i = 0; i < projects.length; i++){
  projects[i].onmouseover = function(e){
    capLight(this);
    eyeBeamOn();
  }
}

/* mouseout event on project links */
for (var i = 0; i < projects.length; i++){
  projects[i].onmouseout = function(e){
    lightsOff();
  }
}
