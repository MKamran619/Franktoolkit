(function () {
  const loadBtns = document.querySelectorAll(
    '.load-controls input[type="file"]'
  );
  const displayBtn = document.querySelectorAll(".load-controls .loadBtn");
  const dragBtns = document.querySelectorAll(".drag-controls .dragBtn");
  const slideOpacity = document.querySelector("#Slide_Opacity");
  loadBtns.forEach((el, i) => {
    // handle file load event
    el.addEventListener("change", function (evt) {
      let file = evt.target.files[0]; // File object
      let video;
      let btn_container = el.closest(".btn-group");
      let btn = btn_container.querySelector(".loadBtn");
      // parent element to make image resizable
      let resizeBox = document.querySelector("#" + "resizeBox-" + (i + 1));
      // if resizeBox was found
      if (resizeBox) {
        // image exists
        video = resizeBox.querySelector("video");
      } else {
        // image doesn't exist
        video = document.createElement("video");
        resizeBox = document.createElement("div");
        resizeBox.id = "resizeBox-" + (i + 1);
        resizeBox.className = "resizeBox";
        video.className = "resizeBox_img";
        resizeBox.insertAdjacentElement("beforeend", video);
        // drag and drop event
        resizeBox.addEventListener("mousedown", MouseDownDrag);
      }
      // loading image
      video.controls = true;
      video.autoplay = true;
      video.src = URL.createObjectURL(file);
      video.load();
      //   reset button from load to Hide/show button
      btn_container.innerHTML = "";
      btn_container.insertAdjacentElement("afterbegin", btn);
      //   activate hide/show button
      btn.classList.remove("disabled");
      btn.textContent = "Hide";
      // add image to page
      document
        .querySelector(".app .main")
        .insertAdjacentElement("beforeend", resizeBox);
    });
  });
  //  hide/show button event
  displayBtn.forEach((el, i) => {
    el.addEventListener("click", function () {
      // get image of the current button
      let video = document.querySelector("#resizeBox-" + (i + 1));
      // if image is found
      if (video) {
        //   if image is not hidden
        if (!video.classList.contains("hide")) {
          //  image is visible
          video.classList.add("hide");
          el.textContent = "Show Video " + (i + 1);
        } else {
          // image is hidden
          video.classList.remove("hide");
          el.textContent = "Hide";
        }
      }
    });
  });
  //   drag button event
  dragBtns.forEach((el, i) => {
    el.addEventListener("click", function () {
      // get image of the current button
      let video = document.querySelector("#resizeBox-" + (i + 1));
      //   get active images
      let ActiveElements = document.querySelectorAll(".resizeBox.active");
      //   if image is found and (no active images or this image is active)
      if (
        video &&
        (ActiveElements.length === 0 || video.classList.contains("active"))
      ) {
        //   toggle active image on/off
        if (!video.classList.contains("active")) {
          // image is on
          video.classList.add("active");
          el.textContent = "Done";
          //   activate drag mode
          video.setAttribute("data-drag", "1");
          slideOpacity.closest(".slidecontainer").classList.remove("hide");
        } else {
          // image is off
          video.classList.remove("active");
          el.textContent = "Drag Video " + (i + 1);
          //   disable drag mode
          video.setAttribute("data-drag", "");
          slideOpacity.closest(".slidecontainer").classList.add("hide");
        }
      }
    });
  });
  //   handle opacity event
  slideOpacity.addEventListener("change", function (e) {
    //   get current active image
    let video = document.querySelector(".resizeBox.active");
    // if image is found
    if (video) {
      video.style.opacity = this.value / 100;
    }
  });
  // handle drag n drop event
  function MouseDownDrag(event) {
    // (1) start the process
    let dragTarget = this;
    let draggable = dragTarget.getAttribute("data-drag");
    // if draggable is off then stop
    if (!draggable) return false;

    // else continue
    // set initial shift of the element relative to the pointer
    let shiftX = event.clientX - dragTarget.getBoundingClientRect().left;
    let shiftY = event.clientY - dragTarget.getBoundingClientRect().top;

    // (2) prepare to moving: make absolute and on top by z-index
    dragTarget.style.position = "absolute";

    // ...and put that absolutely positioned element under the pointer

    moveAt(event.pageX, event.pageY);

    // centers the element at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      dragTarget.style.left = pageX - shiftX + "px";
      dragTarget.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // (3) move the element on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (4) drop the element, remove unneeded handlers
    dragTarget.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      dragTarget.onmouseup = null;
    };
    // the browser has its own Drag’n’Drop for images and some other elements that runs
    //  automatically and conflicts with ours
    // To disable it:
    dragTarget.ondragstart = function () {
      return false;
    };
  }
})();
