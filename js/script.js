let menuRevealed = document.querySelector(".menu-revealed");

function menuReveal() {
    menuRevealed.classList.toggle("menu-from-left");
    document.getElementById("burger-line-1").classList.toggle("transition-burger-line-1");
    document.getElementById("burger-line-2").classList.toggle("transition-burger-line-2");
    document.getElementById("burger-line-3").classList.toggle("transition-burger-line-3");
}