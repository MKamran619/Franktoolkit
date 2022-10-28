/***************script to show or hide images ****************/
// run fucntion when page loaded
(function(){
    let buttons = document.getElementsByClassName('btn') ;
    for(let i = 0; i < buttons.length; i++ ){
        buttons[i].onclick = function(){
            let num = buttons[i].id[buttons[i].id.length-1]
            let image = document.getElementsByClassName(""+ this.getAttribute('data-class') +"")[0];
            if(image.style.display == 'block'){
                // $(`#${buttons[i]}`)
                // $(`#${event.target.id}`).html('hide');
                buttons[i].innerHTML = $(`#imgid${num}`).attr('src').split(".")[0]
                image.style.display = 'none';
            }else{
                buttons[i].innerHTML = "*HIDE* "+ $(`#imgid${num}`).attr('src').split(".")[0]
                image.style.display = 'block';
            }
        }
    }
}());
$( document ).ready(function() {
    $(".inputFile").change(function(event){
        let num = event.target.id[event.target.id.length-1]
        $(`#${event.target.id}`).html(event.target.files[0].name.split(".")[0]);
        $(`#imgid${num}`).attr("src",event.target.files[0].name)
    });
});