/* - couldnt get this to work - wanted music to play semlessly across pages

//Function to play the audio if it's not already playing
function playAudio() {
    var audio = document.getElementById('dramatic_music');
    if (audio.paused) {
        audio.play();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //Check if audio was playing before navigating from the previous page
    var audioWasPlaying = sessionStorage.getItem('audioPlaying');
    if (audioWasPlaying === 'true') {
        playAudio(); // Resume audio playback
    }

    //Add event listener to play the audio when DOM content is loaded
    playAudio();

    //Store the audio playback state when navigating away from the page
    window.addEventListener('beforeunload', function() {
        var audio = document.getElementById('dramatic_music');
        if (!audio.paused) {
            sessionStorage.setItem('audioPlaying', 'true');
        } else {
            sessionStorage.setItem('audioPlaying', 'false');
        }
    });
});

*/