var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var gA = 0.5;

c.width = 400;
c.height = 400;

var element = c;
var topPos = element.getBoundingClientRect().top + window.scrollY;
var leftPos = element.getBoundingClientRect().left + window.scrollX;

var mousex = 0;
var mousey = 0;

var seeang = false;
document.getElementById("disang").className = "abc inv";
document.getElementById("discheck").className = "abc val";

var footang = Math.round((Math.random() * 80) - 20);

var angle = 180 - Math.round((Math.random() * 135) + 5);

//var xpos = [Math.cos((angle/360)*2*Math.PI)*150,0,150];
//var ypos = [Math.sin((angle/360)*2*Math.PI)*150,0,0];
var xpos = [Math.sin((30 / 360) * 2 * Math.PI) * 150, 0, Math.sin(((30 + angle) / 360) * 2 * Math.PI) * 150];
var ypos = [Math.cos((30 / 360) * 2 * Math.PI) * 150, 0, Math.cos(((30 + angle) / 360) * 2 * Math.PI) * 150];

var distance1 = 150;

var mode = "q"; //c, v
ctx.globalAlpha = gA;

var background = false;
var flipx = false;

function toggleflip() {
  flipx = !flipx;
}

function removeback() {
  for (var i = 0; i < document.getElementsByClassName("background").length; i++) {
    var element = document.getElementsByClassName("background")[i];
    element.parentNode.removeChild(element);
  }
  background = false;
}

function read() {

  flipx = false;

  var file = document.getElementById('file').files[0];
  var reader = new FileReader();
  background = false;
  for (var i = 0; i < document.getElementsByClassName("background").length; i++) {
    var el = document.getElementsByClassName("background")[i];
    el.parentNode.removeChild(el);
    i -= 1;
  }

  reader.onload = function (e) {
    var image = document.createElement("img");

    image.src = e.target.result;
    image.setAttribute("class", "background");
    image.setAttribute("style", "display:none;");
    background = true;

    document.body.appendChild(image);
  }

  reader.readAsDataURL(file);
}

