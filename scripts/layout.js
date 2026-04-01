const HamMenu = document.getElementById('ham-menu');
const HamBtnOpen = document.getElementById('ham-btn--open');
const HamBtnClose = document.getElementById('ham-btn--close');
const HamMenuLinks = document.querySelectorAll('.ham-menu__link');

function openHamMenu() {
    HamMenu.classList.remove("off-screen");        
    if (document.documentElement.clientWidth <= 564) {
            disableScroll();
        }
}

function closeHamMenu() {
    HamMenu.classList.add("off-screen");
    enableScroll();
}

HamMenuLinks.forEach(button => {
    button.addEventListener("click", () => {
        HamMenu.classList.add("off-screen");
        enableScroll();
    })
});

function disableScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}