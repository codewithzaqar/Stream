const screenVideo = document.getElementById('screenVideo');
const cameraVideo = document.getElementById('cameraVideo');
const toggleStreamButton = document.getElementById('toggleStreamButton');
const toggleCameraButton = document.getElementById('toggleCameraButton');
const loadingOverlay = document.getElementById('loading');

let screenStream;  // To store the screen-sharing stream
let cameraStream;  // To store the webcam stream
let isCameraOn = false; // To track the camera state

// Function to start both screen sharing and webcam streams
async function startStreams() {
  loadingOverlay.style.display = 'block';
  try {
    // Request screen-sharing stream
    screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    screenVideo.srcObject = screenStream;

    // Request webcam stream
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'  // Use the front camera by default
      }
    });
    cameraVideo.srcObject = cameraStream;
    isCameraOn = true; // Set camera state to on
    toggleCameraButton.textContent = 'Turn Camera Off'; // Update button text

    toggleCameraButton.disabled = false; // Enable camera toggle button
    toggleStreamButton.textContent = 'Stop Sharing'; // Update button text
  } catch (error) {
    console.error('Error accessing media:', error);
    alert('Could not access screen or webcam. Please check permissions.');
  } finally {
    loadingOverlay.style.display = 'none';
  }
}

// Function to stop both screen-sharing and webcam streams
function stopStreams() {
  // Stop all tracks in both streams
  if (screenStream) {
    screenStream.getTracks().forEach(track => track.stop());
    screenVideo.srcObject = null;
  }
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraVideo.srcObject = null;
  }
  isCameraOn = false; // Set camera state to off
  toggleCameraButton.disabled = true; // Disable camera toggle button
  toggleCameraButton.textContent = 'Turn Camera On'; // Update button text
  toggleStreamButton.textContent = 'Start Sharing'; // Update button text
}

// Function to toggle the webcam on and off
function toggleCamera() {
  if (isCameraOn) {
    // If camera is currently on, stop it
    cameraStream.getTracks().forEach(track => track.stop());
    cameraVideo.srcObject = null;
    isCameraOn = false;
    toggleCameraButton.textContent = 'Turn Camera On'; // Update button text
  } else {
    // If camera is currently off, restart it
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'  // Use the front camera by default
      }
    }).then(stream => {
      cameraStream = stream;
      cameraVideo.srcObject = cameraStream;
      isCameraOn = true;
      toggleCameraButton.textContent = 'Turn Camera Off'; // Update button text
    }).catch(error => {
      console.error('Error accessing camera:', error);
      alert('Could not access the webcam. Please check permissions.');
    });
  }
}

// Event listener for start/stop button
toggleStreamButton.addEventListener('click', () => {
  if (toggleStreamButton.textContent === 'Start Sharing') {
    startStreams();
  } else {
    stopStreams();
  }
});

// Event listener for camera toggle button
toggleCameraButton.addEventListener('click', toggleCamera);
