document.addEventListener("DOMContentLoaded", function () {
    function openTab(tabName) {
        //hide
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });


        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.style.display = "block";
        }
    }

    openTab('random');
    document.querySelectorAll(".tab-button").forEach(button => {
        button.addEventListener("click", function () {
            openTab(this.dataset.tab);
        });
    });
});
