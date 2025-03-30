let menu = document.querySelector('#menu-bars')
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
  menu.classList.toggle('fa-times')
  navbar.classList.toggle('active')
}

let themeToggler = document.querySelector('.theme-toggler')
let toggleBtn = document.querySelector('.toggle-btn')

toggleBtn.onclick = () => {
  themeToggler.classList.toggle('active')
}

window.onscroll = () => {
  menu.classList.remove('fa-times')
  navbar.classList.remove('active')
  themeToggler.classList.remove('active')
}

document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn => {
  btn.onclick = () => {
    let color = btn.getAttribute('data-color');  // Get color from data attribute
    document.documentElement.style.setProperty('--main-color', color);
  };
});

// Apply saved theme color on page load
const savedColor = localStorage.getItem('theme-color');
if (savedColor) {
  document.documentElement.style.setProperty('--primary-color', savedColor);
}

// Add event listeners to theme buttons
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const color = btn.getAttribute('data-color');
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('theme-color', color); // Save color to localStorage
  });
});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});