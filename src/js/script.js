const scroll = document.querySelector(".welcome__scroll");
const parentScroll = scroll.parentNode;
const header = document.querySelector(".header");

scroll.addEventListener("click", function(e) {
    this.classList.add("welcome__scroll--active");
    const nextSection = parentScroll.nextElementSibling;
    window.scroll({
        left: 0,
        top: nextSection.offsetTop,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", function(e) {
    if(scroll.classList.contains("welcome__scroll--active")) {
        let parentScrollY = parentScroll.nextElementSibling.getBoundingClientRect().y;
        if(parentScrollY <= 0) {
            scroll.classList.remove("welcome__scroll--active");
        }
    }
    if(window.scrollY > 0) {
        header.style.backgroundColor = "#ffffff";
    } else {
        header.style.backgroundColor = "transparent";
    }
});
