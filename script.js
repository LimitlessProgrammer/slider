const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.indicators');
let currentIndex = 0;
const slideInterval = 1500; // Time in milliseconds for each slide (1 second=1000)

// Show the current slide
function showSlide(index) {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(-${index * slideWidth}px)`;

    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
    });

    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

// Show the next slide
function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// Show the previous slide
function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

// Create indicators
slides.forEach((_, i) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.addEventListener('click', () => showSlide(i));
    indicatorsContainer.appendChild(indicator);
});

// Start autoplay
let autoPlay = setInterval(nextSlide, slideInterval);

// Handle slider mouseover and mouseout
document.querySelector('.slider').addEventListener('mouseover', () => clearInterval(autoPlay));
document.querySelector('.slider').addEventListener('mouseout', () => autoPlay = setInterval(nextSlide, slideInterval));

// Swipe support for touch devices
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        prevSlide();
    }
}

document.querySelector('.slider').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Show the initial slide
showSlide(currentIndex);
