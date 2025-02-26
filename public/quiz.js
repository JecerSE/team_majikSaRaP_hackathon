document.addEventListener("DOMContentLoaded", function () {
    function openTab(tabName) {
        // Hide 
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });

        // Show the selected tab
        document.getElementById(tabName).style.display = "block";
    }

    // Set 
    openTab('random');


    document.querySelectorAll(".tab-button").forEach(button => {
        button.addEventListener("click", function () {
            const tabName = this.getAttribute("data-tab");
            openTab(tabName);
        });
    });
});
