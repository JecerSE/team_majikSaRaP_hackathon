console.log("Rank system active");

document.getElementById("roleSelect").value = 0;
var userExp = 0;
if (sessionStorage.getItem("userExp")) {
    userExp = parseInt(sessionStorage.getItem("userExp"));
}
var userRole = "0";
if (sessionStorage.getItem("userRole")) {
    userRole = sessionStorage.getItem("userRole");
    document.getElementById("roleSelect").value = userRole;
}
var userRank = "";
if (sessionStorage.getItem("userRank")) {
    userRank = sessionStorage.getItem("userRank");
    document.getElementById("roleLevel").textContent = userRank
}
var defExpBar = "----------";
updateExpBar();

const ccRanks = ["Novice Explorer", "Emerging Storyteller", "Knowledge Spreader",
    "Insightful Educator", "Scholarly Creator", "Master Narrator",
    "Visionary Mentor", "Esteemed Scholar", 
    "Master Educator", "Pioneer of Thought"];
const cvRanks = ["Inquisitive Mind", "Engaged Seeker", "Thoughtful Observer",
    "Analytical Learner", "Insight Collector", "Deep Thinker",
    "Knowledge Enthusiast", "Curious Scholar", 
    "Wisdom Seeker","Critical Analyst"];
const baRanks = ["Budding Responder", "Trusted Guide", "Thoughtful Contributor",
    "Knowledge Dispenser", "Insightful Analyst", "Community Mentor",
    "Intellectual Luminary", "Master Thinker", "Ultimate Sage", "Source of Truth"];

function logCurrentExp(){
    console.log("Current user EXP: " + userExp);
}

function saveSession(){
    sessionStorage.setItem("userExp", userExp);
    sessionStorage.setItem("userRole", userRole);
    sessionStorage.setItem("userRank", userRank);
}

function selectRole(role){
    userRole = role;
    updateRank();
    saveSession();
    location.reload();
}

function updateExpBar(){
    var expBarText = document.getElementById("expBar");

    if (userExp % 10 == 0){
        expBarText.textContent = defExpBar;
    }
    else {
        var newBar = "";
        for (let i = 0; i < 10; i++){
            if (i < userExp%10) {newBar = newBar.concat("*")}
            else {newBar = newBar.concat("-")}
        }
        expBarText.textContent = newBar;
    }
}

function addExp(val){
    var prevUserExp = userExp;
    userExp += val;
    if (userExp >= (Math.floor(prevUserExp/10)+1) * 10){
        console.log("Rank up");
        updateRank();
    }
    logCurrentExp();
    updateExpBar();
    saveSession();
}

function updateRank(){
    var rankLvl = Math.floor(userExp/10);
    console.log("Level: "+ rankLvl);
    var maxRankLvl = 9;
    var roleLevelText = document.getElementById("roleLevel");

    if (rankLvl > maxRankLvl) {rankLvl = maxRankLvl;}

    if (userRole == "Content Creator"){
        roleLevelText.textContent = ccRanks[rankLvl];
        userRank = ccRanks[rankLvl];
    }
    else if (userRole == "Curious Viewer"){
        roleLevelText.textContent = cvRanks[rankLvl];
        userRank = cvRanks[rankLvl];
    }
    else if (userRole == "Best Answerer"){
        roleLevelText.textContent = baRanks[rankLvl];
        userRank = baRanks[rankLvl]; 
    }
}

function resetRank(){
    console.log("Rank reset");
    userExp = 0;
    updateRank();
    logCurrentExp();
    updateExpBar();
    saveSession();
    location.reload();
}

// USERNAME EDITING
const usernameInputField = document.querySelector(".user-name-input-field")
const usernameInputButton = document.querySelector(".user-name-input-button")

function editUsername(event){
    // Set input field to visible
    usernameInputField.style.visibility = "visible";
    // Change submit button text
    usernameInputButton.value = "Submit";

    usernameInputButton.addEventListener("click", submitUsername)
    usernameInputButton.removeEventListener("click", editUsername)
}

function submitUsername(event){

    // Get input text
    const usernameInput = usernameInputField.value.trim()

    // Check if username field is empty or not
    if (usernameInput){
        sessionStorage.setItem("userName", usernameInput)

        // Set input field to hidden
        usernameInputField.style.visibility = "hidden";
        usernameInputField.value = ""
        // Change submit button text
        usernameInputButton.value = "Edit"

        usernameInputButton.addEventListener("click", editUsername)
        usernameInputButton.removeEventListener("click", submitUsername)
    }
    else {
        window.alert("Username must not be empty!")
    }

    // Refresh tab for display
    location.reload()
}

// ACCOUNT INTEGRATION - ALERT BOX
const accountIntegrationEditButton2 = document.querySelector("#aib-2");
const accountIntegrationEditButton3 = document.querySelector("#aib-3");
accountIntegrationEditButton2.addEventListener("click", () => {
    window.alert("Feature coming soon");
});
accountIntegrationEditButton3.addEventListener("click", () => {
    window.alert("Feature coming soon");
});

// DEFAULT RUNNING
usernameInputButton.addEventListener("click", editUsername)

const roleDisplayField = document.querySelector(".role-display-edit-field");
roleDisplayField.textContent = sessionStorage.getItem("userRole") || "USER ROLE HERE"

// DISPLAY USERNAME
const sidebarUserNameDisplay = document.querySelector("#sidebar-user-name")
const infoUserNameDisplay = document.querySelector("#info-user-name")
if (sessionStorage.getItem("userName")){
    sidebarUserNameDisplay.textContent = sessionStorage.getItem("userName")
    infoUserNameDisplay.textContent = sessionStorage.getItem("userName")
}
