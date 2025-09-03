let currentCamera = 'cam1a';
const officeImg = document.getElementById('office-img');
const cameraImg = document.getElementById('camera-img');
const jumpscareSound = document.getElementById('jumpscare-sound');
const cameraSound = document.getElementById('camera-sound');
const cameraView = document.getElementById('camera-view');

function toggleCameraView() {
  cameraSound.play();
  cameraView.classList.toggle('hidden');
}

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
      setTimeout(() => {
        doJumpscare();
      }, 2000);
      break;
  }
}

function doJumpscare() {
  cameraView.classList.add('hidden'); // fecha câmera
  officeImg.src = 'assets/jumpscares/jumpscare_freddy1.png';
  jumpscareSound.play();

  setTimeout(() => {
    alert("GAME OVER! Freddy te pegou!");
    officeImg.src = 'assets/office/office_empty.png';
    cameraImg.src = 'assets/cameras/cam1a_all.png';
  }, 1500);
}
