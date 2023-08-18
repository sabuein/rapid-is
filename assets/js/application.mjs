const activateMagic = (item, link) => {
    item.onmouseover = () => link.focus();
    if (item.classList.contains("nav-solutions")) {
        document.querySelector("ul.solutions-nav").onmouseleave = () => link.blur();
    }
};

document.addEventListener("DOMContentLoaded", (event) => {
    let nav = document.querySelector("body > header > div");
    nav.onclick = () => nav.focus();

    let offset = 250, lastScrollY = 0;
    const main = document.getElementById("main-content");
    window.addEventListener("scroll", () => {
        if (window.scrollY >= offset && window.scrollY > lastScrollY) {
            // make thin header
            nav.classList.add("loose");
            main.style.paddingTop = 0;
        } else {
            // show full header
            nav.classList.remove("loose");
            main.style.paddingTop = "5.5em";
        }
        lastScrollY = window.scrollY;
    });

    let solutionsElement = nav.querySelectorAll("ul.nav li");
    let solutionsLink = nav.querySelectorAll("ul.nav li a");
    [].forEach.call(solutionsElement, (li, index) => {
        activateMagic(li, solutionsLink[index]);
    });
});