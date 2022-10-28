let input;
let img;
let c;

let buttonScreenShot;
let button1;
let button2;
let button3;
let button4;
let button5;
let button6;

let mouseDisable = false;

let draw1Flag1 = false;
let draw1Flag2 = false;
let draw2Flag1 = false;
let draw2Flag2 = false;
let draw3Flag1 = false;
let draw3Flag2 = false;
let draw4Flag1 = false;
let draw5Flag1 = false;
let draw6Flag1 = false;
let draw4Flag2 = false;
let draw5Flag2 = false;
let draw6Flag2 = false;

let draw1I1 = false;
let draw1I2 = false;
let ex1 = 0;
let ey1 = 0;
let ex2 = 0;
let ey2 = 0;

let draw2I1 = false;
let draw2I2 = false;
let e2x1 = 0;
let e2y1 = 0;
let e2x2 = 0;
let e2y2 = 0;

let draw3I1 = false;
let draw3I2 = false;
let e3x1 = 0;
let e3y1 = 0;
let e3x2 = 0;
let e3y2 = 0;

let draw4I1 = false;
let draw4I2 = false;
let e4x1 = 0;
let e4y1 = 0;
let e4x2 = 0;
let e4y2 = 0;

let draw5I1 = false;
let draw5I2 = false;
let e5x1 = 0;
let e5y1 = 0;
let e5x2 = 0;
let e5y2 = 0;

let draw6I1 = false;
let draw6I2 = false;
let e6x1 = 0;
let e6y1 = 0;
let e6x2 = 0;
let e6y2 = 0;

function setup() {
  c = createCanvas(windowWidth * 0.65, windowHeight * 0.9);
  input = createFileInput(handleFile);
  input.position(900, 30);
  buttonScreenShot = createButton("Capture & Save");
  buttonScreenShot.position(windowWidth - 130, 30);
  buttonScreenShot.mousePressed(saveScreen);

  var buttonsXPosition = 930;
  button1 = createButton("Draw");
  button1.position(buttonsXPosition, 100);
  button1.mousePressed(draw1);
  button2 = createButton("Draw");
  button2.position(buttonsXPosition, 150);
  button2.mousePressed(draw2);
  button4 = createButton("Draw");
  button4.position(buttonsXPosition, 200);
  button4.mousePressed(draw4);
  button5 = createButton("Draw");
  button5.position(buttonsXPosition, 250);
  button5.mousePressed(draw5);
  button6 = createButton("Draw");
  button6.position(buttonsXPosition, 300);
  button6.mousePressed(draw6);
}

