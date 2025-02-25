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
    "Visionary Mentor", "Esteemed Scholar", "Pioneer of Thought", 
    "Master Educator"];
const cvRanks = ["Inquisitive Mind", "Engaged Seeker", "Thoughtful Observer",
    "Analytical Learner", "Insight Collector", "Deep Thinker",
    "Knowledge Enthusiast", "Curious Scholar", "Critical Analyst", 
    "Wisdom Seeker"];
const baRanks = ["Budding Responder", "Trusted Guide", "Thoughtful Contributor",
    "Knowledge Dispenser", "Insightful Analyst", "Community Mentor",
    "Intellectual Luminary", "Master Thinker", "Source of Truth",
    "Ultimate Sage"];

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

    if (userRole == "cc"){
        roleLevelText.textContent = ccRanks[rankLvl];
        userRank = ccRanks[rankLvl];
    }
    else if (userRole == "cv"){
        roleLevelText.textContent = cvRanks[rankLvl];
        userRank = cvRanks[rankLvl];
    }
    else if (userRole == "ba"){
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
}