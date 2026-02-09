// Slider Navigation Logic
const slider = document.getElementById('main-slider');
const navItems = document.querySelectorAll('.nav-item');

function navigateTo(pageIndex) {
    // 1. Slide the container
    // pageIndex 0 = 0vw, 1 = -100vw, 2 = -200vw, etc.
    const translateValue = -(pageIndex * 100);
    slider.style.transform = `translateX(${translateValue}vw)`;

    // 2. Update Active Nav State
    navItems.forEach(item => item.classList.remove('active'));
    // Find link with matching data-index
    const activeLink = document.querySelector(`.nav-item[data-index="${pageIndex}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 3. Optional: Reset Scroll position of the new page
    const pageSections = document.querySelectorAll('.page-section');
    if (pageSections[pageIndex]) {
        pageSections[pageIndex].scrollTop = 0;
    }
}

// Ensure correct state on load (handle e.g. if we want to deep link later, but for now default to Home)
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(0); // Start at Home
});