function angcreate() {
  angle = 180 - document.getElementById("kneeguess").value;
  footang = document.getElementById("ankleguess").value;
  footang = footang % 360;
  if (document.getElementsByName('typeof')[0].checked == true) {
    footang *= -1;
  }
  if (footang > 180) { footang -= 360 }
  if (footang < -180) { footang += 360 }
  xpos = [Math.sin((30 / 360) * 2 * Math.PI) * 150, 0, Math.sin(((30 + angle) / 360) * 2 * Math.PI) * 150];
  ypos = [Math.cos((30 / 360) * 2 * Math.PI) * 150, 0, Math.cos(((30 + angle) / 360) * 2 * Math.PI) * 150];
  distance1 = dis(xpos[0], ypos[0], xpos[1], ypos[1]);
  xpos[2] = xpos[1] + Math.sin(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * distance1;
  ypos[2] = ypos[1] + Math.cos(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * distance1;
}
function setmode(n) {
  mode = n;
  document.getElementsByClassName("displayoptions")[0].style.display = "block";
  document.getElementsByClassName("displayoptions")[1].style.display = "block";

  document.getElementById("viewtxt").style.display = "none";

  if (n == "v") {
    document.getElementById("usertxt").innerHTML = "View Random Angles";

    document.getElementsByClassName("displayoptions")[0].style.display = "none";
    document.getElementsByClassName("displayoptions")[1].style.display = "none";

    document.getElementById("viewtxt").style.display = "block";
  }
  if (n == "c") {
    document.getElementById("angcreate").style.display = "block";
    seeang = true;
    displayang = true;
    document.getElementById("disang").className = "abc inv";
    document.getElementById("usertxt").innerHTML = "Create an angle";

    document.getElementsByName('typeof')[0].checked = true;
  } else {
    document.getElementById("angcreate").style.display = "none";
  }
  if (n != "q") {
    document.getElementById("quiz").style.display = "none";
    seeang = true;
    document.getElementById("disang").className = "abc val";
  } else {
    document.getElementsByName('typeof')[0].checked = false;
    document.getElementsByName('typeof')[1].checked = false;
    document.getElementById("usertxt").innerHTML = "Estimate the following";
    document.getElementById("quiz").style.display = "block";
    seeang = false;
    displayang = false;
    document.getElementById("disang").className = "abc inv";
    document.getElementById("discheck").className = "abc val";
    genrandom();
  }
}

var selectn = 0;
var selected = false;

var mouseDown = 0;

var displayang = false;
var gridlines = false;

var guesstotal = 0;

var corrects = [0, 0, 0, 0]

document.body.onmousedown = function () {

  mouseDown = 1;

}
document.body.onmouseup = function () {

  mouseDown = 0;

}

function check() {
  if (document.getElementById("discheck").className != "abc inv") {
    guesstotal += 1;
    var k = document.getElementById("kneeguess").value;
    var a = document.getElementById("ankleguess").value;
    document.getElementById("guesses").innerHTML = guesstotal;

    if (document.getElementsByName('typeof')[0].checked) {
      a *= -1;
    }
    if (!document.getElementsByName('typeof')[1].checked && !document.getElementsByName('typeof')[0].checked) {
      a = 100000;
    }

    if (Math.abs(k - (180 - angle)) < 10.0001) {
      corrects[0] += 1;
    }
    if (Math.abs(k - (180 - angle)) < 5.0001) {
      corrects[1] += 1;
    }
    if (Math.abs(a - footang) < 10.0001) {
      corrects[2] += 1;
    }
    if (Math.abs(a - footang) < 5.0001) {
      corrects[3] += 1;
    }

    document.getElementById("k10").innerHTML = corrects[0] + " / " + Math.round((corrects[0] / guesstotal) * 100) + "%";
    document.getElementById("k5").innerHTML = corrects[1] + " / " + Math.round((corrects[1] / guesstotal) * 100) + "%";
    document.getElementById("a10").innerHTML = corrects[2] + " / " + Math.round((corrects[2] / guesstotal) * 100) + "%";
    document.getElementById("a5").innerHTML = corrects[3] + " / " + Math.round((corrects[3] / guesstotal) * 100) + "%";

    document.getElementById("k10c").style.backgroundImage = "linear-gradient(to right, lightgreen 0,lightgreen " + Math.round((corrects[0] / guesstotal) * 100) + "%, lightgreen 0,salmon 0, salmon 100%)";
    document.getElementById("k5c").style.backgroundImage = "linear-gradient(to right, lightgreen 0,lightgreen " + Math.round((corrects[1] / guesstotal) * 100) + "%, lightgreen 0,salmon 0, salmon 100%)";
    document.getElementById("a10c").style.backgroundImage = "linear-gradient(to right, lightgreen 0,lightgreen " + Math.round((corrects[2] / guesstotal) * 100) + "%, lightgreen 0,salmon 0, salmon 100%)";
    document.getElementById("a5c").style.backgroundImage = "linear-gradient(to right, lightgreen 0,lightgreen " + Math.round((corrects[3] / guesstotal) * 100) + "%, lightgreen 0,salmon 0, salmon 100%)";

    seeang = true;

    document.getElementById("disang").className = "abc val";
    document.getElementById("discheck").className = "abc inv";
  }

}

function adis(a1, b1) {
  if (a1 <= 0) { a1 = 360 + a1 }
  if (b1 <= 0) { b1 = 360 + b1 }
  a1 = a1 % 360;
  b1 = b1 % 360;
  var adisr = b1 - a1;
  if (Math.abs(adisr) >= 180) {
    a1 = (a1 + 180) % 360;
    b1 = (b1 + 180) % 360;
    adisr = b1 - a1;
  }
  return adisr;
}

function genrandom() {
  if (mode != "c" && mode != "v") {
    document.getElementById("disang").className = "abc inv";
  }
  document.getElementById("discheck").className = "abc val";
  if (mode != "c" && mode != "v") {
    seeang = false;
  }
  angle = 180 - Math.round((Math.random() * 135) + 5);
  xpos = [Math.sin((30 / 360) * 2 * Math.PI) * 150, 0, Math.sin(((30 + angle) / 360) * 2 * Math.PI) * 150];
  ypos = [Math.cos((30 / 360) * 2 * Math.PI) * 150, 0, Math.cos(((30 + angle) / 360) * 2 * Math.PI) * 150];
  if (mode != "c") {
    displayang = false;
  }
  footang = Math.round((Math.random() * 80) - 20);
  document.getElementsByName('typeof')[0].checked = false;
  document.getElementsByName('typeof')[1].checked = false;

  distance1 = dis(xpos[0], ypos[0], xpos[1], ypos[1]);
   
}

function displayangle() {
  if (seeang) {
    displayang = !displayang;
  }
}

function toggle() {
  gridlines = !gridlines;
}

function dis(x, y, x2, y2) {
  x = x - x2;
  y = y - y2;
  return Math.sqrt(x * x + y * y);
}

function dir(x, y) {

  var dir = Math.atan(x / y);
  if (y == 0 && x > 0) {
    dir = Math.PI / 2;
  }
  if (y == 0 && !(x > 0)) {
    dir = -Math.PI / 2;
  }
  if (y < 0) { dir += Math.PI }

  return dir;
}

function mouse(event) {
  try {

    var x = event.clientX - leftPos;
    var y = event.clientY - topPos;

    mousex = ((x - (c.width / 2)) / (c.height / 2) * 240) - 2;
    mousey = -((y - (c.height / 2)) / (c.height / 2) * 240) + 2;

  } catch (err) { }

}

function gx(x) { return (c.width / 2 + ((x / 240) * c.height / 2)) }
function gy(y) { return (c.height / 2 - ((y / 240) * c.height / 2)) }
function gz(z) { return ((z / 240) * c.height / 2) }

function drawAngles(offx, offy) {
  ctx.globalAlpha = 1;
  ctx.fillText(180 - angle + "°", offx + gx(xpos[1] + 20 * Math.sin(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + Math.PI * (3 / 4) + Math.PI * (1 / 8)) - ((((180 - (180 - angle) / 2) / 360) * Math.PI * 2)) - 4), offy + gy(ypos[1] + 20 * Math.cos(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + Math.PI * (3 / 4) + Math.PI * (1 / 8)) - ((((180 - (180 - angle) / 2) / 360) * Math.PI * 2)) - 0));

  // ankle
  var type = "PF";
  if (footang < 0) { type = "DF"; }
  ctx.fillText((Math.abs(footang)) + "° (" + type + ")", offx + gx(xpos[2] + 50 * Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - (((angle / 2) / 360) * Math.PI * 2) + (180 / 360 * 2 * Math.PI)) - 30), offy + gy(ypos[2] + 20 * Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - (((angle / 2) / 360) * Math.PI * 2) + (180 / 360 * 2 * Math.PI)) - 10));
  ctx.globalAlpha = gA;
}

