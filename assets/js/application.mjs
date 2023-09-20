"use strict";

import {
    id,
    deployTabs,
    shakeMe,
    startMainModal,
    enableNavMenu,
} from "./modules/view.mjs";

// Automatically scroll horizontally when the window load
window.addEventListener("load", () => {
    try {
        // const sections = document.querySelectorAll("main > section") || null;
        // sections.forEach((section) => shakeMe(section));
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
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Get the contact main nav item
    const getInTouchLinks = document.querySelectorAll(`a[href$="/contact/" i]`) || null;
    if (!!getInTouchLinks) {
        getInTouchLinks.forEach(link => link.classList.add("show-modal"));
        startMainModal("get-in-touch", ".show-modal");
    }

    const nav = document.querySelector("body > header > nav");
    if (!!nav) enableNavMenu(nav);

    const goToTopLinks = document.querySelectorAll(`a[href*="main-content"]`);
    if (!!goToTopLinks) goToTopLinks.forEach(link => link.addEventListener("click", () => setTimeout(() => window.scrollTo(0, 0), 0)));

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

    const tabs = id("tabs-about");
    if (!!tabs) deployTabs(tabs);

    const testimonials = id("client-testimonials");
    if (!!testimonials) {
        const circles = testimonials.querySelectorAll("ol li");
        const quotes = testimonials.querySelectorAll("blockquote");

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
                circles.forEach((circle, index) => circle.addEventListener("click", () => activateCurrent(index)));

                document.querySelector(".next-testimonial").addEventListener("click", (e) => {
                    e.preventDefault();
                    activateArrow(+1);
                });
            
                document.querySelector(".prev-testimonial").addEventListener("click", (e) => {
                    e.preventDefault();
                    activateArrow(-1);
                });
            } catch (error) {
                console.error(error);
            }
        };

        activateTestimonialsPanel();
    }
});