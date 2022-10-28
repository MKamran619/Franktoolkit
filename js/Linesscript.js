(function() {
  let image = document.querySelector("#image");
  // get camvas
  let canvas = document.querySelector("#canvas");
  // load button
  let loadBtn = document.getElementById("file-1");
  let drawMode = document.querySelector("#pointDraw");
  let header = document.querySelector(".app .header");
  let clearPointsBtn = document.querySelector("#clearPoints");
  let clearLineFsBtn = document.querySelector("#clearLines");
  let lineLength = document.querySelector("#lineLength");
  let pointSize = 10;
  let pointColor = "red";
  let allPoints = [];
  let selectedPoints = [];
  let select2Point = false;
  loadBtn.addEventListener("change", function(evt) {
    let file = evt.target.files[0]; // File object
    // set player to new video
    image.src = URL.createObjectURL(file);
    image.classList.remove("hide");
    let bounds = image.getBoundingClientRect();
    canvas.width = bounds.width;
    canvas.height = bounds.height;
  });
  clearLineFsBtn.addEventListener("click", function() {
    clearCanvas();
    drawPoints(allPoints);
  });
  clearPointsBtn.addEventListener("click", function() {
    clearCanvas();
    allPoints = [];
  });
  canvas.addEventListener("click", function(e) {
    let shiftX = pointSize / 2;
    let shiftY = header.getBoundingClientRect().height;
    let x = e.x - shiftX;
    let y = e.y - shiftY - 5;
    if (drawMode.checked) {
      allPoints.push({ x, y });
      drawPoints(allPoints);
    } else {
      let point = allPoints.filter(point => {
        return collision(point, { x, y });
      })[0];
      console.log(point);
      if (!select2Point) {
        if (point.length != 0) {
          selectedPoints[0] = point;
          select2Point = true;
          lineLength.value = "";
        }
      } else {
        if (point.length != 0) {
          selectedPoints[1] = point;
          drawLine(selectedPoints[0], selectedPoints[1]);
          drawPoints(allPoints);
          select2Point = false;
          lineLength.value =
            pointsDistance(selectedPoints[0], selectedPoints[1]).toFixed(2) +
            "px";
        }
      }
      console.log(selectedPoints);
    }
  });

  function drawPoints(points) {
    let ctx = canvas.getContext("2d");
    points.forEach(point => {
      ctx.fillStyle = pointColor;
      ctx.fillRect(point.x, point.y, pointSize, pointSize);
    });
  }
  function drawLine(p1, p2) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(p1.x + pointSize / 2, p1.y + pointSize / 2);
    ctx.lineTo(p2.x + pointSize / 2, p2.y + pointSize / 2);
    ctx.strokeStyle = "#fc03df";
    ctx.lineWidth = 5;
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.stroke();
  }
  function clearCanvas() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function collision(a, b) {
    let w =
      a.x - b.x <= 0
        ? Math.abs(a.x - b.x) <= pointSize
        : Math.abs(a.x - b.x) <= pointSize;
    let h =
      a.y - b.y <= 0
        ? Math.abs(a.y - b.y) <= pointSize
        : Math.abs(a.y - b.y) <= pointSize;
    return w && h;
  }
  function pointsDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
})();
