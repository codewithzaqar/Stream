const videoElement = document.getElementById('liveVideo');
const toggleStreamButton = document.getElementById('toggleStreamButton');
const switchCameraButton = document.getElementById('switchCameraButton');
const loadingOverlay = document.getElementById('loading');

let stream;  // To hold the MediaStream
let isFrontCamera = true;  // To toggle between front and rear cameras

// Function to start the webcam stream with specified camera direction
async function startStream() {
  loadingOverlay.style.display = 'block';
  try {
    // Set constraints to request the front or rear camera
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: isFrontCamera ? 'user' : 'environment'
      }
    });
    videoElement.srcObject = stream;
    toggleStreamButton.textContent = 'Stop Streaming';
  } catch (error) {
    console.error('Error accessing webcam:', error);
    alert('Could not access the webcam. Please check permissions.');
  } finally {
    loadingOverlay.style.display = 'none';
  }
}

// Function to stop the webcam stream
function stopStream() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());  // Stop all tracks
    videoElement.srcObject = null;  // Clear video source
    toggleStreamButton.textContent = 'Start Streaming';
  }
}

// Toggle stream on button click
toggleStreamButton.addEventListener('click', () => {
  if (toggleStreamButton.textContent === 'Start Streaming') {
    startStream();
  } else {
    stopStream();
  }
});

// Switch between front and rear camera
switchCameraButton.addEventListener('click', () => {
  isFrontCamera = !isFrontCamera;  // Toggle camera direction
  if (stream) {
    stopStream();  // Stop the current stream
    startStream();  // Start with the new camera direction
  }
});
