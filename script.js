
console.log('hi')
 var dragging=false

var password='ridley'



const mousse_follow=document.getElementsByClassName('follow')[0]
const coord_x=document.getElementsByClassName('coord_x')[0]
const coord_y=document.getElementsByClassName('coord_y')[0]
const coord_x_selection=document.getElementsByClassName('coord_x_selection')[0]

const audio_player=document.getElementsByClassName('audio_player')[0]
const zoom_div=document.getElementsByClassName('zoom')[0]
const fenetre=document.getElementsByClassName('fenetre')[0]
const selection=document.getElementsByClassName('selection')[0]
const popup=document.getElementsByClassName('popup')[0]
const icon_list_html=document.getElementsByClassName('icon')
const icon_list=Array.prototype.slice.call( icon_list_html )
const bg=document.getElementsByClassName('icon')[0]
const terminal_input= document.getElementById('terminal_input')

var target_dragging=icon_list[0]

var dragging_popup=false

audio_player.volume=0

audio_player.onended = function() {
mousse_follow.style.opacity=0.4};


var mousse_x=0
var mousse_y=0


function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function check_colision(){

icon_list.forEach((item, i) => {

  if (isCollide(item.getClientRects()[0],selection.getClientRects()[0])){
    item.classList.add('selected')
  }else {
    item.classList.remove('selected')

  }
});
}


terminal_input.onfocus = (event) => {
  document.getElementsByClassName('cursor_text')[0].classList.add('cursor_text_focus')
};

terminal_input.onblur = (event) => {
  document.getElementsByClassName('cursor_text')[0].classList.remove('cursor_text_focus')
};

const password_input=document.getElementById('password_input')

password_input.onclick = (event) => {

  password_input.focus()
};




function acutalise_password(elem){
  const value=elem.value

  document.getElementsByClassName('cursor_text_password')[0].innerText=value

  if (value.length >= 6){
    if (value==password){
      console.log('bon mdp')
      document.getElementsByClassName('psw_result')[0].innerText='Good Password...'
      document.getElementsByClassName('psw_result')[0].classList.remove('anim_typing')
      document.getElementsByClassName('psw_result')[0].offsetWidth
      document.getElementsByClassName('psw_result')[0].classList.add('anim_typing')
      elem.value=''
      document.getElementsByClassName('cursor_text_password')[0].innerText=''

    }else{
      console.log('wrong msp')
      document.getElementsByClassName('psw_result')[0].innerText='Wrong Password...'
      document.getElementsByClassName('psw_result')[0].classList.remove('anim_typing')
      document.getElementsByClassName('psw_result')[0].offsetWidth
      document.getElementsByClassName('psw_result')[0].classList.add('anim_typing')
      elem.value=''
      document.getElementsByClassName('cursor_text_password')[0].innerText=''



    }
  }
}
function acutalise_command_line(value){
  document.getElementsByClassName('cursor_text')[0].innerText=value

}

function submit_terminal(event){
  document.getElementsByClassName('cursor_text')[0].innerText=terminal_input.value
  if (event.keyCode == 13) {

    event.preventDefault()

    const terminal_window=document.getElementById('terminal_window')
    terminal_window.getElementsByClassName('typing')[0].classList.remove('typing')

    let to_send=''
    let command=terminal_input.value
    terminal_input.value=''
    document.getElementsByClassName('cursor_text')[0].innerText=terminal_input.value

    if (command.indexOf('open')==0){

      const poseslash=command.indexOf("/");
      var file_to_open=command.slice(poseslash+1,command.length)
      command='open /'
    }

    switch (command.toLowerCase()) {
      case 'help':
        
        to_send=`<span class='command_style'>. ls    </span>   list files <br>
          <span class='command_style'>. open "/file"</span> open the chossen file</p>
          `
        break;
      case 'ls':
        to_send='<span>. /color <br>. /infos <br>. /hidden <br>. /terminal <br> . /secret</span></p>'
        break;
      case 'open /':
          try {

          open_popup(file_to_open)
          to_send='<span> .openning '+file_to_open+' ...</span></p>'

          }
          catch (error) {
            to_send='<span> . File  not found... use  <span class="command_style">ls</span></span></p>'

            
          }

          break;
          
      default:
        to_send='<span>. Command not found: use <span class="command_style">help</span></span></p>'
    }
    const line= "<p class='typing'> ¥-User12:  <span class='command_style'>-"+command+"</span></br>"+to_send

    terminal_window.innerHTML+=line
    terminal_window.scrollTop = terminal_window.scrollHeight;

  }

}



