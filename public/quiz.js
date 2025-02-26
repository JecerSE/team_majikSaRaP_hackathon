document.addEventListener("DOMContentLoaded", function () {
    function openTab(tabName) {
        // Hide
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });


        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.style.display = "block";
        }
    }

    const defaultTab = document.querySelector(".tab-button")?.dataset.tab;
    if (defaultTab) openTab(defaultTab);


    document.querySelectorAll(".tab-button").forEach(button => {
        button.addEventListener("click", function () {
            openTab(this.dataset.tab);
        });
    });
});
