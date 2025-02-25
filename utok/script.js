document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".icon-button:nth-child(2)");
    const commentBtn = document.querySelector(".icon-button:nth-child(3)");
    const likeCount = likeBtn.querySelector("img");
    const commentCount = commentBtn.querySelector("img");

    // .img stupid AHAHHAHAHHAHAHAHAHA
    const indicator = document.createElement("img"); 

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

    function changePlayState(){
        if (firstInteraction) {
            video.muted = false;
            firstInteraction = false;
        }

        if (video.paused) {
            video.play();
            showIndicator("assets/Icons/play.png"); 
        } else {
            video.pause();
            showIndicator("assets/Icons/pause.png");
        }
    }
   
    video.addEventListener("click", (event) => {
        event.stopPropagation();
        changePlayState();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === " ") {
            event.preventDefault();
            changePlayState();
        }
    });

    // Making video play with sound after first user interaction
    document.body.addEventListener("click", () => {
        if (firstInteraction) {
            video.play().then(() => {
                video.muted = false;
                firstInteraction = false;
            }).catch(error => console.error("Autoplay failed:", error));
        }
    }, { once: true });

    // Like button functionality
    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        let likes = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = likes + 1; 
    });

    // Comment button functionality
    commentBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        let comments = parseInt(commentCount.textContent) || 0;
        commentCount.textContent = comments + 1; 
    });
});
