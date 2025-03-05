document.addEventListener("DOMContentLoaded", function () {
    const songs = [
        { title: "Rain - 10mins", file: "songs/Rain.mp3", image: "images/Vegeta.png" },
        { title: "Fan - 10mins", file: "songs/Fan.mp3", image: "images/Thorfinn.png" },
        { title: "Ocean - 10mins", file: "songs/Ocean.mp3", image: "images/eren3.png" },
        { title: "White - 10mins", file: "songs/WhiteNoise.mp3", image: "images/Luffy.png" }
    ];

    let currentSongIndex = 0;
    let audioPlayer = document.getElementById("audio-player");
    let audioSource = document.getElementById("audio-source");
    let songTitle = document.getElementById("song-title");
    let songImage = document.getElementById("song-image-img");
    let playPauseButton = document.getElementById("play-pause");
    let progressBar = document.getElementById("progress-bar");
    let valueDisplay = document.getElementById("value-display");

    function updatePlayer() {
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.file;
        songImage.src = currentSong.image; 
        audioPlayer.load(); // Reload the audio source
    }

    // Load the first song on page load
    updatePlayer();

    // Play/Pause functionality
    playPauseButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.classList.add("playing");
        } else {
            audioPlayer.pause();
            playPauseButton.classList.remove("playing");
        }
    });

    // Skip forward functionality
    document.getElementById("skip-forward").addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
        audioPlayer.play();
    });

    // Skip backward functionality
    document.getElementById("skip-backward").addEventListener("click", function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
        audioPlayer.play();
    });

    // Update progress bar fill dynamically
    function updateProgressBar() {
        let progress = (progressBar.value / 100) * 100; 
        progressBar.style.background = `linear-gradient(to right, #54CEDC ${progress}%, #ddd ${progress}%)`;
    }

    // Update progress bar as the song plays
    audioPlayer.addEventListener("timeupdate", function () {
        let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        valueDisplay.textContent = Math.floor(audioPlayer.currentTime) + "s";
        updateProgressBar(); // Call function to update background color
    });

    // Seek functionality
    progressBar.addEventListener("input", function () {
        let newTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
        updateProgressBar(); // To update color when dragging the slider
    });

    // Background cloud effect
    const container = document.getElementById("background-container");
    const imageSrc = "images/cloudIcon.png";
    const numImages = 20;

    for (let i = 0; i < numImages; i++) {
        let img = document.createElement("img");
        img.src = imageSrc;
        img.classList.add("background-image");

        // Random position
        img.style.top = Math.random() * 100 + "vh";
        img.style.left = Math.random() * 100 + "vw";

        // Random size
        let size = Math.random() * 50 + 30; 
        img.style.width = size + "px";
        img.style.height = size + "px";

        container.appendChild(img);
    }
});
