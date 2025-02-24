document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const commentBtn = document.querySelector(".comment-btn");

    likeBtn.addEventListener("click", () => {
        let likes = parseInt(likeBtn.textContent.match(/\d+/)[0]); // Extract the number
        likeBtn.textContent = `❤️ ${likes + 1}`; // Increment and update
    });

    commentBtn.addEventListener("click", () => {
        alert("Comments feature coming soon!");
    });
});
