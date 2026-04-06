document.querySelectorAll("[data-dialog]").forEach(button => {
    button.addEventListener("click", () => {
        const dialogId = button.dataset.dialog;
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.showModal();
        }
    });
});