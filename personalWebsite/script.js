const nameToType = "Erika Sy";  // Replace with your name
const typedNameElement = document.getElementById('typed-name');

if (typedNameElement) {
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 150;
    const deletingDelay = 100;
    const pauseAfterTyping = 2500; // Delay after name is fully typed

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
const projectsContent = document.querySelector('.projects-content');
const projectItems = Array.from(document.querySelectorAll('.project-item')); // Convert NodeList to array
let currentIndex = 0;

// Carousel update function
function updateCarousel() {
    // Remove all child elements from the container
    while (projectsContent.firstChild) {
        projectsContent.removeChild(projectsContent.firstChild);
    }

    // Calculate visible projects
    const visibleProjects = [
        projectItems[currentIndex % projectItems.length],
        projectItems[(currentIndex + 1) % projectItems.length],
        projectItems[(currentIndex + 2) % projectItems.length]
    ];

    // Append visible projects to the container
    visibleProjects.forEach((project) => {
        projectsContent.appendChild(project);
    });

    // Apply class to the middle project
    visibleProjects.forEach((item, index) => {
        item.classList.toggle('middle', index === 1);
    });
}

// Debouncing click events for the carousel
let isCarouselTransitioning = false;

function handleArrowClick(direction) {
    if (isCarouselTransitioning) return; // Prevent multiple clicks during transition

    isCarouselTransitioning = true;
    currentIndex = (direction === 'left')
        ? (currentIndex === 0 ? projectItems.length - 1 : currentIndex - 1)
        : (currentIndex + 1) % projectItems.length;
    
    updateCarousel();

    // Set a short timeout before allowing the next click
    setTimeout(() => isCarouselTransitioning = false, 500);
}

document.querySelector('.left-arrow').addEventListener('click', () => handleArrowClick('left'));
document.querySelector('.right-arrow').addEventListener('click', () => handleArrowClick('right'));

// Initialize the carousel on page load
updateCarousel();
