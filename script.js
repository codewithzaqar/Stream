const videoElement = document.getElementById('video');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let stream;

startButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        videoElement.srcObject = stream;
        startButton.disabled = true;
        stopButton.disabled = false;
    } catch (error) {
        console.error(`Error accessing webcam:`, error);
        alert(`Could not access your webcam.`);
    }
});

stopButton.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
});