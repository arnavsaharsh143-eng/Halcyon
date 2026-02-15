// Slider Navigation Logic
const slider = document.getElementById('main-slider');
const navItems = document.querySelectorAll('.nav-item');

function navigateTo(pageIndex) {
    // 1. Slide the container
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

// Ensure correct state on load
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(0); // Start at Home
});
