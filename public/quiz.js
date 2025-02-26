document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    function openTab(tabName) {
        contents.forEach(content => content.style.display = "none");
        document.getElementById(tabName).style.display = "block";
    }

    tabs.forEach(button => {
        button.addEventListener("click", function () {
            const tabName = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            openTab(tabName);
        });
    });


    openTab("science");
});
