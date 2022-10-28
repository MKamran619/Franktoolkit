var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = 400;
c.height = 400;

var element = c;
var topPos = element.getBoundingClientRect().top + window.scrollY;
var leftPos = element.getBoundingClientRect().left + window.scrollX;

var showTorso = true;
var showWeight = true;
var showExternal = true;
var showInternal = true;
var showRope = true;
var showKneeE = true; // knee extra
var yoff = 0;

var rot;

// SLIDER

var slider = document.getElementById("angle");
var output = document.getElementById("output");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  kpos[0] = (klen*Math.sin((this.value/180)*Math.PI));
  kpos[1] = polelen+(klen*Math.cos((this.value/180)*Math.PI));
  rot = this.value;
  //this.value

  // hit deg
  var hitdeg = 270-(((Math.acos(-(polelen*2)/shin)/Math.PI)*180)-270);
  if (shin > polelen) {
    if (rot < hitdeg%360) {
      rot = hitdeg;
      kpos[0] = klen*Math.sin((rot/180)*Math.PI);
      kpos[1] = polelen+klen*Math.cos((rot/180)*Math.PI);
      slider.value = rot%360;
      output.innerHTML = Math.round(rot%360);
    }
  }
  // code
}
//

var griprange =0;


var mousex = 0;
var mousey = 0;
var mouseDown = 0;

var mod = (135/122);
//mod
var klen = 122*mod;
var polelen = 92*mod/2 + 22*mod/2;

var shin = 122*mod;

var ppos = [-43,-polelen];
var kpos = [klen,polelen];

var selected = false;
var selectn;

document.body.onmousedown = function() { 
  
  mouseDown=1;

}
document.body.onmouseup = function() {

  mouseDown=0;

}

// ipad

document.body.setAttribute("class","abc");
document.getElementById("myCanvas").addEventListener('touchstart', event => {
  document.body.setAttribute("class","abc noscroll");
  mouseDown = 1;
  griprange = 1;
  var x = event.touches[0].clientX-leftPos;
  var y = event.touches[0].clientY-topPos+document.documentElement.scrollTop;

  mousex = ((x-(c.width/2))/(c.height/2)*240)-2;
  mousey = -((y-(c.height/2))/(c.height/2)*240)+2-yoff;
}, false)
document.body.addEventListener('touchmove', event => {
  var x = event.touches[0].clientX-leftPos;
  var y = event.touches[0].clientY-topPos+document.documentElement.scrollTop;

  mousex = ((x-(c.width/2))/(c.height/2)*240)-2;
  mousey = -((y-(c.height/2))/(c.height/2)*240)+2-yoff;
}, false)
document.getElementById("myCanvas").addEventListener('touchend', event => {
  mouseDown = 0;
  selected = false;
  document.body.setAttribute("class","abc");
}, false)

//

function dis(x,y) {
  return Math.sqrt(x*x + y*y);
}

function pointonline(x1,y1,x2,y2,x,y) {
  var dot = (x2-x1)*(x-x1) + (y2-y1)*(y-y1);
  var proj = dot/dis(x1-x2,y1-y2);

  var isg = 0;
  if (proj < 0) {
    //proj=0
    isg = 1;
  }
  if (proj > dis(x1-x2,y1-y2)) {
    //proj=dis(x1-x2,y1-y2)
    isg = 1; // is greater
  }

  var nx = x1+((x2-x1)/dis(x1-x2,y1-y2))*proj;
  var ny = y1+((y2-y1)/dis(x1-x2,y1-y2))*proj;

  return [nx,ny,isg];
}

function mouse(event) {
  try {

    var x = event.clientX-leftPos;
    var y = event.clientY-topPos+document.documentElement.scrollTop;

    mousex = ((x-(c.width/2))/(c.height/2)*240)-2;
    mousey = -((y-(c.height/2))/(c.height/2)*240)+2-yoff;
    
  } catch(err){}

}

function gx(x) {return (c.width/2+((x/240)*c.height/2))}
function gy(y) {y+=yoff;return (c.height/2-((y/240)*c.height/2))}
function gz(z) {return ((z/240)*c.height/2)}

