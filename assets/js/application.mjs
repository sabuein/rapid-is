const activateMagic = (item, link) => {
    item.onmouseover = () => link.focus();
    if (item.classList.contains("nav-solutions")) {
        document.querySelector("ul.solutions-nav").onmouseleave = () => link.blur();
    }
};

const startMainModal = () => {
    // Get the required elements for the main modal
    const dialog = document.getElementById("get-in-touch");
    const elements = document.querySelectorAll(".show-modal");

    // Set the show dialog elements
    elements.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.showModal();
        });
    });

    // Dialog
    dialog.addEventListener("close", (event) => {
        if (dialog.returnValue !== "submit") return;
        console.log("Get in touch form submited!");
        console.log(dialog.returnValue);
        // Do something...
        // Add to input#submit oninput="this.form.elements.submit.value=this.value;"
    });
    
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

    // Get the get in touch menu item
    const getInTouch = document.querySelector("li.nav-get-in-touch > a");
    if (!!getInTouch) getInTouch.classList.add("show-modal")
    startMainModal();

});

window.addEventListener("load", () => {
    // Automatically scroll horizontally when the window load
    const containers = document.querySelectorAll(".horizontal-scrolling");
    self.setInterval(() => {
        containers.forEach(container => {
            const width = container.scrollWidth;
            if (container.scrollLeft !== width) {
                container.scrollTo(container.scrollLeft + 1, 0);
            } else {
                self.setInterval(() => {
                    container.scrollTo(container.scrollLeft + -1, 0);
                }, 15);
            }
        });
    }, 15);
});