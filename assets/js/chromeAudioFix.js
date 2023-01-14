//fix to allow playback in chrome browser
function resetAudio(audio) {
    audio.muted = true;
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
  }