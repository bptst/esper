
function close_popup(button){

    button.parentNode.parentNode.classList.remove('open')
}


function open_popup(href){
    const popup=document.getElementById(href)
    popup.classList.add('open')
    document.getElementsByClassName('first_view')[0].classList.remove('first_view')
    popup.classList.add('first_view')

    if (href=='terminal'){
        console.log('focus')
        window.setTimeout(() => terminal_input.focus(), 0);
    }

  
  }

function move_drag_popup(){

    const distance_x=document.getElementById('infos').getClientRects()[0].width-initial_drag_popup[0]
    popup_target.style.left=mousse_x-initial_drag_popup[0]-fenetre.getClientRects()[0].x+'px'
    popup_target.style.top=mousse_y-initial_drag_popup[1]+'px'

}
function put_front(popup){
    document.getElementsByClassName('first_view')[0].classList.remove('first_view')
    popup.classList.add('first_view')
  
}

setInterval(update_hour, 1000); 

function update_hour(){
  const date=new Date();
  const hour=date.getHours()
  let minute=date.getMinutes()
  if (minute<10){
    minute='0'+minute
  }
  document.getElementsByClassName('hour')[0].innerText=hour+':'+minute
  console.log(hour+':'+minute)
}

function file_clicked(){
    const icon=event.target.parentNode


     if (event.detail == 2) {
       const href=icon.dataset['href']
       open_popup(href)
     }

     const test=Array.prototype.slice.call(document.getElementsByClassName('selected'))

     icon.classList.add("selected")

     if (test.length==1){
       console.log('uno')
       target_dragging.classList.remove('selected')

   }

     const dragable_list=Array.prototype.slice.call(document.getElementsByClassName('selected'))
     dragable_list.forEach((item, i) => {
         
       initial_pose.push([item.getClientRects()[0].x,item.getClientRects()[0].y])
     })
     dragging=true
     

     target_dragging_pose=[mousse_x,mousse_y]


       target_dragging=icon

       console.log(initial_pose)




}