function drawTextInfo() {
  //  ctx.globalAlpha = gA;
  ctx.fillStyle = "white"
  ctx.font = "15px Arial";

  drawAngles(0, 0);
  drawAngles(0, 1);
  drawAngles(0, -1);
  drawAngles(1, 0);
  drawAngles(-1, 0);
  //  ctx.globalAlpha = gA;
  ctx.fillStyle = "black"
  ctx.font = "15px Arial";

  drawAngles(0, 0);
}

function drawInfo() {

  ctx.beginPath();
  ctx.setLineDash([5, 3]);
  ctx.strokeStyle = "grey";
  ctx.moveTo(gx(xpos[1]), gy(ypos[1]));
  var multi = dis(xpos[1], ypos[1], xpos[0], ypos[0]) / 120;
  ctx.lineTo(gx(xpos[1] + (xpos[1] - xpos[0]) / multi), gy(ypos[1] + (ypos[1] - ypos[0]) / multi));
  ctx.stroke();


  ctx.strokeStyle = "grey";
  ctx.setLineDash([5, 2]);


  // angle circles

  ctx.beginPath();
  //ctx.arc(gx(xpos[1]), gy(ypos[1]), 20,dir(xpos[0]-xpos[1],ypos[0]-ypos[1])-Math.PI/2-(((180-angle)/360)*Math.PI*2) ,dir(-xpos[0]-xpos[1],-ypos[0]-ypos[1])-Math.PI/2);
  ctx.arc(gx(xpos[1]), gy(ypos[1]), 20, dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - Math.PI / 2, dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - Math.PI / 2 - ((((angle * 2) + 180 - angle) / 360) * 2 * Math.PI));
  ctx.stroke();

  ctx.setLineDash([5, 0]);


}

