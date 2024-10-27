const videoElement = document.getElementById('liveVideo');
const toggleStreamButton = document.getElementById('toggleStreamButton');
const switchSourceButton = document.getElementById('switchSourceButton');
const loadingOverlay = document.getElementById('loading');

let stream;           // To store the MediaStream
let isScreen = false; // Toggle between screen and webcam

// Function to start webcam or screen sharing based on current mode
async function startStream() {
  loadingOverlay.style.display = 'block';
  try {
    // If isScreen is true, use getDisplayMedia for screen sharing; otherwise, use getUserMedia for webcam
    if (isScreen) {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      switchSourceButton.textContent = 'Switch to Camera';
    } else {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user'  // Use the front camera by default
        }
      });
      switchSourceButton.textContent = 'Switch to Screen';
    }

    videoElement.srcObject = stream;
    toggleStreamButton.textContent = 'Stop Streaming';

  } catch (error) {
    console.error('Error accessing media:', error);
    alert('Error: Could not access media. Please check permissions.');
  } finally {
    loadingOverlay.style.display = 'none';
  }
}

// Function to stop the current stream
function stopStream() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop()); // Stop all tracks
    videoElement.srcObject = null;
    toggleStreamButton.textContent = 'Start Streaming';
  }
}

// Event listener for the start/stop streaming button
toggleStreamButton.addEventListener('click', () => {
  if (toggleStreamButton.textContent === 'Start Streaming') {
    startStream();
  } else {
    stopStream();
  }
});

// Event listener for the switch source button
switchSourceButton.addEventListener('click', () => {
  isScreen = !isScreen;  // Toggle the isScreen flag
  if (stream) {
    stopStream();  // Stop the current stream
    startStream(); // Start the new stream with the selected source
  }
});
