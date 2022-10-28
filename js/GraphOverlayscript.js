// run fucntion when page loaded
(function() {
  // get load btns
  const loadBtns = document.querySelectorAll('.loadBtns input[type="file"]');
  let dragTarget;
  let draggable=false;
  loadBtns.forEach((el, i) => {
    // handle file load event
    el.addEventListener("change", function(evt) {
      let file = evt.target.files[0]; // File object
      let image;
      // parent element to make image resizable
      let resizeBox = document.querySelector("#" + "resizeBox-" + (i + 1));
      // if resizeBox was found
      if (resizeBox) {
        // image exists
        image = resizeBox.querySelector("img");
      } else {
        // image doesn't exist
        image = document.createElement("img");
        resizeBox = document.createElement("div");
        resizeBox.id = "resizeBox-" + (i + 1);
        resizeBox.insertAdjacentElement("beforeend", image);
        // drag and drop event 
        resizeBox.addEventListener("mousedown", MouseDownDrag);
        // for the resize event to work you must
        // toggle off the drag event by double click on element
        resizeBox.addEventListener("dblclick",function(){
          draggable=!draggable;
        })
      }
      // loading image
      image.src = file.name;
      // check if element has file-1 id
      if (el.id === "file-1") {
        // if so image is background graph
        resizeBox.classList.add("backGraph");
      } else {
        // if not image is foreground graph
        resizeBox.classList.add("foreGraph");
      }
      // add image to page 
      document
        .querySelector(".app .main")
        .insertAdjacentElement("beforeend", resizeBox);
    });
  });
  // handle drag n drop event
  function MouseDownDrag(event) {
    // (1) start the process
    dragTarget = this;

    // if draggable is off or target doesn't foreGraph class then stop
    if(!draggable || !dragTarget.classList.contains("foreGraph")) return false;

    // else continue
    // set initial shift of the element relative to the pointer
    let shiftX = event.clientX - dragTarget.getBoundingClientRect().left;
    let shiftY = event.clientY - dragTarget.getBoundingClientRect().top;

    // (2) prepare to moving: make absolute and on top by z-index
    dragTarget.style.position = "absolute";
    dragTarget.style.zIndex = 1000;
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(dragTarget);
    // ...and put that absolutely positioned ball under the pointer

    moveAt(event.pageX, event.pageY);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      dragTarget.style.left = pageX - shiftX + "px";
      dragTarget.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // (3) move the ball on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (4) drop the ball, remove unneeded handlers
    dragTarget.onmouseup = function() {
      document.removeEventListener("mousemove", onMouseMove);
      dragTarget.onmouseup = null;
      draggable=false;
    };
    // he browser has its own Drag’n’Drop for images and some other elements that runs
    //  automatically and conflicts with ours
    // To disable it:
    dragTarget.ondragstart = function() {
      return false;
    };
  }
})();
