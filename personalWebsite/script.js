const nameToType = "Erika Sy";  // Replace with your name
const typedNameElement = document.getElementById('typed-name');

if (typedNameElement) {
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 150;
    const deletingDelay = 125;
    const pauseAfterTyping = 3400; // Delay after name is fully typed

    function typeAnimation() {
        // Update the displayed text
        typedNameElement.textContent = nameToType.substring(0, charIndex);

        // Handle typing or deleting logic
        if (!isDeleting && charIndex < nameToType.length) {
            charIndex++;
            setTimeout(typeAnimation, typingDelay);
        } else if (!isDeleting && charIndex === nameToType.length) {
            setTimeout(() => isDeleting = true, pauseAfterTyping);
            setTimeout(typeAnimation, pauseAfterTyping);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeAnimation, deletingDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setTimeout(typeAnimation, typingDelay);
        }
    }

    // Start the typing animation
    typeAnimation();
} else {
    console.error('Error: Element with ID "typed-name" not found.');
}

// Carousel Functionality
function setupCarousel() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectsContent = document.querySelector('.projects-content');
    const projectItems = document.querySelectorAll('.project-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    if (!projectsContent || projectItems.length === 0) return console.error('Carousel setup failed: No content found.');

    function updateCarousel() {
        const visibleProjectsCount = 3; // Number of projects to display at once
        projectItems.forEach((item, index) => {
            // Determine if the project should be visible
            const start = currentIndex - Math.floor(visibleProjectsCount / 2);
            const end = currentIndex + Math.floor(visibleProjectsCount / 2);
            if (index >= start && index <= end) {
                item.style.display = 'flex'; // Show the project
            } else {
                item.style.display = 'none'; // Hide the project
            }
        });
    
        // Update dot indicators
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function handleArrowClick(direction) {
        if (direction === 'left') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : projectItems.length - 1;
        } else {
            currentIndex = (currentIndex + 1) % projectItems.length;
        }
        updateCarousel();
    }

    leftArrow.addEventListener('click', () => handleArrowClick('left'));
    rightArrow.addEventListener('click', () => handleArrowClick('right'));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel(); // Initialize the carousel to show the first item
}

document.addEventListener('DOMContentLoaded', () => {
    setupCarousel(); // Set up the carousel when the document is fully loaded
});
