// run fucntion when page loaded
(function() {
  // get video player
  let video = document.getElementById("my_video");
  // canvas to draw frame
  let thecanvas;
  // load button
  let loadBtn = document.getElementById("videoFile-1");
  //frame number 
  let frameNumLabel = document.getElementById("frame-no");
  //video name
  let videoNameLabel = document.getElementById("file-name");
  //frame rate
  let frameRateLabel = document.getElementById("frame-rate");
  // handle load file event
  loadBtn.addEventListener("change", function(evt) {
    let file = evt.target.files[0]; // File object
    // set player to new video
    video.querySelector("source").src = URL.createObjectURL(file);
    // load video
    video.load();
    //display video name
    videoNameLabel.innerHTML = 'Filename : '+ file.name;
  });
  // disable default video behavior
  video.addEventListener(
    "focus",
    function() {
      this.blur();
    },
    false
  );
  video.onplay = function(){
    let currentFrameNo = 0;
    let previousFrameNo = 0;
    var t = setInterval(() => {
      frameNumLabel.innerHTML = `Frame # ${parseInt(Math.ceil(video.currentTime*30))}`;
    }, 10);
  };
  video.onended = function(){
    clearInterval(t);
  };
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
  document.getElementById("captr").addEventListener(
    "click",
    function() {
      draw(video, thecanvas, false);
    },
    false
  );
  //handle capture and save frame event
  document.getElementById("captr-save").addEventListener(
    "click",
    function() {
      draw(video, thecanvas, true);

    },
    false
  );
  // draw current video frame on canvas
  function draw(video, thecanvas, sav) {
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
    if(video.videoHeight < video.videoWidth)
    {
      thecanvas.width = "1280";
      thecanvas.height = "720";
    }
    else
    {
      thecanvas.width = "720";
      thecanvas.height = "1280";
    }
    // caption frame number
    caption.innerHTML = `Frame # ${parseInt(Math.ceil(video.currentTime * 30))}`;

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
    context.fillStyle = "grey";
    context.fillRect(10,10, 150,50);
    context.fillStyle = "white";
    context.font = "17px Arial";
    context.fillText(caption.innerHTML, 15,40);
    // display the frame
    document
      .querySelector(".frames-grid")
      .insertAdjacentElement("afterbegin", frameBox);
    if(sav)
    {
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', ""+caption.innerHTML+".jpg");
      
      let dataURL = thecanvas.toDataURL('image/png');
      let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    }
  }
})();
