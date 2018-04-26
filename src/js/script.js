const scroll = document.querySelector(".welcome__scroll");
const parentScroll = scroll.parentNode;
const header = document.querySelector(".header");


/************** SCROLL DOWN BUTTON CLICK ****************/
scroll.addEventListener("click", function(e) {
    this.classList.add("welcome__scroll--active");
    const nextSection = parentScroll.nextElementSibling;
    if(document.body.clientWidth >= 768) {
        window.scroll({
            left: 0,
            top: nextSection.offsetTop - 90,
            behavior: "smooth",
        });
    } else {
        window.scroll({
            left: 0,
            top: nextSection.offsetTop - 70,
            behavior: "smooth",
        });
    }
    
});
/************** END SCROLL DOWN BUTTON CLICK ****************/

/*********** STICKY MENU **************************/
window.addEventListener("scroll", function(e) {
    if(document.body.clientWidth >= 768) {
        if(scroll.classList.contains("welcome__scroll--active")) {
            let parentScrollY = parentScroll.nextElementSibling.getBoundingClientRect().y;
            if(parentScrollY <= 90) {
                scroll.classList.remove("welcome__scroll--active");
            }
        }
    } else {
        if(scroll.classList.contains("welcome__scroll--active")) {
            let parentScrollY = parentScroll.nextElementSibling.getBoundingClientRect().y;
            if(parentScrollY <= 70) {
                scroll.classList.remove("welcome__scroll--active");
            }
        }
    }
    if(window.scrollY > 0) {
        header.style.backgroundColor = "#ffffff";
    } else {
        header.style.backgroundColor = "transparent";
    }
});

/*********** END STICKY MENU **************************/

/****** SCROLL SMOOTH TO PROPERLY SECTION **************/

/****** END SCROLL SMOOTH TO PROPERLY SECTION **************/
