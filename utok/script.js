document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const likeBtn = document.querySelector("#like-container > .icon-button");
    const commentBtn = document.querySelector("#comment-container > .icon-button");
    const likeCount = document.querySelector("#like-container > .counter");
    const commentCount = document.querySelector("#comment-container > .counter");

    // Comment Section Setup
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.innerHTML = `
        <div class="comment-box">
            <button class="close-comment">&times;</button>
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
    const closeCommentBtn = document.querySelector(".close-comment");
    
    commentSection.style.right = "-350px";
    commentSection.style.transition = "right 0.3s ease-in-out";
    
    // Toggle Comment Section
    commentBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        commentSection.style.right = commentSection.style.right === "0px" ? "-350px" : "0px";
    });
    
    closeCommentBtn.addEventListener("click", () => {
        commentSection.style.right = "-350px";
    });
    
    postCommentBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.textContent = commentText;
            commentsList.appendChild(commentItem);
            commentInput.value = "";
            // Update comment counter
            let comments = parseInt(commentCount.textContent) || 0;
            commentCount.textContent = comments + 1;
        }
    });
    
    // Indicator Setup
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
        console.log("Like");
        let likes = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = likes + 1; 
    });
});