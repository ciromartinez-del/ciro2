// Lista de canciones (puedes reemplazar los enlaces por tus propios archivos .mp3)
const playlist = [
  {
    title: "CYBER SYMPHONY",
    artist: "NEON ARCADE",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "RETRO RUNNER",
    artist: "SYNTH WAVE 84",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "MIDNIGHT DRIVE",
    artist: "CYBERDREAM",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;

// Elementos del DOM
const audio = document.getElementById('audio-player');
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const totalDuration = document.getElementById('total-duration');
const timeDisplay = document.getElementById('time-display');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume');

const reelLeft = document.getElementById('reel-left');
const reelRight = document.getElementById('reel-right');

// Cargar canción actual
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  songTitle.textContent = track.title;
  artistName.textContent = track.artist;
  progressBar.value = 0;
}

// Formatear segundos a MM:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Reproducir o Pausar
function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  audio.play();
  isPlaying = true;
  reelLeft.classList.add('spinning');
  reelRight.classList.add('spinning');
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  reelLeft.classList.remove('spinning');
  reelRight.classList.remove('spinning');
}

function stopTrack() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  reelLeft.classList.remove('spinning');
  reelRight.classList.remove('spinning');
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) playTrack();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) playTrack();
}

// Event Listeners
btnPlay.addEventListener('click', togglePlay);
btnStop.addEventListener('click', stopTrack);
btnPrev.addEventListener('click', prevTrack);
btnNext.addEventListener('click', nextTrack);

// Actualizar barra de progreso y tiempos
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    
    totalDuration.textContent = total;
    timeDisplay.textContent = `${current} / ${total}`;
  }
});

// Adelantar/Retroceder desde la barra
progressBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// Ajustar volumen
volumeControl.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Cargar primera canción al iniciar
loadTrack(currentTrackIndex);
