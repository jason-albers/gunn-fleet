// header -- hide after scrolling past 20% page length, keep nav sticky at top
let topBar = document.querySelector(".top-bar");
let mainHeader = document.getElementById("main-header");
let navBar = document.getElementById("nav-bar");

window.onscroll = function () {
  if (window.scrollY > window.innerHeight * 0.2) {
    topBar.style.top = "-32px";
    mainHeader.style.top = "-91px";
    navBar.style.top = "0";
  } else {
    topBar.style.top = "0";
    mainHeader.style.top = "32px";
    navBar.style.top = "123px";
  }
};
document.addEventListener('DOMContentLoaded', () => {
  // Responsive navigation collapse for overflow elements
  const navMenuLeft = document.querySelector('.nav-menu-left');
  const moreDropdown = document.querySelector('.more-dropdown');
  const moreDropdownContent = document.querySelector('.more-dropdown-content');

  function adjustNavMenu() {
    const navItems = navMenuLeft.querySelectorAll('li:not(.more-dropdown)');
    moreDropdownContent.innerHTML = ''; // Clear previous items

    let isOverflowing = false;
    navItems.forEach((item) => {
      if (item.offsetTop > navMenuLeft.offsetTop) {
        moreDropdownContent.appendChild(item.cloneNode(true));
        item.style.display = 'none';
        isOverflowing = true;
      } else {
        item.style.display = 'block';
      }
    });

    if (isOverflowing) {
      moreDropdown.style.display = 'block';
    } else {
      moreDropdown.style.display = 'none';
    }
  }

  window.addEventListener('resize', adjustNavMenu);
  adjustNavMenu();
});

// hero carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// change slide when square is clicked
function setSlide(index) {
  showSlide(index);
}

// rotate every 5 seconds
setInterval(nextSlide, 5000);


// three card scrolling
// arrows should not appear until max-width: 768px

let currentCard = 0;
const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");

function updateCardPosition() {
  cardContainer.scrollTo({
    left: cards[currentCard].offsetLeft,
    behavior: 'smooth'
  });
}

function nextCard() {
  currentCard = (currentCard + 1) % cards.length;
  updateCardPosition();
}

function prevCard() {
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  updateCardPosition();
}

// hours section -- put today's day and time in bold

document.addEventListener('DOMContentLoaded', () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = new Date().getDay();
  if (currentDay === 0) {
    currentDay = 6;
  } else {
    currentDay = currentDay - 1;
  };

  const salesDays = document.querySelectorAll('.sales-hours .day');
  const serviceDays = document.querySelectorAll('.service-hours .day');

  salesDays[currentDay].classList.add('highlight');
  serviceDays[currentDay].classList.add('highlight');
});
