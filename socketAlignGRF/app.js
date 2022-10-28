const bottomSocketSlider = document.getElementById("bottomSocketSlider");
const topSocketSlider = document.getElementById("topSocketSlider");
const showLineBox = document.getElementById("showLine");
const bottomSocket = document.getElementById("bottomSocket");
const topSocket = document.getElementById("topSocket");
const svg = document.getElementById("svg");

let style = window.getComputedStyle(bottomSocket);
let rightValue = style.getPropertyValue("right");
rightValue = Number(rightValue.split("px")[0]);

function drawLine() {
  let isLineShown = showLineBox.checked;
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("id", "line");
  line.setAttribute("x1", "232");
  line.setAttribute("y1", "323");
  line.setAttribute(
    "x2",
    bottomSocket.offsetLeft + bottomSocket.clientWidth / 2
  );
  line.setAttribute("y2", bottomSocket.offsetTop + bottomSocket.clientHeight);
  line.setAttribute("stroke", "red");
  line.setAttribute("marker-start", "url(#arrowHead)");
  line.style["stroke-width"] = 4;
  if (!isLineShown) {
    line.style.display = "none";
  }
  svg.append(line);
}

window.addEventListener("DOMContentLoaded", drawLine);

bottomSocketSlider.addEventListener("input", (e) => {
  let { value } = e.target;
  bottomSocket.style.right = rightValue - Number(value) + "px";
  svg.innerHTML = `
  <marker
    id="arrowHead"
    viewBox="0 0 10 10"
    refX="5"
    refY="5"
    markerWidth="4"
    markerHeight="4"
    orient="auto-start-reverse"
    fill="red"
  >
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>
  `;
  drawLine();
});

topSocketSlider.addEventListener("input", (e) => {
  topSocket.style.opacity = e.target.value / 10;
});

showLineBox.addEventListener("click", (e) => {
  let line = document.getElementById("line");
  if (e.target.checked) {
    line.style.display = "block";
  } else {
    line.style.display = "none";
  }
});