function drawGrid() {
  ctx.strokeStyle = "#00000021";

  for (var i = 0; i < 8; i++) {
    if (i == 3) { ctx.lineWidth = 3; } else { ctx.lineWidth = 1; }
    ctx.beginPath();
    ctx.moveTo(gx(-240 + (480 / 8) * (i + 1)), gy(-240));
    ctx.lineTo(gx(-240 + (480 / 8) * (i + 1)), gy(240));
    ctx.stroke();
  }
  for (var i = 0; i < 8; i++) {
    if (i == 3) { ctx.lineWidth = 3; } else { ctx.lineWidth = 1; }
    ctx.beginPath();
    ctx.moveTo(gx(240), gy(-240 + (480 / 8) * (i + 1)));
    ctx.lineTo(gx(-240), gy(-240 + (480 / 8) * (i + 1)));
    ctx.stroke();
  }

}

function snaptogrid(x, y) {
  for (var i = 0; i < 8; i++) {
    if (Math.abs((-240 + (480 / 8) * (i + 1)) - x) < 6) {
      x = (-240 + (480 / 8) * (i + 1));
    }
    if (Math.abs((-240 + (480 / 8) * (i + 1)) - y) < 6) {
      y = (-240 + (480 / 8) * (i + 1));
    }
  }
  return [x, y];
}

