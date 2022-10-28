// run fucntion when page loaded
(function() {
  // get video player
  let video = document.getElementById("my_video");
  // canvas to draw frame
  let thecanvas;
  // load button
  let loadBtn = document.getElementById("videoFile-1");
  // handle load file event
  loadBtn.addEventListener("change", function(evt) {
    let file = evt.target.files[0]; // File object
    // set player to new video
    video.querySelector("source").src = file.name;
    // load video
    video.load();
  });
  // disable default video behavior
  video.addEventListener(
    "focus",
    function() {
      this.blur();
    },
    false
  );

  window.addEventListener(
    "keydown",
    function(e) {
      if (e.key == "ArrowRight") {
        video.currentTime += 1 / 30;
      }else if (e.key == "ArrowLeft") {
        video.currentTime -= 1 / 30;
      }
    },
    false
  );
  // handle capture frame event
  document.querySelector(".CaptureBtn").addEventListener(
    "click",
    function() {
      draw(video, thecanvas);
    },
    false
  );
  // draw current video frame on canvas
  function draw(video, thecanvas) {
    // create new can canvas
    thecanvas = document.createElement("canvas");
    // framebox div
    let frameBox = document.createElement("div");
    // caption heading
    let caption = document.createElement("h2");
    caption.className = "frame-caption";
    frameBox.className = "frame-box";
    // add to frame box
    frameBox.append(caption);
    frameBox.append(thecanvas);
    // set picture resolution 720p
    thecanvas.width = "1280";
    thecanvas.height = "720";
    // caption frame number
    caption.innerHTML = `Frame ${parseInt(Math.ceil(video.currentTime * 30))}`;

    // handle delete frame event
    frameBox.addEventListener("dblclick", function() {
      // remove the double clicked frame
      this.remove();
    });
    // get the canvas context for drawing
    let context = thecanvas.getContext("2d");
    // give canvas a class for css
    thecanvas.className = "frame";
    // draw the video contents into the canvas x, y, width, height
    context.drawImage(video, 0, 0, thecanvas.width, thecanvas.height);
    // display the frame
    document
      .querySelector(".frames-grid")
      .insertAdjacentElement("afterbegin", frameBox);
  }
})();
