document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.querySelector("#video-container");
    const video = document.querySelector("video");
    const likeBtn = document.querySelector("#like-container > .icon-button");
    const commentBtn = document.querySelector("#comment-container > .icon-button");
    const likeCount = document.querySelector("#like-container > .counter");
    const commentCount = document.querySelector("#comment-container > .counter");

    const videoList = [
        "videos/sample_video_1.mp4",  
        "videos/sample_video_2.mp4",  
        "videos/sample_video_3.mp4",  
        "videos/sample_video_4.mp4",  
        "videos/sample_video_6.mp4",  
        "videos/sample_video_7.mp4",  
        "videos/sample_video_8.mp4",
        "videos/sample_video_9.mp4",  
        "videos/sample_video_10.mp4"   
    ];

    var videoID = "["+videoList[0]+"]";
    var videoLikesKey = videoID+"-likes";
    var videoCommentsKey = videoID+"-comments";
    var videoCommentSectionKey = videoID+"-comments-data";

    if (sessionStorage.getItem(videoLikesKey)) {
        likeCount.textContent = sessionStorage.getItem(videoID+"-likes");}
    if (sessionStorage.getItem(videoCommentsKey)) {
        commentCount.textContent = sessionStorage.getItem(videoID+"-comments");}    

    let currentIndex = 0; // Start at the first video
    let isTransitioning = false;

    // Comment Section Setup
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.innerHTML = `
        <div class="comment-box" style="color: black;">
            <button class="close-comment">&times;</button>
            <h3>Comments</h3>
            <ul class="comments-list"></ul>
            <input type="text" class="comment-input" style="height:50px;" placeholder="Write a comment...">
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

        if (sessionStorage.getItem(videoCommentSectionKey)) {
            commentSection.querySelector(".comments-list").innerHTML = sessionStorage.getItem(videoCommentSectionKey);}
    });

    closeCommentBtn.addEventListener("click", () => {
        commentSection.style.right = "-350px";
    });

    postCommentBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.innerHTML = `
            <table class="comment-item">
                <tr style="padding:50px;">
                    <td><img src="assets/profile.jpeg" class="comment-profile-pic" alt="Profile picture"></td>
                    <td><b>User</b></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="comment-field"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="button" value="Upvote"> <input type="button" value="Downvote"></td>
                </tr>
            </table>
            `
            const commentTextField = commentItem.querySelector(".comment-field");
            commentTextField.textContent = commentText;
            commentsList.appendChild(commentItem);
            commentInput.value = "";
            // Update comment counter
            let comments = parseInt(commentCount.textContent) || 0;
            commentCount.textContent = comments + 1;
            sessionStorage.setItem(videoCommentsKey, parseInt(commentCount.textContent));
            sessionStorage.setItem(videoCommentSectionKey, commentSection.querySelector(".comments-list").innerHTML);

            // Add updated comment section to video data in session storage
        }
    });

    // Pause/Play Overlay Indicator
    const indicator = document.createElement("img");
    indicator.style.position = "absolute";
    indicator.style.top = "50%";
    indicator.style.left = "50%";
    indicator.style.transform = "translate(-50%, -50%) scale(1)";
    indicator.style.width = "80px";
    indicator.style.opacity = "0";
    indicator.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    document.body.appendChild(indicator);

    function showIndicator(iconSrc) {
        indicator.src = iconSrc;
        indicator.style.opacity = "1";
        indicator.style.transform = "translate(-50%, -50%) scale(1)";

        setTimeout(() => {
            indicator.style.opacity = "0";
            indicator.style.transform = "translate(-50%, -50%) scale(1.5)";
        }, 500);
    }

    function togglePlayPause() {
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
        togglePlayPause();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === " " && document.activeElement !== commentInput) {
            event.preventDefault();
            togglePlayPause();
        }
    });

    function loadVideo(index) {
        if (isTransitioning || index < 0 || index >= videoList.length) return;
        isTransitioning = true;

        video.style.opacity = "0";
        setTimeout(() => {
            video.src = videoList[index];  
            video.load();
            video.play();
            video.muted = false;
            currentIndex = index;

            //reset elements please edit this
            likeCount.textContent = "0";
            commentCount.textContent = "0";
            commentsList.innerHTML = "";
            commentInput.value = "";

            video.style.opacity = "1";
            setTimeout(() => {
                isTransitioning = false;
            }, 300);

            if (sessionStorage.getItem(videoLikesKey)) {
                likeCount.textContent = sessionStorage.getItem(videoID+"-likes");}
            if (sessionStorage.getItem(videoCommentsKey)) {
                commentCount.textContent = sessionStorage.getItem(videoID+"-comments");}
            if (sessionStorage.getItem(videoCommentSectionKey)) {
                commentSection.querySelector(".comments-list").innerHTML = sessionStorage.getItem(videoCommentSectionKey);
            }
        }, 300);

        videoID = "["+videoList[index]+"]";
        videoLikesKey = videoID+"-likes";
        videoCommentsKey = videoID+"-comments";
        videoCommentSectionKey = videoID+"-comments-data";

    }

    // Scroll Event for Next & Previous Video (Reduced Sensitivity)
    let lastScrollTime = 0;
    window.addEventListener("wheel", (event) => {
        const now = new Date().getTime();
        if (now - lastScrollTime < 1500) return; // Prevent skipping multiple videos doesnt work
        lastScrollTime = now;

        if (event.deltaY > 0) {
            loadVideo(currentIndex + 1);
        } else if (event.deltaY < 0) {
            loadVideo(currentIndex - 1);
        }
    });

    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        let likes = parseInt(likeCount.textContent) || 0;
        likeCount.textContent = likes + 1;
        sessionStorage.setItem(videoLikesKey, parseInt(likeCount.textContent));
    });


    document.body.addEventListener("click", () => {
        video.muted = false; 
        video.play().catch(error => console.error("Autoplay failed:", error));
    }, { once: true });
    
    window.addEventListener("load", () => {
        video.muted = false;
        video.play().catch(error => console.error("Autoplay failed:", error));
    });
});
