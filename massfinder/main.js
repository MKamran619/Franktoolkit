let dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}


;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}


dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}



let selected = false;

let canvas = document.getElementById("canvas");
console.log(canvas);
let ctx = canvas.getContext("2d");

let handleFiles = function(files){
    resetFields();
    console.log(files);
    let img = new Image;
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        selected = true;
        document.getElementById("ii").innerHTML = `Width x Height: ${img.width} x ${img.height}`;
    }
    img.src = URL.createObjectURL(files[0]);

};


let resetFields = function(){
    document.getElementById("cm").innerHTML = "";
    document.getElementById("ii").innerHTML = "";
};


let calculateCenter = function(){
    if(!selected){
        alert("please select a new image");
        return;
    }
    let [width,height] = [canvas.width,canvas.height];
    let imgdata = ctx.getImageData(0,0,width,height);
    let data = imgdata.data;
    let xsum = 0;
    let ysum = 0;
    let wsum = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let idx = (y*width+x)*4;
            //if white weight == 0 if non-white weight == 1
            let weight = data[idx+0]+data[idx+1]+data[idx+2] === 765 ? 0:1;
            xsum += x*weight;
            ysum += y*weight;
            wsum += weight;
        }
    }
    let cx = xsum/wsum;
    let cy = ysum/wsum;
    console.log(imgdata,cx,cy);

	//let wtLine = Math.floor(width/333);

    //drawing a red line from the point to the bottom of the image
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx,imgdata.height);
    ctx.strokeStyle = "#f00";
	//    ctx.lineWidth = wtLine;
    ctx.lineWidth = 3;
    ctx.stroke();


    //drawing the dot
    ctx.beginPath();
    ctx.arc(cx,cy,8,0,6.28);
    ctx.closePath();
    ctx.fillStyle = "#00f";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx,cy,6,0,6.28);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx,cy,4,0,6.28);
    ctx.closePath();
    ctx.fillStyle = "#f00";
    ctx.fill();

    cx = Math.floor(cx);
    cy = Math.floor(cy);

    document.getElementById("cm").innerHTML = `Center of mass: ${cx}, ${cy}<br> The center of mass is indicated with a colored dot.`;
    selected = false;
}
