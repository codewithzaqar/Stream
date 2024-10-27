const videoElement = document.getElementById('liveVideo');
const toggleButton = document.getElementById('toggleButton');
const loadingOverlay = document.getElementById('loading');

let stream;  // To store the MediaStream

// Function to start the webcam stream
async function startStream() {
  loadingOverlay.style.display = 'block';  // Show loading overlay
  try {
    // Request webcam video
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;  // Set stream as video source
    toggleButton.textContent = 'Stop Streaming';
  } catch (error) {
    console.error('Error accessing webcam:', error);
    alert('Error: Could not access webcam. Please check your device and permissions.');
  } finally {
    loadingOverlay.style.display = 'none';  // Hide loading overlay
  }
}

// Function to stop the webcam stream
function stopStream() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());  // Stop all tracks
    videoElement.srcObject = null;  // Clear video source
    toggleButton.textContent = 'Start Streaming';
  }
}

// Toggle stream on button click
toggleButton.addEventListener('click', () => {
  if (toggleButton.textContent === 'Start Streaming') {
    startStream();
  } else {
    stopStream();
  }
});
