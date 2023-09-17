"use strict";

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

const enableNavMenu = (nav) => {
    let solutionsElement = nav.querySelectorAll("ul.nav li"), solutionsLink = nav.querySelectorAll("ul.nav li a");
    [].forEach.call(solutionsElement, (li, index) => activateMenuItem(li, solutionsLink[index]));
};

const activateMenuItem = (item, link) => {
    item.onmouseover = () => link.focus();
    if (item.classList.contains("nav-solutions")) document.querySelector("ul.solutions-nav").onmouseleave = () => link.blur();
};

const startMainModal = (id, query) => {
    // Get the required elements for the modal
    const dialog = document.getElementById(id);
    const elements = document.querySelectorAll(query);

    // Set the show dialog elements
    elements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.showModal();
        });
    });

    // Dialog
    dialog.addEventListener("close", () => {
        if (dialog.returnValue.toLowerCase() === "cancel") return console.log("Contact form was canceled by the user.");
        if (dialog.returnValue.toLowerCase() !== "send") return false;
        console.log("Contact form has been submitted.");
        console.log("Value: ", dialog.returnValue);
        // Do something...
        // Add to input#submit oninput="this.form.elements.submit.value=this.value;"
    });
};

const shakeMe = (section) => {
    section.onmouseover = () => section.classList.add("hi");
    section.onmouseout = () => section.classList.remove("hi");
};

// Automatically scroll horizontally when the window load
window.addEventListener("load", () => {
    try {
        const containers = document.querySelectorAll(".horizontal-scrollingXXX") || null;
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

document.addEventListener("DOMContentLoaded", () => {
    // Get the contact main nav item
    const getInTouchLinks = document.querySelectorAll(`a[href$="/contact/" i]`);
    getInTouchLinks.forEach((link) => {
        link.classList.add("show-modal");
    });
    startMainModal("get-in-touch", ".show-modal");

    const nav = document.querySelector("body > header > nav");
    enableNavMenu(nav);

    const goToTopLinks = document.querySelectorAll(`a[href*="main-content"]`);
    goToTopLinks.forEach((link) => {
        link.addEventListener("click", () => {
            // event.preventDefault();
            setTimeout(() => window.scrollTo(0, 0), 0);
        });
    });

    const cookiesAside = document.querySelector("aside.cookies");
    const cookiesActions = document.querySelectorAll("aside.cookies > form.actions");
    cookiesActions.forEach((input) => {
        const accepted = window.localStorage.getItem("cookiesAccepted") || null;
        if (!accepted || accepted !== "true") {
            cookiesAside.style.display = "flex";
            input.addEventListener("click", () => {
                window.localStorage.setItem("cookiesAccepted", true);
                cookiesAside.style.display = "none";
            });
        }
    });

    // Let the whole solution widget clickable!
    const solutionsApps = document.querySelectorAll("body.tag-template.tag-solutions>main#main-content>div>article") || null;
    if (!!solutionsApps) {
        for (let i = 0; i < solutionsApps.length; i++) {
            const a = document.querySelector(`body.tag-template.tag-solutions>main#main-content>div>article:nth-child(${i + 1}) > a`);
            solutionsApps[i].onclick = () => a.click();
        }
    }

    if (!!document.querySelector("#client-testimonials")) {
        const circles = document.querySelectorAll("#client-testimonials ol li");
        const quotes = document.querySelectorAll("#client-testimonials .container blockquote");

        const activateCurrent = (index) => {
            if (index >= quotes.length) currentIndex = 0;
            else if (index < 0) currentIndex = quotes.length - 1;
            else currentIndex = index;
            deactivateAll();
            circles[currentIndex].classList.add("currently-active");
            quotes[currentIndex].classList.add("currently-active");
        };
    
        const deactivateAll = () => {
            quotes.forEach(quote => quote.classList.remove("currently-active"));
            circles.forEach(circle => circle.classList.remove("currently-active"));
        };
    
        let currentIndex = 0;
        activateCurrent(currentIndex);

        const activateArrow = (index) => activateCurrent(currentIndex += index);

        const autoPlay = setInterval(() => document.querySelector(".next-testimonial").click(), 5000);
        const activateTestimonialsPanel = () => {
            try {                
                quotes.forEach(quote => quote.addEventListener("mouseenter", () => clearInterval(autoPlay), { once: true }));

                circles.forEach((circle, current) => {
                    circle.addEventListener("click", () => activateCurrent(current));
                });

                document.querySelector(".next-testimonial").addEventListener("click", (event) => {
                    event.preventDefault();
                    activateArrow(+1);
                });
            
                document.querySelector(".prev-testimonial").addEventListener("click", (event) => {
                    event.preventDefault();
                    activateArrow(-1);
                });
            } catch (error) {
                console.error(error);
            }
        };

        activateTestimonialsPanel();
    }
});