document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".like-btn");
    const commentBtn = document.querySelector(".comment-btn");

    // Enable autoplay with sound after user interaction
    document.body.addEventListener("click", () => {
        if (video.paused) {
            video.play().then(() => {
                video.muted = false; // Unmute video after play starts
            }).catch(error => console.error("Autoplay failed:", error));
        }
    });

    likeBtn.addEventListener("click", () => {
        let likes = parseInt(likeBtn.textContent.match(/\d+/)[0]); // Extract number
        likeBtn.textContent = `❤️ ${likes + 1}`; // Increment and update
    });

    commentBtn.addEventListener("click", () => {
        alert("Comments feature coming soon!");
    });
});
