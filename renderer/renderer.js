document.addEventListener('DOMContentLoaded', () => {
    console.log('Renderer process loaded!');

    // Add event listeners for each button
    if (document.getElementById('happy')) {
        document.getElementById('happy').addEventListener('click', () => {
            window.electron.sendMood('happy');  // Send message to main process
        });
    }

    if (document.getElementById('neutral')) {
        document.getElementById('neutral').addEventListener('click', () => {
            window.electron.sendMood('neutral');  // Send message to main process
        });
    }

    if (document.getElementById('sad')) {
        document.getElementById('sad').addEventListener('click', () => {
            window.electron.sendMood('sad');  // Send message to main process
        });
    }

    // Listen for the mood response from the main process
    window.electron.onMoodResponse((event, mood) => {
        const moodResponse = document.getElementById('moodResponse');
        moodResponse.innerHTML = `<p>Your current mood is: ${mood}</p>`;
    });
});