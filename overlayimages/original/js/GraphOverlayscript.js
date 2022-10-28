// run fucntion when page loaded
function myFunction(){
  console.log(12);
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
        resizeBox.addEventListener('mousemove', Rotate)
        // for the resize event to work you must
        // toggle off the drag event by double click on element
        resizeBox.addEventListener("dblclick",function(){
          draggable=!draggable;
        })
      }
      // loading image
      image.src =  URL.createObjectURL(file);

      
      
      // check if element has file-1 id
      if (el.id === "file-1") {
        // if so image is background graph
        resizeBox.classList.add("backGraph");
      } else {
        // if not image is foreground graph
        resizeBox.classList.add("foreGraph");

        let slider = document.createElement('input');
        let label1 = document.createElement('label');
        label1.innerHTML="--------";
        label1.setAttribute('for','opacity');

        slider.setAttribute('type','range');
        slider.setAttribute('min',0);
        slider.setAttribute('max',100);
        slider.setAttribute('id','opacity');
        slider.setAttribute('value','100');
        slider.setAttribute('class','slider');
        slider.setAttribute('orient','vertical');
        slider.style.bottom='10px';
        slider.oninput = function() {
          image.style.opacity = (this.value/100).toString();
          console.log((this.value/100).toString());
        }
        let sliderOpacity = document.createElement('input');
        sliderOpacity.setAttribute('type','range');
        sliderOpacity.setAttribute('min',0);
        sliderOpacity.setAttribute('max',360);
        sliderOpacity.setAttribute('id','rotate');
        sliderOpacity.setAttribute('value','0');
        sliderOpacity.setAttribute('class','slider');
        
        sliderOpacity.style.bottom='10px';
        sliderOpacity.oninput = function() {
          resizeBox.style.transform  = 'rotate('+this.value+'deg)'; 
          console.log('rotate('+this.value+')');
        }
        
        document.getElementsByClassName('header')[0].insertAdjacentElement('beforeend',label1);
        document.getElementsByClassName('header')[0].insertAdjacentElement('beforeend',slider);
        document.getElementsByClassName('header')[0].insertAdjacentElement('beforeend',sliderOpacity);

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
  function Rotate(evt){

    if(evt.shiftKey){
    var img = $('#resizeBox-2');
    var offset = img.offset();
     
    var center_x = (offset.left) + (img.width()/2);
    var center_y = (offset.top) + (img.height()/2);
    var mouse_x = evt.pageX; var mouse_y = evt.pageY;
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * -1) + 90; 
    img.css('-moz-transform', 'rotate('+degree+'deg)');
    img.css('-webkit-transform', 'rotate('+degree+'deg)');
    img.css('-o-transform', 'rotate('+degree+'deg)');
    img.css('-ms-transform', 'rotate('+degree+'deg)');
  }
}
};