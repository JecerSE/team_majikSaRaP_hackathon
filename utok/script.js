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

    var commentBoxActive = false;

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
        commentBoxActive = true;
        commentSection.style.right = commentSection.style.right === "0px" ? "-350px" : "0px";

        if (sessionStorage.getItem(videoCommentSectionKey)) {
            commentSection.querySelector(".comments-list").innerHTML = sessionStorage.getItem(videoCommentSectionKey);
            console.log(parseInt(commentCount.textContent));
            // Re-add event listeners for action buttons (upvote, downvote, reply)
            // Upvote / Downvote tb added later
            for (let i = 1; i <= parseInt(commentCount.textContent); i++){
                const replyButton = commentSection.querySelector("#comment-"+i+">tbody>.action-panel>td:nth-child(2)>.reply-button");
                console.log(replyButton);
                replyButton.addEventListener("click", toggleReplyInputBox);
            }
        }
    });

    closeCommentBtn.addEventListener("click", () => {
        commentSection.style.right = "-350px";
        commentBoxActive = false;
    });
 
    postCommentBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.innerHTML = `
            <table class="comment-item">
                <tr style="padding:50px;">
                    <td><img src="assets/profile.jpeg" class="comment-profile-pic" alt="Profile picture"></td>
                    <td><b>User</b> <span class="user-rank" style="font-style:italic; font-size:10px; color:gray"></span></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="comment-field"></td>
                </tr>
                <tr class="action-panel">
                    <td></td>
                    <td><button class="upvote-button"><img class="comment-action-icon" src="assets/Icons/Upvote.jpg" alt="Upvote"></button> <button class="downvote-button"><img class="comment-action-icon" src="assets/Icons/Downvote.jpg" alt="Downvote"></button> <input type="button" value="Reply" class="reply-button">
                    <span class="reply-count" style="visibility:hidden">0</span></td>
                </tr>
                <tr class="reply-box">
                    <td></td>
                    <td class="reply-section hidden"></td>
                </tr>
                <tr></tr>
            </table>
            `
            commentItem.querySelector(".comment-item").id = "comment-" + (parseInt(commentCount.textContent)+1);
            
            const replyButton = commentItem.querySelector(".reply-button");
            replyButton.addEventListener("click", toggleReplyInputBox);
            console.log(replyButton);

            const replyCount = commentItem.querySelector(".reply-count")
            replyButton.value = "Replies (" + replyCount.innerHTML + ")"

            const commentTextField = commentItem.querySelector(".comment-field");
            const commenterRank = commentItem.querySelector(".user-rank");
            commentTextField.textContent = commentText;
            if (sessionStorage.getItem("userRank")) {commenterRank.textContent = sessionStorage.getItem("userRank");}
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

    // Reply box
    // Toggle reply text input - reply button will call function below on click
    function toggleReplyInputBox(event){
        commentItem = event.target.parentNode.parentNode.parentNode.parentNode;
        replySection = commentItem.querySelector("tbody>.reply-box>.reply-section");

        replySectionStatus = replySection.classList[1];
        console.log(replySectionStatus);

        if (replySectionStatus == "hidden"){
            // Unhide reply section
            if (sessionStorage.getItem(commentItem.id + "-replies")){
                // Previously saved comment replies
                replySection.innerHTML = sessionStorage.getItem(commentItem.id + "-replies");

            }
            else {
                // No previously saved comment replies
                // Create new html
                replySection.innerHTML = `
                <input type="text" style="height=20px" placeholder="Reply to this comment..." class="reply-input">
                <input type="button" class="post-reply" value="Post reply">
                <ul class="comment-replies-list"></ul>
                `

                
            }
            const postReplyButton = replySection.querySelector(".post-reply")
            postReplyButton.addEventListener("click", postReply);
            replySection.classList.remove("hidden");
            replySection.classList.add("visible")
        }
        else {
            // Hide reply section
            sessionStorage.setItem(commentItem.id + "-replies", replySection.innerHTML);
            replySection.innerHTML = ``;
            console.log(replySection)
            replySection.classList.remove("visible");
            replySection.classList.add("hidden")
        }

        event.stopPropagation();
    }

    function postReply(event){
        const replySection = event.target.parentNode;
        const repliesList = replySection.querySelector(".comment-replies-list")
        const commentItem = replySection.parentNode.parentNode.parentNode;
        const replyInput = replySection.querySelector(".reply-input");
        const replyText = replyInput.value.trim();
        const replyCount = commentItem.querySelector("tbody>.action-panel>td:nth-child(2)>.reply-count")
        const replyButton = commentItem.querySelector(".reply-button");

        if (replyText){
            const replyItem = document.createElement("li");
            replyItem.innerHTML = `
            <table class="reply-item">
                <tr class="reply-content">
                    <td><span class="reply-username" style="font-weight:bold;">User</span> <span class="reply-field"></span><td>
                </tr>
                <tr class="reply-action-panel">
                    <td><button class="upvote-button"><img class="reply-action-icon" src="assets/Icons/Upvote.jpg" alt="Upvote"></button> <button class="downvote-button"><img class="reply-action-icon" src="assets/Icons/Downvote.jpg" alt="Downvote"></button></td>
                </tr>
            </table>
            `

            replyCount.textContent = parseInt(replyCount.textContent) + 1;
            replyItem.querySelector(".reply-item").id = "comment-" + commentItem.id + "-reply-" + (parseInt(replyCount.textContent));

            replyButton.value = "Replies (" + replyCount.innerHTML + ")"

            const replyTextField = replyItem.querySelector(".reply-field")
            replyTextField.textContent = replyText;
            repliesList.appendChild(replyItem)

            replyInput.value = "";

            sessionStorage.setItem(commentItem.id + "-replies", replySection.innerHTML);
            sessionStorage.setItem(videoCommentSectionKey, commentItem.parentNode.innerHTML);


        }

        event.stopPropagation();
    }

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
        if (event.key === " " && document.activeElement !== commentInput && document.activeElement.classList[0] != "reply-input") {
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
    
            //likes and comment counts
            likeCount.textContent = "0";
            commentCount.textContent = "0";
            commentsList.innerHTML = "";
            commentInput.value = "";
    
            //video id list
            videoID = "[" + videoList[index] + "]";
            videoLikesKey = videoID + "-likes";
            videoCommentsKey = videoID + "-comments";
            videoCommentSectionKey = videoID + "-comments-data";
    
            if (sessionStorage.getItem(videoLikesKey)) {
                likeCount.textContent = sessionStorage.getItem(videoLikesKey);
            }
            if (sessionStorage.getItem(videoCommentsKey)) {
                commentCount.textContent = sessionStorage.getItem(videoCommentsKey);
            }
            if (sessionStorage.getItem(videoCommentSectionKey)) {
                commentSection.querySelector(".comments-list").innerHTML = sessionStorage.getItem(videoCommentSectionKey);
            }
    
            video.style.opacity = "1";
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
    
            // Track watched videos i think
            let watchedVideos = parseInt(sessionStorage.getItem("watchedVideos") || "0") + 1;
            sessionStorage.setItem("watchedVideos", watchedVideos);
    
            if (watchedVideos >= 5) {  // Change this number as needed per difficulty of user
                sessionStorage.setItem("watchedVideos", "0");  // Reset counter after quiz sorry gian if this affects u somehow
                generateQuiz();
            }
        }, 300);
    }
    
    
    const quizQuestions = [
        {
            question: "Who is the best player in League of Legends?",
            options: ["Caps", "Chovy", "Faker", "TheShy"],
            answer: "Faker"
        },
        {
            question: "Which player is NOT in Los Ratones' starting roster?",
            options: ["TheBausffs", "Caedrel", "Crownie", "Nemesis"],
            answer: "Caedrel"
        }
    ];
    
    let watchedVideos = parseInt(sessionStorage.getItem("watchedVideos") || "0");
    
    function loadQuiz() {
        document.querySelector("#quiz-modal").style.display = "flex";
    }
    
    function closeQuiz() {
        document.querySelector("#quiz-modal").style.display = "none";
        watchedVideos = 0;
        sessionStorage.setItem("watchedVideos", watchedVideos);
        loadVideo(currentIndex + 1);
    }
    
    function generateQuiz() {
        document.querySelector("#quiz-question").textContent = quizQuestions[0].question;
        document.querySelector("#quiz-options").innerHTML = "";
        quizQuestions[0].options.forEach(option => {
            let btn = document.createElement("button");
            btn.classList.add("quiz-option");
            btn.textContent = option;
            btn.addEventListener("click", () => checkAnswer(option));
            document.querySelector("#quiz-options").appendChild(btn);
        });
        loadQuiz();
    }
    
    function checkAnswer(selectedAnswer) {
        let correctAnswer = quizQuestions[0].answer;
        if (selectedAnswer === correctAnswer) {
            quizQuestions.shift();
            if (quizQuestions.length > 0) {
                generateQuiz();
            } else {
                closeQuiz();
            }
        } else {
            alert("Wrong answer! Try again.");
        }
    }

    
    

    // Scroll Event for Next & Previous Video (Reduced Sensitivity)
    let lastScrollTime = 0;
    window.addEventListener("wheel", (event) => {
        if (!commentBoxActive) {
            const now = new Date().getTime();
            if (now - lastScrollTime < 1500) return;
            lastScrollTime = now;
            watchedVideos++;
            sessionStorage.setItem("watchedVideos", watchedVideos);
            
            if (watchedVideos >= 5) {
                generateQuiz();
            } else {
                loadVideo(currentIndex + (event.deltaY > 0 ? 1 : -1));
            }
            if (event.deltaY > 0) {
                loadVideo(currentIndex + 1);
            } else if (event.deltaY < 0) {
                loadVideo(currentIndex - 1);
            }
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
