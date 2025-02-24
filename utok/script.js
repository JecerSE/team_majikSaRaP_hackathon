document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".like-btn");
    const commentBtn = document.querySelector(".comment-btn");

    // Create play/pause indicator
    const indicator = document.createElement("div");
    indicator.classList.add("play-indicator");
    document.body.appendChild(indicator);

    // Function to show and fade out indicator
    function showIndicator(icon) {
        indicator.innerHTML = icon;
        indicator.style.opacity = "1";
        indicator.style.transform = "scale(1)";

        setTimeout(() => {
            indicator.style.opacity = "0";
            indicator.style.transform = "scale(1.5)";
        }, 800); // Fades out after 800ms
    }

    // Toggle play/pause on video click
    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            showIndicator("⏯️"); // Show play icon
        } else {
            video.pause();
            showIndicator("⏸️"); // Show pause icon
        }
    });

    // Enable autoplay with sound after user interaction
    document.body.addEventListener("click", () => {
        if (video.paused) {
            video.play().then(() => {
                video.muted = false; // Unmute video after play starts
            }).catch(error => console.error("Autoplay failed:", error));
        }
    });

    // Like button functionality
    likeBtn.addEventListener("click", () => {
        let likes = parseInt(likeBtn.textContent.match(/\d+/)[0]); // Extract number
        likeBtn.textContent = `❤️ ${likes + 1}`; // Increment and update
    });

    // Comment button functionality
    commentBtn.addEventListener("click", () => {
        alert("Comments feature coming soon!");
    });
});