function draw() {
  mouseDisable = false;

  background(255);
  if (img) {
    // console.log('width', img.width);
    // image(img, 0, 0);
    // const height = img.height > 400 ? img.height > 1000 ? img.height / 2.5 : img.height / 2 : img.height
    // const width = img.width > 400 ? img.width > 1000 ? img.width / 2.5 : img.width / 2 : img.width
    var height;
    var width;
    //Setting the aspect ratio according to ratio
    var rat = img.width / img.height;
    height = img.height / (img.height / (windowHeight * 0.9));
    width = height * rat;
    if (width > windowWidth * 0.65) width = windowWidth * 0.65;
    const x = width > 200 ? width / 50 : width / 2; // left
    const y = height > 200 ? height / 50 : height / 2; // top

    image(img, x, y, width, height);
  }
  if (draw1Flag1) {
    noStroke();
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 10, 10);
  } else if (draw1Flag2) {
    stroke(255, 0, 0);
    strokeWeight(4);
    line(ex1, ey1, mouseX, mouseY);
  }

  if (draw1I1) {
    noStroke();
    fill(255, 0, 0);
    ellipse(ex1, ey1, 10, 10);
  } else if (draw1I2) {
    button1.html("Redraw");
    noStroke();
    fill(255, 0, 0);
    ellipse(ex1, ey1, 10, 10);
    stroke(255, 0, 0);
    strokeWeight(4);
    line(ex1, ey1, ex2, ey2);
    triangle(ex2 - 5, ey2, ex2 + 5, ey2, ex2, ey2 + 10);
  }

  //next
  if (draw2Flag1) {
    noStroke();
    fill(0, 150, 0);
    ellipse(mouseX, mouseY, 10, 10);
    // triangle(mouseX, mouseY, 10, 10);
  } else if (draw2Flag2) {
    stroke(0, 150, 0);
    strokeWeight(4);
    line(e2x1, e2y1, mouseX, mouseY);
  }

  if (draw2I1) {
    noStroke();
    fill(0, 150, 0);
    // ellipse(e2x1, e2y1, 10, 10);
    triangle(e2x1 - 5, e2y1, e2x1 + 5, e2y1, e2x1, e2y1 - 10);
  } else if (draw2I2) {
    button2.html("Redraw");
    noStroke();
    fill(0, 150, 0);
    // ellipse(e2x1, e2y1, 10, 10);
    ellipse(e2x2, e2y2, 10, 10);
    stroke(0, 150, 0);
    strokeWeight(4);
    line(e2x1, e2y1, e2x2, e2y2);
    // triangle(e2x2 - 5, e2y2, e2x2 + 5, e2y2, e2x2, e2y2 - 10);

    let angle = Math.atan((e2y1 - e2y2) / (e2x2 - e2x1));
    if (angle <= 0 && e2x1 < e2x2) angle += Math.PI;
    if (angle >= 0 && e2y1 > e2y2) angle -= Math.PI;
    let xComp = 5 * Math.sin(angle);
    let yComp = 5 * Math.cos(angle);
    triangle(
      e2x1 - xComp,
      e2y1 - yComp,
      e2x1 + xComp,
      e2y1 + yComp,
      e2x1 + 2 * yComp,
      e2y1 - 2 * xComp
    );
  }

  //next

  if (draw4Flag1) {
    noStroke();
    fill(0, 0, 255);
    ellipse(mouseX, mouseY, 10, 10);
  } else if (draw4Flag2) {
    noStroke();
    fill(0, 0, 255);
    ellipse(e4x1, e4y1, 10, 10);
    stroke(0, 0, 255);
    strokeWeight(4);

    line(e4x1, e4y1, mouseX, mouseY);
  }

  if (draw4I1) {
  } else if (draw4I2) {
    button4.html("Redraw");
    noStroke();
    fill(0, 0, 255);
    ellipse(e4x1, e4y1, 10, 10);
    stroke(0, 0, 255);
    strokeWeight(4);
    line(e4x1, e4y1, e4x2, e4y2);
  }
  //next
  if (draw5Flag1) {
    noStroke();
    fill(0, 255, 0);
    ellipse(mouseX, mouseY, 10, 10);
  } else if (draw5Flag2) {
    noStroke();
    fill(0, 255, 0);
    ellipse(e5x1, e5y1, 10, 10);
    stroke(0, 255, 0);
    strokeWeight(4);
    line(e5x1, e5y1, mouseX, mouseY);
  }
  if (draw5I1) {
  } else if (draw5I2) {
    button5.html("Redraw");
    noStroke();
    fill(0, 255, 0);
    ellipse(e5x1, e5y1, 10, 10);
    stroke(0, 255, 0);
    strokeWeight(4);
    line(e5x1, e5y1, e5x2, e5y2);
  }
  //next
  if (draw6Flag1) {
    noStroke();
    fill(255, 0, 255);
    ellipse(mouseX, mouseY, 10, 10);
  } else if (draw6Flag2) {
    noStroke();
    fill(255, 0, 255);

    ellipse(e6x1, e6y1, 10, 10);
    stroke(255, 0, 255);
    strokeWeight(4);
    line(e6x1, e6y1, mouseX, mouseY);
  }
  if (draw6I1) {
  } else if (draw6I2) {
    button6.html("Redraw");
    noStroke();
    fill(255, 0, 255);
    ellipse(e6x1, e6y1, 10, 10);
    stroke(255, 0, 255);
    strokeWeight(4);
    line(e6x1, e6y1, e6x2, e6y2);
  }

  drawIndicators();
}

function drawIndicators() {
  noStroke();
  fill(255, 0, 0);
  ellipse(1000, 110, 10, 10);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(1000, 110, 1050, 110);
  triangle(1050, 105, 1050, 115, 1060, 110);
  noStroke();
  text("Weight Line", 1000, 95);

  noStroke();
  fill(0, 150, 0);
  ellipse(1000, 160, 10, 10);
  stroke(0, 150, 0);
  strokeWeight(4);
  line(1000, 160, 1050, 160);
  triangle(1050, 155, 1050, 165, 1060, 160);
  noStroke();
  text("GRF", 1000, 145);

  noStroke();
  fill(0, 0, 255);
  ellipse(1000, 210, 10, 10);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(1000, 210, 1050, 210);
  noStroke();
  text("Hip Moment Arm", 1000, 200);

  noStroke();
  fill(0, 255, 0);
  ellipse(1000, 260, 10, 10);
  stroke(0, 255, 0);
  strokeWeight(4);
  line(1000, 260, 1050, 260);
  noStroke();
  text("Knee Moment Arm", 1000, 250);

  noStroke();
  fill(255, 0, 255);
  ellipse(1000, 310, 10, 10);
  stroke(255, 0, 255);
  strokeWeight(4);
  line(1000, 310, 1050, 310);
  noStroke();
  text("Ankle Moment Arm", 1000, 300);
}

