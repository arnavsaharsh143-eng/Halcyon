document.addEventListener('DOMContentLoaded', () => {

    /* --- Halcyon Mouse-Follow Navigation --- */
    const leftArrow = document.getElementById('nav-arrow-left');
    const rightArrow = document.getElementById('nav-arrow-right');
    const slider = document.getElementById('main-slider');

    // Page Setup
    const totalPages = 5; // 0 to 4
    let currentPage = 0;

    // We need to keep track of current page to know when to show arrows
    // We can hook into the existing slider logic or just track it here.
    // The slider.js uses a global 'navigateTo' function. 
    // Let's rely on the URL hash or a global variable if possible, 
    // but for now, we'll sync with the 'active' class on nav items.

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

    // Expose handlePageTransition to global scope so slider.js or others can use it if needed
    // or better, update navigateTo to use this logic.
    // For now, let's patch the window.navigateTo if it exists, 
    // BUT navigateTo is defined in slider.js which might run after this. 
    // We will leave navigateTo as simple slide, and this wrapper handles the visual flair.

    // Update Slider.js navigateTo to call our opacity logic? 
    // Actually, let's just use this handlePageTransition for Arrow Clicks.
    // Nav links in index.html call navigateTo() directly. 
    // We should probably safeguard the nav links to also trigger opacity logic.

    // Better Approach: Add a listener to hijack internal nav clicks?
    // The current index.html calls `onclick="navigateTo(x)"`.
    // We can just rely on the existing navigateTo for Nav Links (simple slide),
    // and use the fancy transition for Arrows as requested.

});
