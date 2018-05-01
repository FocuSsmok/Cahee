const scroll = document.querySelector(".welcome__scroll");
const parentScroll = scroll.parentNode;
const header = document.querySelector(".header");
const navEl = document.querySelectorAll(".nav__link");
const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");
let isClicked = false;

/************** SCROLL DOWN BUTTON CLICK ****************/
scroll.addEventListener("click", function(e) {
    this.classList.add("welcome__scroll--active");
    const nextSection = parentScroll.nextElementSibling;
    window.scroll({
        left: 0,
        top: nextSection.offsetTop - 90,
        behavior: "smooth",
    });
});
/************** END SCROLL DOWN BUTTON CLICK ****************/

/*********** STICKY MENU **************************/
window.addEventListener("scroll", function(e) {
    if(scroll.classList.contains("welcome__scroll--active")) {
        let parentScrollY = parentScroll.nextElementSibling.getBoundingClientRect().y;
        if(parentScrollY <= 90) {
            scroll.classList.remove("welcome__scroll--active");
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
for(let i = 0; i < navEl.length; i++) {
    navEl[i].addEventListener("click", function(e) {
        e.preventDefault();
        let hash = this.hash;
        let offsetTop = document.querySelector(hash).offsetTop;
        let menuHeight = nav.offsetHeight;
        if(window.innerWidth < 768) {
            window.scroll({
                top: offsetTop - (header.offsetHeight + menuHeight -2),
                left: 0,
                behavior: 'smooth'
            });
        } else {
            window.scroll({
                top: offsetTop - header.offsetHeight + 2,
                left: 0,
                behavior: 'smooth'
            });
        }
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            location.hash = hash;
        }
    });
}
/****** END SCROLL SMOOTH TO PROPERLY SECTION **************/

/********************* SECTION DETECTED *************/
function detectSection() {
    let activeLink = "";
    for(let i = 0; i < navEl.length; i++) {
        navEl[i].parentElement.classList.remove("nav__item--active");
        let idSection = navEl[i].attributes.href.value;
        let thisSectionTopEdge = document.querySelector(idSection).getBoundingClientRect().y;
        let thisSectionBottomEdge = document.querySelector(idSection).getBoundingClientRect().bottom;
        let offsetHeader = header.offsetHeight;
        let offsetNav = nav.offsetHeight; 
        if(window.innerWidth < 768) {
            if(((offsetHeader + offsetNav) >= thisSectionTopEdge) && (thisSectionBottomEdge > (offsetHeader + offsetNav))) {
                activeLink = navEl[i];
                activeLink.parentElement.classList.add("nav__item--active");
            }
        } else {
            if((offsetHeader > thisSectionTopEdge) && (thisSectionBottomEdge > offsetHeader)) {
                activeLink = navEl[i];
                activeLink.parentElement.classList.add("nav__item--active");
            }
        }
        
    }
}

window.addEventListener("scroll", detectSection);
/********************* END SECTION DETECTED *************/

/********************** HAMBURGER CLICK HANDLING *********************/
hamburger.addEventListener("click", function(e){
    for(let i = 0; i < this.children.length; i++) {
        this.children[i].classList.toggle("hamburger__line--active");
    }
    header.classList.toggle("header--background");
    nav.classList.toggle("nav--active");
    nav.firstElementChild.classList.toggle("nav__list--active");
    if(!isClicked) {
        isClicked = true;
        nav.style.display = "block";
        nav.firstElementChild.classList.remove("nav__list--fadeOut");
    } else {
        isClicked = false;
        nav.style.display = "block";
        nav.firstElementChild.classList.add("nav__list--fadeOut");
        hamburger.style.pointerEvents = "none";
        setTimeout(function(){
            nav.style.display = "none";
            hamburger.style.pointerEvents = "auto";
        }, 300);
    }
});
/********************** END HAMBURGER CLICK HANDLING *********************/
