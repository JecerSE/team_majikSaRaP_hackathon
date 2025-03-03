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
            <div class="comment-box-header">
                <button class="close-comment">
                    <img src="assets/Icons/close.png" class="close-comment-icon" alt="Close">
                </button>
                <h3>Comments</h3>
            </div>
            <ul class="comments-list"></ul>
            <div class="comment-box-input">
                <input type="text" class="comment-input" style="height:50px;" placeholder="Write a comment...">
                <button class="post-comment">
                    <img src="assets/Icons/post-comment.png" class="post-comment-icon" alt="Post Comment">
                </button>
            </div>
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
            // Re-add event listeners for action buttons (upvote, downvote, reply)
            for (let i = 1; i <= parseInt(commentCount.textContent); i++){
                const commentItem = commentSection.querySelector("#comment-"+i)
                activateActionPanel(commentItem)
            }
        }
    });

    closeCommentBtn.addEventListener("click", () => {
        commentSection.style.right = "-350px";
        commentBoxActive = false;
    });

    // (Re)activate action panel for any comment-item element with a child action-panel element
    function activateActionPanel(hostItem, replySectionVisible=false){
        const actionPanel = hostItem.querySelector(".action-panel")
        if (!actionPanel.classList.contains("reply")){
            const replyButton = hostItem.querySelector(".reply-button")      
            replyButton.addEventListener("click", replyInputBoxEvt)
        }
        
        if (replySectionVisible && hostItem.querySelector(".post-reply") != null) {
            const postReplyButton = hostItem.querySelector(".post-reply")
            console.log(postReplyButton)
            postReplyButton.addEventListener("click", postReply)
        }

        const upvoteButton = hostItem.querySelector(".vote-button.up")
        const downvoteButton = hostItem.querySelector(".vote-button.down")
        upvoteButton.addEventListener("click", votePressed)
        downvoteButton.addEventListener("click", votePressed)
    }

    // Comment vote system
    function votePressed(event){
        console.log("Vote pressed")
        let linkToVoteButton = event.target;
        while (!linkToVoteButton.classList.contains("vote-button")){
            linkToVoteButton = linkToVoteButton.parentNode;
        }
        const voteButton = linkToVoteButton;

        let linkToCommentItem = voteButton;
        while(!linkToCommentItem.classList.contains("comment-item")){
            linkToCommentItem = linkToCommentItem.parentNode;
        }
        const commentItem = linkToCommentItem;
        const voteCounter = commentItem.querySelector(".vote-count");

        const voteClass = voteButton.classList;
        let voteCount = parseInt(voteCounter.textContent);
        if (voteClass.contains("up")){
            voteCount++;
        }
        else if (voteClass.contains("down")){
            voteCount--;
        }

        voteCounter.textContent = voteCount;
        
        if (voteCount == 0){
            voteCounter.style = "color:gray";
        }
        else if (voteCount > 0){
            voteCounter.style = "color:lime";
        }
        else if (voteCount < 0){
            voteCounter.style = "color:red";
        }

        saveCommentBoxToSession();

        console.log("success!")
        event.stopPropagation()
    }

    // Save entire comment section to session storage
    function saveCommentBoxToSession(){
        const commentsList = document.querySelector(".comments-list");
        const commentCount = parseInt(document.querySelector("#comment-container>.counter").textContent);

        let visibleRepliesItems = []

        // Hide visible replies first, so that comment section on initial load has no reply sections visible
        for (let i = 1; i<=commentCount; i++){
            const commentItem = commentsList.querySelector("#comment-" + i)
            const replySection = commentItem.querySelector(".reply-section")

            if (replySection.classList.contains("visible")){
                sessionStorage.setItem(commentItem.id + "-replies", replySection.innerHTML)
                replySection.innerHTML = ``
                replySection.classList.remove("visible")
                replySection.classList.add("hidden")
                visibleRepliesItems.push(commentItem.id)
            }

        }

        sessionStorage.setItem(videoCommentSectionKey, commentsList.innerHTML);
        
        // Show replies
        for (let i = 0; i < visibleRepliesItems.length && visibleRepliesItems.length > 0; i++){
            const commentItem = commentsList.querySelector("#"+visibleRepliesItems[i])
            const replySection = commentItem.querySelector(".reply-section")

            replySection.innerHTML = sessionStorage.getItem(visibleRepliesItems[i]+"-replies")
            replySection.classList.remove("hidden")
            replySection.classList.add("visible")

            console.log(commentItem)
            activateActionPanel(commentItem, true)

            const replyCount = parseInt(commentItem.querySelector(".reply-count").textContent)
            for (let j = 1; j <= replyCount; j++){
                const replyItem = replySection.querySelector("#" + commentItem.id + "-reply-" + j);
                activateActionPanel(replyItem)
            }
            
        }
    }

 
    postCommentBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.innerHTML = `
            <table class="comment-item">
                <tr style="padding:50px;">
                    <td><img src="assets/profile.jpeg" class="comment-profile-pic" alt="Profile picture"></td>
                    <td>@<b class="user-name">User</b> <span class="user-rank" style="font-style:italic; font-size:10px; color:gray"></span></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="comment-field"></td>
                </tr>
                <tr class="action-panel">
                    <td></td>
                    <td><button class="vote-button up"><img class="vote-button up comment-action-icon" src="assets/Icons/upvote.png" alt="Upvote"></button> 
                    <button class="vote-button down"><img class="vote-button down comment-action-icon" src="assets/Icons/downvote.png" alt="Downvote"></button> 
                    <span class="vote-count" style="color:gray">0</span>
                    <input type="button" value="Reply" class="reply-button">
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
            
            activateActionPanel(commentItem);

            const commentTextField = commentItem.querySelector(".comment-field");
            const commenterRank = commentItem.querySelector(".user-rank");
            const commenterName = commentItem.querySelector(".user-name");
            commentTextField.textContent = commentText;
            if (sessionStorage.getItem("userRank")) {commenterRank.textContent = sessionStorage.getItem("userRank");}
            if (sessionStorage.getItem("userName")) {commenterName.textContent = sessionStorage.getItem("userName");}
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
    // For reply buttons only - will call actual toggleReplies function on click
    function replyInputBoxEvt(event){
        let linkToCommentItem = event.target;
        while (!linkToCommentItem.classList.contains("comment-item") || linkToCommentItem.classList.contains("reply")){
            linkToCommentItem = linkToCommentItem.parentNode;
        }
        const commentItem = linkToCommentItem;

        toggleReplyInputBox(commentItem)
    }

    // Toggle replies section of a comment-item element
    function toggleReplyInputBox(commentItem){
        const replySection = commentItem.querySelector("tbody>.reply-box>.reply-section");
        const replySectionStatus = replySection.classList[1];

        if (replySectionStatus == "hidden"){
            // Unhide reply section
            if (sessionStorage.getItem(commentItem.id + "-replies")){
                // Previously saved comment replies
                replySection.innerHTML = sessionStorage.getItem(commentItem.id + "-replies");

                const replyList = replySection.querySelector(".comments-list.replies");
                const commentID = commentItem.id;
                const replyCount = parseInt(commentItem.querySelector(".reply-count").textContent)
                for (let i = 1; i <= replyCount; i++){
                    const replyItem = replyList.querySelector("#" + commentID + "-reply-" + i);
                    activateActionPanel(replyItem)
                }

            }
            else {
                // No previously saved comment replies
                // Create new html
                replySection.innerHTML = `
                <input type="text" style="height=20px" placeholder="Reply to this comment..." class="reply-input">
                <input type="button" class="post-reply" value="Post reply">
                <ul class="comments-list replies"></ul>
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
            replySection.classList.remove("visible");
            replySection.classList.add("hidden")
        }

        event.stopPropagation();
    }

    // Create a new .comment-item.reply element as a child of a comment-item
    function postReply(event){
        console.log("Replying...")
        const replySection = event.target.parentNode;
        const repliesList = replySection.querySelector(".comments-list.replies")
        const commentItem = replySection.parentNode.parentNode.parentNode;
        const replyInput = replySection.querySelector(".reply-input");
        const replyText = replyInput.value.trim();
        const replyCount = commentItem.querySelector("tbody>.action-panel>td:nth-child(2)>.reply-count")
        const replyButton = commentItem.querySelector(".reply-button");
        const postReplyButton = commentItem.querySelector(".post-reply")

        if (replyText){
            const replyItem = document.createElement("li");
            replyItem.innerHTML = `
            <table class="comment-item reply">
                <tr class="reply-content">
                    <td>@<span class="reply-user-name" style="font-weight:bold;">User</span> 
                    <span class="reply-rank">(RANK)</span> 
                    <span class="reply-field"></span><td>
                </tr>
                <tr class="action-panel reply">
                    <td><button class="vote-button up"><img class="reply-action-icon" src="assets/Icons/upvote.png" alt="Upvote"></button>
                    <button class="vote-button down"><img class="reply-action-icon" src="assets/Icons/downvote.png" alt="Downvote"></button>
                    <span class="vote-count reply" style="color:gray">0</span></td> 
                </tr>
            </table>
            `

            replyCount.textContent = parseInt(replyCount.textContent) + 1;
            replyItem.querySelector(".comment-item.reply").id = commentItem.id + "-reply-" + (parseInt(replyCount.textContent));

            replyButton.value = "Replies (" + replyCount.innerHTML + ")";

            activateActionPanel(replyItem.querySelector(".comment-item.reply"))
            
            const replyTextField = replyItem.querySelector(".reply-field")
            replyTextField.textContent = replyText;
            repliesList.appendChild(replyItem)

            const replyRank = replyItem.querySelector(".reply-rank")
            if (sessionStorage.getItem("userRank")) {replyRank.textContent = "("+sessionStorage.getItem("userRank")+")"}

            const replyUsername = replyItem.querySelector(".reply-user-name")
            if (sessionStorage.getItem("userName")) {replyUsername.textContent = sessionStorage.getItem("userName")}
            replyInput.value = "";

            
            toggleReplyInputBox(commentItem)
            saveCommentBoxToSession()
            toggleReplyInputBox(commentItem)
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

    const watchedVideosSet = new Set();

    function getRandomVideoIndex() {
        let availableVideos = videoList.filter((_, index) => !watchedVideosSet.has(index));
        
        if (availableVideos.length === 0) {
            watchedVideosSet.clear(); // Reset if all videos have been watched
            availableVideos = videoList;
        }
    
        const randomIndex = Math.floor(Math.random() * availableVideos.length);
        return videoList.indexOf(availableVideos[randomIndex]);
    }
    
    function loadVideo() {
        if (isTransitioning) return;
        isTransitioning = true;
    
        let newIndex = getRandomVideoIndex();
        watchedVideosSet.add(newIndex); // Mark as watched indexes
    
        video.style.opacity = "0";
        setTimeout(() => {
            video.src = videoList[newIndex];
            video.load();
            video.play();
            video.muted = false;
            currentIndex = newIndex;
    
            // Reset likes and comments
            likeCount.textContent = "0";
            commentCount.textContent = "0";
            commentsList.innerHTML = "";
            commentInput.value = "";
    
            // Update sessionStorage keys
            videoID = "[" + videoList[newIndex] + "]";
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
    
    //quiz questions should be genereated here but for now i will have fillers
    //mostly league of legends stuff
    //should also implement a system for another quiz and have memory generation stuffs
    //jecer was here dili nako ani :)
    const quizQuestions = [
        {
            question: "What is the inverse of inegration",
            options: ["Kinematics", "Pythagorean Theorem", "Differentiation", "Condensation"],
            answer: "Differentiation"
        },
        {
            question: "Which of the following distinguishes a vector quantity from a scalar quantity?",
            options: ["Magnitude only", "Direction only", "Both magnitude and direction", "Neither magnitude nor direction"],
            answer: "Both magnitude and direction"
        }
    ];
    
    let watchedVideos = parseInt(sessionStorage.getItem("watchedVideos") || "0");
    let quizCompleted = sessionStorage.getItem("quizCompleted") === "true";

    function loadQuiz() {
    document.querySelector("#quiz-modal").style.display = "flex";
    }
    

    function closeQuiz() {
        document.querySelector("#quiz-modal").style.display = "none";
        watchedVideos = 0;
        quizCompleted = true;
        sessionStorage.setItem("watchedVideos", watchedVideos);
        sessionStorage.setItem("quizCompleted", "true");
        loadVideo(currentIndex + 1);
    }
    
    function generateQuiz() {
        if (watchedVideos < 5) return; // change 5 dependsing if how many will vary later
        
        const quizContainer = document.querySelector("#quiz-container");
        const video = document.querySelector(".video");
        
        // Hide Video, Show Quiz
        video.style.display = "none";
        quizContainer.style.display = "flex";
        
        // Load First Question
        document.querySelector("#quiz-question").textContent = quizQuestions[0].question;
        document.querySelector("#quiz-options").innerHTML = "";
        
        quizQuestions[0].options.forEach(option => {
            let btn = document.createElement("button");
            btn.classList.add("quiz-option");
            btn.textContent = option;
            btn.addEventListener("click", () => checkAnswer(option));
            document.querySelector("#quiz-options").appendChild(btn);
        });
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
    
    function closeQuiz() {
        const quizContainer = document.querySelector("#quiz-container");
        const video = document.querySelector(".video");
        
        // Show Video, Hide Quiz
        quizContainer.style.display = "none";
        video.style.display = "block";
        
        watchedVideos = 0;
        sessionStorage.setItem("watchedVideos", watchedVideos);
        loadVideo(currentIndex + 1);
    }

    // Scroll Event for Next & Previous Video (Reduced Sensitivity)

    let lastScrollTime = 0;
    window.addEventListener("wheel", (event) => {
        if (!commentBoxActive) {
            const now = new Date().getTime();
            if (now - lastScrollTime < 1500) return;
            lastScrollTime = now;
            
            if (event.deltaY < 0 && quizCompleted) {
                let nextIndex = currentIndex - 1;
                loadVideo(nextIndex);
                return;
            }
    
            watchedVideos++;
            sessionStorage.setItem("watchedVideos", watchedVideos);
            
            if (watchedVideos === 5) {
                generateQuiz();
            } else {
                let nextIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);
                loadVideo(nextIndex);
                if (quizCompleted) {
                    loadVideo();  // randomizer theorhetically
                }
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
