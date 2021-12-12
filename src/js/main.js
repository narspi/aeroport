document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  const menuBurger = document.getElementById("menu-burger");
  const modal = document.getElementById("modal");

  menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    modal.classList.toggle("open");
    const documentWidth = parseInt(document.documentElement.clientWidth);
    const windowWidth = parseInt(window.innerWidth);
    const scrollbarWidth = windowWidth - documentWidth;
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    else {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollbarWidth + "px";
    } 
  });

  let videoSlider = new Swiper(".reviews__video", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".reviews__video-next",
      prevEl: ".reviews__video-prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });

  let peopleSlider = new Swiper(".reviews__people", {
    slidesPerView: 1,
    loop: true,
    autoHeight: true,
    navigation: {
      nextEl: ".reviews__people-next",
      prevEl: ".reviews__people-prev",
    },
    breakpoints: {
      601: {
        autoHeight: false,
      },
    },
  });

  const fixedBlock = document.getElementById("fixed-block");
  const headerInner = document.getElementById("header-inner");
  const stickyHeader = document.getElementById("sticky-header");
  let currentPageYOffset = window.pageYOffset;
  document.addEventListener("scroll", () => {
    const height = stickyHeader.clientHeight;
    if (window.pageYOffset >= height) {
      if (!fixedBlock.classList.contains("add")) {
        headerInner.style.paddingTop = height + "px";
        fixedBlock.classList.add("add");
        fixedBlock.querySelector(".fixed-block__inner").append(stickyHeader);
      } else {
        if (!fixedBlock.classList.contains("show")) {
          if (currentPageYOffset > window.pageYOffset) {
            //fixedBlock.classList.add("show");
          }
        } else {
          if (currentPageYOffset < window.pageYOffset) {
            //fixedBlock.classList.remove("show");
          }
        }
      }
    } else {
      fixedBlock.classList.remove("add");
      fixedBlock.classList.remove("show");
      headerInner.style.paddingTop = "";
      headerInner.prepend(stickyHeader);
    }
    currentPageYOffset = window.pageYOffset;
  });

  const accordionAnimation = document.getElementById("accordion-animation");

  accordionAnimation.addEventListener("click", (event) => {
    const target = event.target;
    if (target.hasAttribute("data-accordion")) {
      const dropdown = event.target.parentNode.nextElementSibling;
      const style = getComputedStyle(dropdown);
      const display = style.display;
      if (display === "none") {
        dropdown.style.display = "block";
        const height = style.height;
        dropdown.style.height = "0px";
        dropdown.style.overflow = "hidden";
        setTimeout(() => {
          dropdown.style.transition = "height 1s";
          dropdown.style.height = height;
          dropdown.addEventListener(
            "transitionend",
            () => {
              dropdown.style.height = "";
              dropdown.style.transition = "";
              dropdown.style.overflow = "";
            },
            { once: true }
          );
        });
      } else {
        dropdown.style.transition = "height 1s";
        const height = style.height;
        dropdown.style.height = height;
        dropdown.style.overflow = "hidden";
        setTimeout(() => {
          dropdown.style.height = "0px";
          dropdown.addEventListener(
            "transitionend",
            () => {
              dropdown.style.display = "";
              dropdown.style.height = "";
              dropdown.style.transition = "";
              dropdown.style.overflow = "";
            },
            { once: true }
          );
        });
      }
    }
  });
});
