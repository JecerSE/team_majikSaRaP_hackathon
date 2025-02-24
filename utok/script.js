document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".like-btn");
    const commentBtn = document.querySelector(".comment-btn");

    // Create play/pause indicator 
    const indicator = document.createElement("image");
    indicator.classList.add("play-indicator");
    document.body.appendChild(indicator);

    let firstInteraction = true; // Track first user interaction

    // Ensure video has sound if it starts playing automatically
    const checkPlayState = setInterval(() => {
        if (!video.paused) {
            video.muted = false;
            clearInterval(checkPlayState);
        }
    }, 500);

    // Function to show and fade out indicator
    function showIndicator(icon) {
        indicator.innerHTML = icon;
        indicator.style.opacity = "1";
        indicator.style.transform = "scale(1)";

        setTimeout(() => {
            indicator.style.opacity = "0";
            indicator.style.transform = "scale(1.5)";
        }, 800); // Fades out after 8 seconds
    }

    // Toggle play/pause on video click
    video.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent body click from triggering simultaneously

        if (firstInteraction) {
            video.muted = false; // Unmute on first interaction
            firstInteraction = false;
        }

        if (video.paused) {
            video.play();
            showIndicator("/assets/icons/play.png"); // Show play image placeholder zzz
        } else {
            video.pause();
            showIndicator("/assets/icons/pause.png"); // Show pause.png placeholder
        }//added the images i had
    });

    // Ensure video plays with sound after first user interaction
    document.body.addEventListener("click", () => {
        if (firstInteraction) {
            video.play().then(() => {
                video.muted = false; // Unmute video after first click i think
                firstInteraction = false;
            }).catch(error => console.error("Autoplay failed:", error));
        }
    }, { once: true }); // Runs only once

    // Like button functionality
    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent video from toggling play/pause
        let likes = parseInt(likeBtn.textContent.match(/\d+/)[0]); // Extract number
        likeBtn.textContent = `❤️ ${likes + 1}`; // Increment and update
    });

    // Comment button functionality
    commentBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent video from toggling play/pause
        alert("Comments feature coming soon!");
    });
});
