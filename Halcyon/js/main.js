document.addEventListener('DOMContentLoaded', () => {

    const leftArrow = document.getElementById('nav-arrow-left');
    const rightArrow = document.getElementById('nav-arrow-right');
    const slider = document.getElementById('main-slider');

    const totalPages = 5; // 0 to 4
    let currentPage = 0;

    function getCurrentPageIndex() {
        const activeLink = document.querySelector('.nav-item.active');
        return activeLink ? parseInt(activeLink.getAttribute('data-index')) : 0;
    }

    // Mouse Tracking
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const width = window.innerWidth;
        const pageIndex = getCurrentPageIndex();

        // Left Arrow Area (0% - 10%)
        if (x < width * 0.1) {
            // Show Left Arrow if not on Home (Index 0)
            if (pageIndex > 0) {
                leftArrow.style.opacity = '1';
                rightArrow.style.opacity = '0';
            }
        }
        // Right Arrow Area (90% - 100%)
        else if (x > width * 0.9) {
            // Show Right Arrow if not on SOS (Index 4)
            if (pageIndex < totalPages - 1) {
                rightArrow.style.opacity = '1';
                leftArrow.style.opacity = '0';
            }
        }
        // Middle Area
        else {
            leftArrow.style.opacity = '0';
            rightArrow.style.opacity = '0';
        }
    });

    // Arrow Clicking
    leftArrow.addEventListener('click', () => {
        const pageIndex = getCurrentPageIndex();
        if (pageIndex > 0) {
            handlePageTransition(pageIndex - 1);
        }
    });

    rightArrow.addEventListener('click', () => {
        const pageIndex = getCurrentPageIndex();
        if (pageIndex < totalPages - 1) {
            handlePageTransition(pageIndex + 1);
        }
    });

    // Page Transition Animation Wrapper
    function handlePageTransition(newIndex) {
        // Fade out current page content slightly
        const allPages = document.querySelectorAll('.page-section');
        allPages.forEach(page => {
            page.style.opacity = '0.5';
            page.style.transition = 'opacity 0.4s ease';
        });

        // Trigger Slide
        if (typeof navigateTo === 'function') {
            navigateTo(newIndex);
        }

        // Fade in new page after slide starts
        setTimeout(() => {
            allPages.forEach((page, index) => {
                if (index === newIndex) {
                    page.style.opacity = '1';
                } else {
                    // Start hidden/faded
                    page.style.opacity = '0.5';
                }
            });
        }, 400); // Halfway through slide
    }

});
