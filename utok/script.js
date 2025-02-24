document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".like-btn");
    const commentBtn = document.querySelector(".comment-btn");

    // .img stupid AHAHHAHAHHAHAHAHAHA
    const indicator = document.createElement("img"); 
    indicator.classList.add("play-indicator");

    // this should be cleaner
    indicator.style.position = "absolute";
    indicator.style.top = "50%";
    indicator.style.left = "50%";
    indicator.style.transform = "translate(-50%, -50%)";
    indicator.style.width = "80px"; // Adjust as needed
    indicator.style.opacity = "0"; // Start hidden
    indicator.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    document.body.appendChild(indicator);

    let firstInteraction = true; // Track first user interaction

    // Ensure video has sound if it starts playing automatically
    const checkPlayState = setInterval(() => {
        if (!video.paused) {
            video.muted = false;
            clearInterval(checkPlayState);
        }
    }, 500);

    //  Function to transition indicator
    function showIndicator(iconSrc) {
        indicator.src = iconSrc; // suppose to be .src thx stack overflow
        indicator.style.opacity = "1";
        indicator.style.transform = "translate(-50%, -50%) scale(1)";

        setTimeout(() => {
            indicator.style.opacity = "0";
            indicator.style.transform = "translate(-50%, -50%) scale(1.5)";
        }, 800);
    }

   
    video.addEventListener("click", (event) => {
        event.stopPropagation();

        if (firstInteraction) {
            video.muted = false;
            firstInteraction = false;
        }

        if (video.paused) {
            video.play();
            showIndicator("/assets/Icons/play.png"); 
        } else {
            video.pause();
            showIndicator("/assets/Icons/pause.png");
        }
    });

    // maeking video plays with sound after first user interaction
    document.body.addEventListener("click", () => {
        if (firstInteraction) {
            video.play().then(() => {
                video.muted = false;
                firstInteraction = false;
            }).catch(error => console.error("Autoplay failed:", error));
        }
    }, { once: true });

    // Like button functionalities dang sound professional
    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        let likes = parseInt(likeBtn.textContent.match(/\d+/)[0]); 
        likeBtn.textContent = `❤️ ${likes + 1}`; 
    });

    // Comment button functionality still broken send help
    commentBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        alert("Comments feature coming soon!");
    });
});