function draw_selecion(){
  check_colision()

    var width_selection=mousse_x-target[0]
    var height_selection=mousse_y-target[1]

    var left_move=0
    var top_move=0


    if (width_selection<0){
      width_selection=-width_selection
      left_move=width_selection-1
    }
    if (height_selection<0){
      height_selection=-height_selection
      top_move=height_selection
    }

    selection.style.width=width_selection-5+'px'
    selection.style.opacity=1
    selection.style.left=target[0]-left_move+'px'
    selection.style.top=target[1]-top_move+'px'
    coord_x_selection.innerText='w:'+width_selection+'-h:'+height_selection
    selection.style.height=height_selection-5+'px'

}

function move_drag(){

  const dragable_list=Array.prototype.slice.call(document.getElementsByClassName('selected'))


  dragable_list.forEach((item, i) => {

      const deplacement_x=mousse_x-target_dragging_pose[0]-fenetre.getClientRects()[0].x
      const newpose_x=initial_pose[i][0]+deplacement_x

      const deplacement_y=mousse_y-target_dragging_pose[1]
      const newpose_y=initial_pose[i][1]+deplacement_y

      item.style.left=newpose_x+'px'
      item.style.top=newpose_y+'px'



    });

}


function mouve_follow(){
  mousse_follow.style.left=mousse_x+'px'
  mousse_follow.style.top=mousse_y+'px'
  coord_x.innerText='X: '+mousse_x
  coord_y.innerText='Y: '+mousse_y

}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


document.addEventListener('mousemove', e => {
  if( audio_player.paused){
    audio_player.play()
    mousse_follow.style.opacity=1
    }else{
        audio_player.currentTime=0
          }
   mousse_x=e.clientX
   mousse_y=e.clientY

  mouve_follow()

  if (is_selecting  && dragging==false && dragging_popup==false){
     draw_selecion()
    }
  if (dragging){
    move_drag()
  }
  if (dragging_popup){
    move_drag_popup()
  }

})
  



var target=[0,0]
var is_selecting=false
var initial_pose=[]
target_dragging_pose=[]


document.getElementById('input').oninput = function() {
	var filter = 'hue-rotate(xdeg)'.replace('x', this.value);
	document.getElementsByClassName('body')[0].style.filter = filter;
}
function random_color(){
  const rnd_value=getRandomInt(360)
  document.getElementById('input').value=rnd_value
  var filter = 'hue-rotate(xdeg)'.replace('x', rnd_value);
	document.getElementsByClassName('body')[0].style.filter = filter;

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

var initial_drag_popup=[0,0]

function put_front(popup){
  document.getElementsByClassName('first_view')[0].classList.remove('first_view')
  popup.classList.add('first_view')

}
window.addEventListener('mousedown', event => {
  if (event.target.classList[0]=='header'){

    dragging_popup=true
    popup_target=event.target.parentNode
    initial_drag_popup=[mousse_x-popup_target.getClientRects()[0].x,mousse_y-popup_target.getClientRects()[0].y]

    put_front(popup_target)

  }
  if (event.target.classList[0]=='file'){
    file_clicked()

  }
  if (event.target.classList[0]=='fenetre'){
    target=[mousse_x,mousse_y]
    is_selecting=true
    check_colision()

    selection.style.left=mousse_x-4+'px'
    selection.style.top=mousse_y-4+'px'
  }
});


document.addEventListener('mouseup', event => {
is_selecting=false
selection.style.width='0px'
selection.style.opacity=0
coord_x_selection.innerText=''

selection.style.height='0px'

dragging=false
initial_pose=[]
dragging_popup=false


});
