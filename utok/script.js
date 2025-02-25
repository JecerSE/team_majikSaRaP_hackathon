document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector(".icon-button:nth-child(2)");
    const likeCount = likeBtn.querySelector("span");
    const commentBtn = document.querySelector(".icon-button:nth-child(3)");
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.innerHTML = `
        <div class="comment-box">
            <h3>Comments</h3>
            <ul class="comments-list"></ul>
            <input type="text" class="comment-input" placeholder="Write a comment...">
            <button class="post-comment">Post</button>
        </div>
    `;
    document.body.appendChild(commentSection);

    const commentsList = document.querySelector(".comments-list");
    const commentInput = document.querySelector(".comment-input");
    const postCommentBtn = document.querySelector(".post-comment");

    const indicator = document.createElement("img"); 
    indicator.style.position = "absolute";
    indicator.style.top = "50%";
    indicator.style.left = "50%";
    indicator.style.transform = "translate(-50%, -50%)";
    indicator.style.width = "80px";
    indicator.style.opacity = "0";
    indicator.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    document.body.appendChild(indicator);

    let firstInteraction = true;

    const checkPlayState = setInterval(() => {
        if (!video.paused) {
            video.muted = false;
            clearInterval(checkPlayState);
        }
    }, 500);

    function showIndicator(iconSrc) {
        indicator.src = iconSrc;
        indicator.style.opacity = "1";
        indicator.style.transform = "translate(-50%, -50%) scale(1)";

        setTimeout(() => {
            indicator.style.opacity = "0";
            indicator.style.transform = "translate(-50%, -50%) scale(1.5)";
        }, 800);
    }

    function changePlayState() {
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

    document.body.addEventListener("click", () => {
        if (firstInteraction) {
            video.play().then(() => {
                video.muted = false;
                firstInteraction = false;
            }).catch(error => console.error("Autoplay failed:", error));
        }
    }, { once: true });

    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        let likes = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = likes + 1; 
    });

    commentBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    });

    postCommentBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.textContent = commentText;
            commentsList.appendChild(commentItem);
            commentInput.value = "";
        }
    });

    commentSection.style.display = "none";
});
