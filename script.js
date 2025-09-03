let currentCamera = 'cam1a';
const officeImg = document.getElementById('office-img');
const cameraImg = document.getElementById('camera-img');
const jumpscareSound = document.getElementById('jumpscare-sound');
const cameraSound = document.getElementById('camera-sound');

function changeCamera(cam) {
  currentCamera = cam;
  cameraSound.play();

  switch(cam) {
    case 'cam1a':
      cameraImg.src = 'assets/cameras/cam1a_all.png';
      break;
    case 'cam1c':
      cameraImg.src = 'assets/cameras/cam1c_foxy.png';
      break;
    case 'cam2a':
      cameraImg.src = 'assets/cameras/cam2a_bonnie.png';

      // Simula Bonnie vindo atacar
      setTimeout(() => {
        doJumpscare();
      }, 2000);
      break;
  }
}

function toggleLight(side) {
  if (side === 'left') {
    officeImg.src = 'assets/office/office_bonnie_door.png';
  } else {
    officeImg.src = 'assets/office/office_chica_door.png';
  }

  // Volta ao normal depois de 2 segundos
  setTimeout(() => {
    officeImg.src = 'assets/office/office_empty.png';
  }, 2000);
}

function doJumpscare() {
  officeImg.src = 'assets/jumpscares/jumpscare_freddy1.png';
  jumpscareSound.play();

  setTimeout(() => {
    alert("GAME OVER! Freddy te pegou!");
    officeImg.src = 'assets/office/office_empty.png';
    cameraImg.src = 'assets/cameras/cam1a_all.png';
  }, 1500);
}
