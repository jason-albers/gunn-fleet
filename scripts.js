// header -- hide after scrolling past 20% page length, keep nav sticky at top
let topBar = document.querySelector(".top-bar");
let mainHeader = document.getElementById("main-header");
let navBar = document.getElementById("nav-bar");

function isSmallViewport() {
  return window.innerWidth <= 768;
}

window.addEventListener("scroll", () => {
  const scrollThreshold = window.innerHeight * 0.2;
  if (isSmallViewport()) {
    if (window.scrollY > scrollThreshold) {
      mainHeader.style.top = "-65px"; // Hide main header
      navBar.style.top = "0"; // Keep nav-bar visible
    } else {
      mainHeader.style.top = "0"; // Show main header
      navBar.style.top = "65px"; // Position nav-bar below header
    }
  } else {
    if (window.scrollY > scrollThreshold) {
      topBar.style.top = "-31px";
      mainHeader.style.top = "-123px";
      navBar.style.top = "0";
    } else {
      topBar.style.top = "0";
      mainHeader.style.top = "32px";
      navBar.style.top = "123px";
    }
  }
});

// Navigation bar responsiveness
const navMenuLeft = document.querySelector('.nav-menu-left');
const navMenuRight = document.querySelector('.nav-menu-right');
const moreDropdown = document.querySelector('.more-dropdown');
const moreDropdownContent = document.querySelector('.more-dropdown-content');
const truckProLogin = navMenuRight.querySelector('li:last-child');
const socialMenu = document.getElementById("social-link");
const socialLinks = document.getElementById("social-links");

// Toggle visibility of social-links when socialMenu is clicked
socialMenu.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent click event from bubbling up
  const isVisible = socialLinks.style.display === "block";
  if (!isVisible) {
    // Calculate position relative to the button
    const rect = socialMenu.getBoundingClientRect();
    socialLinks.style.top = `${rect.bottom}px`;
    socialLinks.style.left = `${rect.left}px`;
    socialLinks.style.position = "absolute";
  }
  socialLinks.style.display = isVisible ? "none" : "block";
});

// Hide social-links when clicking outside
document.addEventListener("click", (event) => {
  if (!socialLinks.contains(event.target) && event.target !== socialMenu) {
    socialLinks.style.display = "none";
  }
});

function adjustNavMenu() {

  // Function to toggle dropdown visibility on hover
  moreDropdown.addEventListener('mouseenter', () => {
    moreDropdownContent.style.display = 'block';
  });

  moreDropdown.addEventListener('mouseleave', () => {
    moreDropdownContent.style.display = 'none';
  });

  // Ensure nested dropdowns within the "More" menu remain hidden by default
  const nestedDropdowns = moreDropdownContent.querySelectorAll('.dropdown');

  nestedDropdowns.forEach((nestedDropdown) => {
    const nestedDropdownContent = nestedDropdown.querySelector('.dropdown-content');

    nestedDropdown.addEventListener('mouseenter', () => {
      nestedDropdownContent.style.display = 'block';
    });

    nestedDropdown.addEventListener('mouseleave', () => {
      nestedDropdownContent.style.display = 'none';
    });
  })

  // Step 1: Repopulate items from the "More" dropdown to their original location if space allows
  while (moreDropdownContent.children.length > 0 && navMenuLeft.scrollWidth + navMenuRight.scrollWidth < navBar.clientWidth) {
    const item = moreDropdownContent.children[0];

    // Move the item back to the main nav menu left, before the "More" dropdown
    navMenuLeft.insertBefore(item, moreDropdown);
  }

  // Step 2: Show "Truck Pro Log In" if space allows
  if (truckProLogin.style.display === 'none' && navMenuLeft.scrollWidth + navMenuRight.scrollWidth < navBar.clientWidth) {
    truckProLogin.style.display = 'block';
  }

  // Step 3: Check if items need to be moved into "More" dropdown due to overflow
  let isOverflowing = navMenuLeft.scrollWidth + navMenuRight.scrollWidth > navBar.clientWidth;

  // Hide "Truck Pro Log In" first if overflowing
  if (isOverflowing) {
    truckProLogin.style.display = 'none';
  }

  // Step 4: Move left nav items to the "More" dropdown until everything fits
  while (isOverflowing && navMenuLeft.children.length > 1) {
    const item = navMenuLeft.children[navMenuLeft.children.length - 2]; // Get item before "More"

    // Prevent moving the "More" dropdown itself
    if (item === moreDropdown) {
      break;
    }

    moreDropdownContent.prepend(item);
    isOverflowing = navMenuLeft.scrollWidth + navMenuRight.scrollWidth > navBar.clientWidth;
  }

  // Step 5: Show or hide the "More" dropdown based on whether items were moved
  moreDropdown.style.display = moreDropdownContent.children.length > 0 ? 'block' : 'none';
};

// Menu toggle functionality
const menuButton = document.getElementById("menu-button");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");

// Open the menu overlay
menuButton.addEventListener("click", () => {
  menuOverlay.classList.add("active");
});

// Close the menu overlay
menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
});


// mobile menu dropdown functionality 

const mobileDropdowns = document.querySelectorAll(".menu-content .mobile-dropdown");

// Add click event to each mobile dropdown
mobileDropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent bubbling
    const isActive = dropdown.classList.contains("active");

    // Close all other dropdowns
    mobileDropdowns.forEach((d) => d.classList.remove("active"));

    // Toggle the clicked dropdown
    if (!isActive) {
      dropdown.classList.add("active");
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  mobileDropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
});

// Adjust the navigation on load and on window resize with throttling
window.addEventListener('load', adjustNavMenu);
window.addEventListener('resize', adjustNavMenu);
window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    navBar.style.display = "flex";
  } else {
    navBar.style.display = ""; // Reset to original behavior
  }
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


// Function to set up independent card scrolling for each section
function setupCardScrolling(sectionId) {
  const section = document.getElementById(sectionId);
  const container = section.querySelector('.card-container');
  const leftArrow = section.querySelector('.left-arrow');
  const rightArrow = section.querySelector('.right-arrow');
  let scrollAmount = 0; // Track the current scroll position
  let panelNumber = 1;

  leftArrow.style.display = 'none';

  const hideArrows = () => {
    if (panelNumber === 1) {
      leftArrow.style.display = 'none';
    } else if (panelNumber === 3) {
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = 'block';
      rightArrow.style.display = 'block';
    }
  }

  // Scroll right (next)
  rightArrow.addEventListener('click', () => {
    const containerWidth = container.clientWidth;
    scrollAmount += containerWidth; // Move by the width of the container
    if (scrollAmount > container.scrollWidth - containerWidth) {
      scrollAmount = container.scrollWidth - containerWidth; // Stop at the end
    }
    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    panelNumber += 1;
    hideArrows();
  });

  // Scroll left (previous)
  leftArrow.addEventListener('click', () => {
    const containerWidth = container.clientWidth;
    scrollAmount -= containerWidth; // Move backward by the container width
    if (scrollAmount < 0) {
      scrollAmount = 0; // Stop at the start
    }
    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    panelNumber -= 1;
    hideArrows();
  });

};

// Initialize card scrolling for each section independently
setupCardScrolling('cards-section-1');
setupCardScrolling('cards-section-2');


// hours section -- put today's day and time in bold

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
