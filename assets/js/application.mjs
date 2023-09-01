const hideNav = (nav, main) => {
    let offset = 250,
        lastScrollY = 0;

    nav.onclick = () => nav.focus();
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
};

const activateMenuItem = (item, link) => {
    item.onmouseover = () => link.focus();
    if (item.classList.contains("nav-solutions")) {
        document.querySelector("ul.solutions-nav").onmouseleave = () => link.blur();
    }
};

const enableNavMenu = (nav) => {
    let solutionsElement = nav.querySelectorAll("ul.nav li"),
        solutionsLink = nav.querySelectorAll("ul.nav li a");
    [].forEach.call(solutionsElement, (li, index) =>
        activateMenuItem(li, solutionsLink[index])
    );
};

const startMainModal = () => {
    // Get the required elements for the main modal
    const dialog = document.getElementById("get-in-touch");
    const elements = document.querySelectorAll(".show-modal");

    // Set the show dialog elements
    elements.forEach((element) => {
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
    // Get the get in touch menu item
    const getInTouch = document.querySelector("li.nav-get-in-touch > a");
    if (!!getInTouch) getInTouch.classList.add("show-modal");
    startMainModal();

    const nav = document.querySelector("body > header > div");
    const main = document.getElementById("main-content");
    enableNavMenu(nav);

    const cookiesAside = document.querySelector("aside.cookies");
    const cookiesActions = document.querySelectorAll("aside.cookies > form.actions");
    cookiesActions.forEach((button) => {
        const accepted = window.localStorage.getItem("cookiesAccepted") || null;
        if (!accepted || accepted !== "true" ) {
            cookiesAside.style.display = "flex";
            button.onclick = () => {
                window.localStorage.setItem("cookiesAccepted", true);
                cookiesAside.style.display = "none";
            }
        }
    });

    // Let the whole solution widget clickable!
    const solutionsApps = document.querySelectorAll("body.tag-template.tag-solutions>main#main-content>div>article") || null;
    if (!!solutionsApps) {
        for (let i = 0; i < solutionsApps.length; i++) {
            const a = document.querySelector(`body.tag-template.tag-solutions>main#main-content>div>article:nth-child(${i+1}) > a`);
            solutionsApps[i].onclick = () => a.click();
        }
    }
});

const shakeMe = (section) => {
    section.onmouseover = () => section.classList.add("hi");
    section.onmouseout = () => section.classList.remove("hi");
}

// Automatically scroll horizontally when the window load
window.addEventListener("load", () => {
    try {
        const containers =
            document.querySelectorAll(".horizontal-scrollingXXX") || null;
        self.setInterval(() => {
            containers.forEach((container) => {
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

        const sections = document.querySelectorAll("main > section") || null;
        // sections.forEach((section) => shakeMe(section));

    } catch (error) {
        console.error(error);
    }
});
