document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  const menuBurger = document.getElementById("menu-burger");
  const modal = document.getElementById("modal");
  const menu = document.getElementById("menu");

  function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }

  function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  }

  menu.addEventListener('click',event=>{
    event.preventDefault();
    const target = event.target;
    let isAnchor = false;
    if (target.href) {
      const hash = new URL(target.href).hash.substring(1);
      if (hash) {
        event.preventDefault();
        smoothScroll(hash);
      }
    }
  })

  menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    modal.classList.toggle("open");
    const documentWidth = parseInt(document.documentElement.clientWidth);
    const windowWidth = parseInt(window.innerWidth);
    const scrollbarWidth = windowWidth - documentWidth;
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    } else {
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
            fixedBlock.classList.add("show");
            setTimeout(() => {
              fixedBlock.classList.remove("show");
            }, 3000);
          }
        } else {
          if (currentPageYOffset < window.pageYOffset) {
            fixedBlock.classList.remove("show");
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

  const accordionAnimation = document.getElementById("faq");

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
