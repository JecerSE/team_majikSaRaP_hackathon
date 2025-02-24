document.querySelector(".like-btn").addEventListener("click", function () {
    let likes = parseInt(this.innerText.split(" ")[1]); // Get current likes
    likes++;
    this.innerText = `❤️ ${likes}`; // Update likes count
});

document.querySelector(".comment-btn").addEventListener("click", function () {
    alert("Comments feature coming soon!");
});
