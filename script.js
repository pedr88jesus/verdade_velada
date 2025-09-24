// ELEMENTOS
const cameraButton = document.getElementById("camera-button");
const cameraOverlay = document.getElementById("camera-overlay");
const exitCamera = document.getElementById("exit-camera");
const cameraControls = document.getElementById("camera-controls");
const cameraImage = document.getElementById("camera-image");
const clockEl = document.getElementById("clock");
const batteryEl = document.getElementById("battery");

let battery = 100;
let hour = 12;
let am = true;

// FRAMES DAS 14 CÂMERAS
const cameras = {
  cam1A: ['stage_empty','stage_all_looking','stage_bonnie_exit','stage_chica_exit','stage_freddy','stage_empty_final'],
  cam1B: ['dining_empty','dining_bonnie_far','dining_bonnie_mid','dining_bonnie_close','dining_chica_mid','dining_chica_close'],
  cam1C: ['piratecove_empty','piratecove_foxy_peek','piratecove_foxy_attack'],
  cam2A: ['westhall_empty','westhall_freddy_far','westhall_chica_far','westhall_chica_close'],
  cam2B: ['corner_empty','corner_bonnie_mid','corner_bonnie_close'],
  cam3: ['backstage_empty','backstage_heads','backstage_bonnie_enter','backstage_bonnie_close','backstage_freddy_broken'],
  cam4A: ['easthall_empty','easthall_freddy_far','easthall_chica_far','easthall_chica_close'],
  cam4B: ['corner_empty','corner_freddy_close','corner_chica_far','corner_chica_attack'],
  cam5: ['backstage_empty','backstage_heads','backstage_bonnie_enter','backstage_bonnie_close','backstage_freddy_broken'],
  cam6: ['kitchen_empty','kitchen_chica_far','kitchen_chica_close'],
  cam7: ['restroom_empty','restroom_freddy','restroom_chica_far','restroom_chica_close'],
  cam8: ['parts_empty','parts_freddy_far','parts_bonnie_far','parts_chica_far'],
  cam9: ['showstage_side_empty','showstage_side_bonnie','showstage_side_chica'],
  cam10: ['hallsouth_empty','hallsouth_freddy_far','hallsouth_chica_far']
};

// ANIMATRONICS
const animatronics = {
  freddy: { path: ['cam4A','cam4B','cam2A','office'], current:0 },
  chica:  { path: ['cam7','cam4A','cam6','office'], current:0 },
  bonnie: { path: ['cam1B','cam2B','cam3','office'], current:0 },
  foxy: { path: ['cam1C','office'], current:0 }
};

// ABRIR/FECHAR CÂMERAS
cameraButton.addEventListener("click", ()=>{
  cameraOverlay.classList.remove("hidden");
  loadCameraControls();
});
exitCamera.addEventListener("click", ()=>cameraOverlay.classList.add("hidden"));

// CARREGAR CONTROLES DAS CÂMERAS
function loadCameraControls(){
  cameraControls.innerHTML='';
  for(let cam in cameras){
    cameras[cam].forEach(frame=>{
      const btn=document.createElement('button');
      btn.textContent=`${cam} - ${frame}`;
      btn.onclick=()=>setCamera(cam, frame);
      cameraControls.appendChild(btn);
    });
  }
}

// TROCAR FRAME
function setCamera(cam, frame){
  cameraImage.src=`assets/cameras/${cam}/${frame}.png`;
  new Audio('assets/sounds/camera_switch.mp3').play();
  battery = Math.max(0, battery-2);
  batteryEl.textContent=`Bateria: ${battery}%`;
}

// RELÓGIO E BATERIA
setInterval(()=>{
  hour++;
  if(hour>12){ hour=1; am=!am; }
  clockEl.textContent=`${hour}${am?'AM':'PM'}`;
  batteryEl.textContent=`Bateria: ${battery}%`;

  if(battery===0) showEnding(false);
  if(hour===6 && am) showEnding(true);
},60000);

// MOVIMENTO AUTOMÁTICO DOS ANIMATRONICS
function moveAnimatronics(){
  for(let name in animatronics){
    const anim = animatronics[name];
    const cam = anim.path[anim.current];
    if(cam==='office'){
      jumpscare(name);
      anim.current=0;
    } else {
      setCamera(cam, 0);
      anim.current++;
    }
  }
}
setInterval(moveAnimatronics,15000);

// JUMPSCARE
function jumpscare(animatronic){
  const overlay=document.createElement("div");
  overlay.id="jumpscare-overlay";
  overlay.style=`position:fixed; top:0; left:0; width:100%; height:100%; background:black; display:flex; justify-content:center; align-items:center; z-index:100;`;
  const video=document.createElement("video");
  video.src=`assets/jumpscares/${animatronic}.mp4`;
  video.autoplay=true;
  video.onended=()=>overlay.remove();
  overlay.appendChild(video);
  document.body.appendChild(overlay);
  new Audio('assets/sounds/jumpscare.mp3').play();
}

// VÍDEO FINAL
function showEnding(win=true){
  const overlay=document.createElement("div");
  overlay.id="ending-overlay";
  overlay.style=`position:fixed; top:0; left:0; width:100%; height:100%; background:black; display:flex; justify-content:center; align-items:center; z-index:100;`;
  const video=document.createElement("video");
  video.src=`assets/endings/${win?'win':'lose'}.mp4`;
  video.autoplay=true;
  video.onended=()=>location.reload();
  overlay.appendChild(video);
  document.body.appendChild(overlay);
}