function step() {

  var doResize = document.getElementById("resize").checked;

  if (showTorso) {yoff = -160} else {yoff=-160} // invalid

  topPos = element.getBoundingClientRect().top + window.scrollY;
  leftPos = element.getBoundingClientRect().left + window.scrollX;

  ctx.clearRect(0,0,c.width,c.height);

  if (showRope && showKneeE) {

    // lines (for string)
    ctx.setLineDash([2, 2]);
    ctx.strokeStyle="red";
    ctx.beginPath();
    ctx.moveTo(gx(kpos[0]*-1*(shin/klen)),gy(polelen+((kpos[1]-polelen)*-1*(shin/klen))));
    ctx.lineTo(gx(ppos[0]),gy(ppos[1]))
    ctx.lineTo(gx(klen),gy(ppos[1])); // arrow [
    ctx.lineTo(gx(klen),gy(ppos[1]+15));
    ctx.lineTo(gx(klen+20),gy(ppos[1]));
    ctx.lineTo(gx(klen),gy(ppos[1]-15));
    ctx.lineTo(gx(klen),gy(ppos[1]));
    // ]
    ctx.stroke();
  }

  ctx.strokeStyle="black";
  ctx.setLineDash([5, 0]);
  // knees
  var angle = Math.atan(kpos[0]/(kpos[1]-polelen)); if (kpos[1]-polelen < 0) {angle += Math.PI} if (kpos[1]==0) {angle=Math.PI/2}
  angle = (angle/Math.PI)*180;
  ctx.beginPath();
  ctx.moveTo(gx(kpos[0]),gy(kpos[1]));
  ctx.lineTo(gx(0),gy(polelen))
  ctx.stroke();
  if (showKneeE) {
    ctx.beginPath();
    ctx.setLineDash([8, 3]);
    ctx.moveTo(gx(0),gy(polelen));
    ctx.lineTo(gx(kpos[0]*-1*(shin/klen)),gy(polelen+((kpos[1]-polelen)*-1*(shin/klen))))
    ctx.stroke();
    ctx.setLineDash([5, 0]);
  }

  ctx.font = "13px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(Math.round(angle) + "°",gx(kpos[0]+10),gy(kpos[1]+10));

  // pole
  ctx.beginPath();
  ctx.moveTo(gx(0),gy(polelen));
  ctx.lineTo(gx(0),gy(-polelen+(22*mod)));
  ctx.lineTo(gx(-44*mod),gy(-polelen));
  ctx.lineTo(gx(22*mod),gy(-polelen));
  ctx.lineTo(gx(0),gy(-polelen+(22*mod)));
  ctx.stroke();
  // moment
  if (showInternal && showKneeE && showRope) {
    var m = pointonline(kpos[0]*-1*(shin/klen),polelen+((kpos[1]-polelen)*-1*(shin/klen)),ppos[0],ppos[1],0,polelen); // reverse knee vs pulley
    if (m[2]) { // purple
      // create psudoline
      ctx.strokeStyle = "purple";
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(gx(kpos[0]*-1*(shin/klen)),gy(polelen+((kpos[1]-polelen)*-1*(shin/klen))));
      ctx.lineTo(gx(m[0]),gy(m[1]))
      ctx.stroke();
    }
    ctx.setLineDash([5, 0]);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(gx(0),gy(polelen));
    ctx.lineTo(gx(m[0]),gy(m[1]));
    ctx.closePath();
    ctx.stroke();
  }

  if (showTorso) {
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.ellipse(gx(kpos[0]),gy(kpos[1]+(85*(122/45))/2),gz(27*(122/45))/2,gz(85*(122/45))/2,0,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
  if (showWeight && showTorso) {
    ctx.setLineDash([2, 2]);
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(gx(kpos[0]),gy(kpos[1]));
    ctx.lineTo(gx(kpos[0]),gy(14-polelen));
    ctx.lineTo(gx(kpos[0])+10,gy(14-polelen));
    ctx.lineTo(gx(kpos[0]),gy(0-polelen));
    ctx.lineTo(gx(kpos[0])-10,gy(14-polelen));
    ctx.lineTo(gx(kpos[0]),gy(14-polelen));
    ctx.stroke();
    ctx.closePath();

    if (kpos[1] < polelen) {
      ctx.strokeStyle = "purple";
      ctx.setLineDash([1, 2]);
      ctx.beginPath(); // invis line
      ctx.moveTo(gx(kpos[0]),gy(polelen));
      ctx.lineTo(gx(kpos[0]),gy(kpos[1]));
      ctx.stroke();
      ctx.closePath();
    }
  }
  if (showExternal && showTorso && showWeight) {
    ctx.setLineDash([15, 0]);
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(gx(0),gy(polelen));
    ctx.lineTo(gx(kpos[0]),gy(polelen));
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([15, 5]);
  }

  ctx.setLineDash([5, 0]);

  /*

  ctx.fillStyle = "#008bdb";
  ctx.strokeStyle="black";
  ctx.beginPath();
  ctx.arc(gx(klen),gy(-polelen),gz(5),0,2*Math.PI);
  ctx.fill();
  ctx.stroke();*/

  ctx.fillStyle = "#008bdb";
  ctx.strokeStyle="black";
  ctx.beginPath();
  ctx.arc(gx(0),gy(polelen),gz(5),0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  // knee and

  // moveable
  ctx.fillStyle = "#008bdb";
  ctx.strokeStyle="black";
  ctx.beginPath();
  ctx.arc(gx(kpos[0]),gy(kpos[1]),gz(6),0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  if (showRope && showKneeE) {
    ctx.beginPath();
    ctx.arc(gx(ppos[0]+4),gy(ppos[1]+4),gz(5),0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  if (doResize && showKneeE) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(gx(kpos[0]*(shin/klen)*-1),gy(polelen + ((kpos[1]-polelen)/klen)*shin*-1),gz(5),0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  if (!mouseDown) {selected = false}

  if (dis(mousex-kpos[0],mousey-kpos[1]) < 6+(5*griprange)) {
    if (mouseDown && selected != true) {
      selected = true;
      selectn = "k";
    }
  }
  if (dis(mousex-ppos[0]-4,mousey-ppos[1]-4) < 5+(5*griprange) && showRope && showKneeE) {
    if (mouseDown && selected != true) {
      selected = true;
      selectn = "p";
    }
  }
  if (dis(mousex-(kpos[0]*(shin/klen)*-1),mousey-(((kpos[1]-polelen)*(shin/klen) *-1) + polelen)) < 5+ (5*griprange) && doResize && showKneeE) {
    if (mouseDown && selected != true) {
      selected = true;
      selectn = "r";
    }
  }

  if (selected) {
    if (selectn == "p") {
      ppos[0] = mousex;
    }
    if (selectn == "r") {

      /*
      Why not
      */

      rot = (Math.atan((kpos[0])/(kpos[1]-polelen))/Math.PI)*180;
      if ((kpos[1]-polelen) < 0) {rot+=180}
      if ((kpos[1]-polelen) == 0) {rot=90}

      // back to code

      var proj = ((kpos[0]*mousex) + ((kpos[1]-polelen)*(mousey-polelen)))/(dis(kpos[0],kpos[1]-polelen));

      if (-proj < 10) {proj = -10;} 
      if (-proj > 200) {proj=-200;}
      
      //kpos[0] = -proj*Math.sin((rot/180)*Math.PI);
      //kpos[1] = polelen-proj*Math.cos((rot/180)*Math.PI);

      //klen = -proj;
      shin = -proj;

      // ^ get line proj of new position
    }
    if (selectn == "k") {
      kpos[0] = (((mousex)/dis(mousex,mousey-polelen))*klen);
      kpos[1] = polelen+(((mousey-polelen)/dis(mousex,mousey-polelen))*klen);
      if (mousex < 0) {
        kpos[0]=0;
        if (mousey >polelen) {kpos[1]=polelen+klen} else {kpos[1]=polelen-klen}
      }
      rot = (Math.atan((kpos[0])/(kpos[1]-polelen))/Math.PI)*180;
      if ((kpos[1]-polelen) < 0) {rot+=180}

      if (rot>135) {
        kpos[0] = klen*Math.sin((135/180)*Math.PI);
        kpos[1] = polelen+klen*Math.cos((135/180)*Math.PI);
        rot=135;
      }

      slider.value = rot;
      output.innerHTML = Math.round(rot);
    }
  }

  // test shin hit
  
  // hit deg
  var hitdeg = 270-(((Math.acos(-(polelen*2)/shin)/Math.PI)*180)-270);
  if (shin > polelen) {
    if (rot < hitdeg%360) {
      rot = hitdeg;
      kpos[0] = klen*Math.sin((rot/180)*Math.PI);
      kpos[1] = polelen+klen*Math.cos((rot/180)*Math.PI);
      slider.value = rot%360;
      output.innerHTML = Math.round(rot%360);
    }
  }
  // code
  

  ctx.font = "25px Arial Black";
  ctx.fillStyle = "#0000ff26";
  ctx.fillText("Courtesy: Professor Fedel",20,25);

  window.requestAnimationFrame(step);

}

window.requestAnimationFrame(step);