function doMouse() {
  
  if (gridlines) {
    drawGrid();
  }
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#008bdb";
  for (var i = 0; i < xpos.length; i++) {
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(gx(xpos[i - 1]), gy(ypos[i - 1]));
      ctx.lineTo(gx(xpos[i]), gy(ypos[i]));
      ctx.stroke();
    }
  }

  if (displayang) {
    drawInfo();
  }


  if (!mouseDown) {
    selected = false;
    selectn = 0;
  }

  if (mouseDown && selected == false) {
    for (var i = 0; i < xpos.length; i++) {
      if (dis(xpos[i], ypos[i], mousex, mousey) < 8) {
        selected = true;
        selectn = i;
      }
    }
  }

  if (!selected && dis(mousex, mousey, xpos[2] + Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50, ypos[2] + Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50) < 5 && mouseDown) {
    selected = true;
    selectn = 4;
  }

  if (selectn == 4) {
    footang = Math.round(-(dir(mousex - xpos[2], mousey - ypos[2]) / Math.PI) * 180) + Math.round((dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) / Math.PI) * 180) + 90;

    if (footang > 180) { footang -= 360 }
    if (footang < -180) { footang += 360 }
  }

  if (selected == true && selectn != 4) {

    if (gridlines) {
      xpos[selectn] = snaptogrid(mousex, mousey)[0];
      ypos[selectn] = snaptogrid(mousex, mousey)[1];
      if (selectn == 2) {

        distance1 = dis(xpos[0], ypos[0], xpos[1], ypos[1]);

      }
    } else {

      xpos[selectn] = mousex;
      ypos[selectn] = mousey;
      if (selectn == 2) {

        distance1 = dis(xpos[0], ypos[0], xpos[1], ypos[1]);

      }
    }

    if (mode == "c" && selectn != 1) {
      angle = -Math.round(adis((dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) / Math.PI) * 180, (dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) / Math.PI) * 180));
    }
    if (selectn == 0) {
      if (mode == "c") {

        var o_x = xpos.slice(0);
        var o_y = ypos.slice(0);
        // use old as x/ypos[2] have been effected as soon as xpos[2] changes test
        xpos[2] = o_x[1] + ((o_x[2] - o_x[1]) / dis(o_x[2], o_y[2], o_x[1], o_y[1])) * dis(o_x[0], o_y[0], o_x[1], o_y[1]);
        ypos[2] = o_y[1] + ((o_y[2] - o_y[1]) / dis(o_x[2], o_y[2], o_x[1], o_y[1])) * dis(o_x[0], o_y[0], o_x[1], o_y[1]);


        xpos[2] = o_x[1] + ((o_x[2] - o_x[1]) / distance1) * distance1;
        ypos[2] = o_y[1] + ((o_y[2] - o_y[1]) / distance1) * distance1;
      } else {

        // xpos[2] = xpos[1] + Math.sin(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * dis(xpos[0], ypos[0], xpos[1], ypos[1]);
        // ypos[2] = ypos[1] + Math.cos(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * dis(xpos[0], ypos[0], xpos[1], ypos[1]);

        xpos[2] = xpos[1] + Math.sin(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * distance1;
        ypos[2] = ypos[1] + Math.cos(dir(xpos[0] - xpos[1], ypos[0] - ypos[1]) + (angle / 360) * 2 * Math.PI) * distance1;
      }
    }
    if (selectn == 1) {
      var o_x = xpos.slice(0);
      var o_y = ypos.slice(0);
      xpos[0] = o_x[1] + Math.sin(dir(o_x[2] - o_x[1], o_y[2] - o_y[1]) - ((angle / 360) * 2 * Math.PI)) * dis(o_x[1], o_y[1], o_x[2], o_y[2]);
      ypos[0] = ypos[1] + Math.cos(dir(o_x[2] - o_x[1], o_y[2] - o_y[1]) - ((angle / 360) * 2 * Math.PI)) * dis(o_x[1], o_y[1], o_x[2], o_y[2]);
    }
    if (selectn == 2) {
      if (mode == "c") {
        var o_x = xpos.slice(0);
        var o_y = ypos.slice(0);
        xpos[0] = xpos[1] + ((xpos[0] - xpos[1]) / dis(xpos[0], ypos[0], xpos[1], ypos[1])) * dis(xpos[2], ypos[2], xpos[1], ypos[1]);
        // use old as x/ypos[0] have been effected
        ypos[0] = o_y[1] + ((o_y[0] - o_y[1]) / dis(o_x[0], o_y[0], o_x[1], o_y[1])) * dis(o_x[2], o_y[2], o_x[1], o_y[1]);
      } else {
        xpos[0] = xpos[1] + Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - (angle / 360) * 2 * Math.PI) * dis(xpos[2], ypos[2], xpos[1], ypos[1]);
        ypos[0] = ypos[1] + Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) - (angle / 360) * 2 * Math.PI) * dis(xpos[2], ypos[2], xpos[1], ypos[1]);
      }
    }
  }

  ctx.strokeStyle = "black";
  ctx.setLineDash([5, 0]);
  ctx.beginPath();
  ctx.moveTo(gx(xpos[2]), gy(ypos[2]));
  // DRAW FOOT LINE
  ctx.lineTo(gx(xpos[2] + Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50), gy(ypos[2] + Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50));
  ctx.stroke();

  if (mode == "c") {
    ctx.strokeStyle = "black";
    //	ctx.globalAlpha = gA;
    ctx.fillStyle = "#008bdb";
    if (dis(mousex, mousey, xpos[2] + Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50, ypos[2] + Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50) < 6) {
      ctx.fillStyle = "#40abeb";
    }
    ctx.beginPath();
    ctx.arc(gx(xpos[2] + Math.sin(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50), gy(ypos[2] + Math.cos(dir(xpos[2] - xpos[1], ypos[2] - ypos[1]) + (Math.PI / 2) - ((footang / 180) * Math.PI)) * 50), 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  // draw nodes
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#008bdb";
  for (var i = 0; i < xpos.length; i++) {
    if (dis(xpos[i], ypos[i], mousex, mousey) < 8) {
      ctx.fillStyle = "#40abeb";
    }

    ctx.beginPath();
    ctx.arc(gx(xpos[i]), gy(ypos[i]), 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#008bdb";
  }

  if (displayang) {
    drawTextInfo();
  }

}

function step() {
  topPos = element.getBoundingClientRect().top + window.scrollY;
  leftPos = element.getBoundingClientRect().left + window.scrollX;

  ctx.clearRect(0, 0, c.width, c.height)

  ctx.font = "25px Arial Black";
  //  ctx.fillStyle = "#008bdb40"
  ctx.fillStyle = "#07a90e20"

  if (background) {
    try {
      var img = document.getElementsByClassName("background")[document.getElementsByClassName("background").length - 1];
      var w = img.width;
      var h = img.height;
      var scale = c.width / w;
      if (h * scale > c.height) {
        scale = c.height / h;
      }
      ctx.save();
      //      ctx.globalAlpha = gA;

      if (flipx) {

        ctx.scale(-1, 1);
        ctx.translate(-c.width, 0);
      }

      ctx.drawImage(img, gx(0) - (w / 2) * scale, gy(0) - (h / 2) * scale, w * scale, h * scale);
      ctx.globalAlpha = 1;
      ctx.restore();
    } catch (err) {

    }
  }
  ctx.globalAlpha = 1;
  ctx.fillText("Courtesy: Professor Fedel", 20, 25);
  ctx.globalAlpha = gA;
  try {

    doMouse();

  } catch (err) { }

  window.requestAnimationFrame(step);

}

window.requestAnimationFrame(step);