function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}
function mousePressed() {
  if (mouseDisable) {
    return;
  }
  if (draw1Flag1) {
    ex1 = mouseX;
    ey1 = mouseY;
    draw1I1 = true;
    draw1Flag1 = false;
    draw1Flag2 = true;
  } else if (draw1Flag2) {
    ex2 = mouseX;
    ey2 = mouseY;
    draw1I2 = true;
    draw1I1 = false;
    draw1Flag1 = false;
    draw1Flag2 = false;
  }
  if (draw2Flag1) {
    e2x1 = mouseX;
    e2y1 = mouseY;
    draw2I1 = true;
    draw2Flag1 = false;
    draw2Flag2 = true;
  } else if (draw2Flag2) {
    e2x2 = mouseX;
    e2y2 = mouseY;
    draw2I2 = true;
    draw2I1 = false;
    draw2Flag1 = false;
    draw2Flag2 = false;
  }

  if (draw4Flag1) {
    e4x1 = mouseX;
    e4y1 = mouseY;
    draw4I1 = true;
    draw4Flag1 = false;
    draw4Flag2 = true;
  } else if (draw4Flag2) {
    e4x2 = mouseX;
    e4y2 = mouseY;
    draw4I2 = true;
    draw4I1 = false;
    draw4Flag1 = false;
    draw4Flag2 = false;
  }
  if (draw5Flag1) {
    e5x1 = mouseX;
    e5y1 = mouseY;
    draw5I1 = true;
    draw5Flag1 = false;
    draw5Flag2 = true;
  } else if (draw5Flag2) {
    e5x2 = mouseX;
    e5y2 = mouseY;
    draw5I2 = true;
    draw5I1 = false;
    draw5Flag1 = false;
    draw5Flag2 = false;
  }

  if (draw6Flag1) {
    e6x1 = mouseX;
    e6y1 = mouseY;
    draw6I1 = true;
    draw6Flag1 = false;
    draw6Flag2 = true;
  } else if (draw6Flag2) {
    e6x2 = mouseX;
    e6y2 = mouseY;
    draw6I2 = true;
    draw6I1 = false;
    draw6Flag1 = false;
    draw6Flag2 = false;
  }
}

function saveScreen() {
  saveCanvas(c, "myCanvas", "jpg");
}

function draw1() {
  button1.html("Draw");
  mouseDisable = true;
  draw1Flag1 = !draw1Flag1;
  draw1I1 = false;
  draw1I2 = false;
  ex1 = 0;
  ey1 = 0;
  ex2 = 0;
  ey2 = 0;
}
function draw2() {
  button2.html("Draw");
  mouseDisable = true;
  draw2Flag1 = !draw2Flag1;
  draw2I1 = false;
  draw2I2 = false;
  e2x1 = 0;
  e2y1 = 0;
  e2x2 = 0;
  e2y2 = 0;
}

function draw4() {
  button4.html("Draw");
  mouseDisable = true;
  draw4Flag1 = !draw4Flag1;
  draw4I1 = false;
  draw4I2 = false;
  e4x1 = 0;
  e4y1 = 0;
  e4x2 = 0;
  e4y2 = 0;
}
function draw5() {
  button5.html("Draw");
  mouseDisable = true;
  draw5Flag1 = !draw5Flag1;
  draw5I1 = false;
  draw5I2 = false;
  e5x1 = 0;
  e5y1 = 0;
  e5x2 = 0;
  e5y2 = 0;
}
function draw6() {
  button6.html("Draw");
  mouseDisable = true;
  draw6Flag1 = !draw6Flag1;
  draw6I1 = false;
  draw6I2 = false;
  e6x1 = 0;
  e6y1 = 0;
  e6x2 = 0;
  e6y2 = 0;
}
