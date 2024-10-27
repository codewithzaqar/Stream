const screenVideo = document.getElementById('screenVideo');
const cameraVideo = document.getElementById('cameraVideo');
const toggleStreamButton = document.getElementById('toggleStreamButton');
const loadingOverlay = document.getElementById('loading');

let screenStream;  // To store the screen-sharing stream
let cameraStream;  // To store the webcam stream

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

    toggleStreamButton.textContent = 'Stop Sharing';
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
  toggleStreamButton.textContent = 'Start Sharing';
}

// Event listener for start/stop button
toggleStreamButton.addEventListener('click', () => {
  if (toggleStreamButton.textContent === 'Start Sharing') {
    startStreams();
  } else {
    stopStreams();
  }
});
