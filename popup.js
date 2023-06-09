
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
