// Typing Animation
const nameToType = "Erika Sy ";  // Replace with your name
const typedNameElement = document.getElementById('typed-name');

if (typedNameElement) {
    let charIndex = 0;
    let isDeleting = false;

    function typeAnimation() {
        const typingSpeed = 150; // Speed for typing
        const deletingSpeed = 100; // Speed for deleting
        const delayAfterComplete = 2000; // Delay before deleting

        // Set the typed content
        typedNameElement.textContent = nameToType.substring(0, charIndex);

        if (!isDeleting) {
            if (charIndex < nameToType.length) {
                charIndex++;
                setTimeout(typeAnimation, typingSpeed);
            } else {
                // Pause before deleting
                setTimeout(() => isDeleting = true, delayAfterComplete);
                setTimeout(typeAnimation, delayAfterComplete);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                setTimeout(typeAnimation, deletingSpeed);
            } else {
                isDeleting = false;
                setTimeout(typeAnimation, typingSpeed);
            }
        }
    }

    // Start the typing animation
    typeAnimation();
} else {
    console.error('Element with ID "typed-name" not found.');
}

// Carousel Functionality
// Carousel Functionality with Circular Shifting
const projectsContent = document.querySelector('.projects-content');
let projectItems = Array.from(document.querySelectorAll('.project-item')); // Get all the project items
let currentIndex = 0; // Start from the first project

function updateCarousel() {
    projectsContent.innerHTML = ''; // Clear the content
    
    // Re-arrange the projectItems array for the current index
    const visibleProjects = [
        projectItems[currentIndex % projectItems.length],
        projectItems[(currentIndex + 1) % projectItems.length],
        projectItems[(currentIndex + 2) % projectItems.length]
    ];

    // Append visible projects to the container
    visibleProjects.forEach(project => {
        projectsContent.appendChild(project);
    });

    // Highlight the middle project
    visibleProjects.forEach((item, index) => {
        item.classList.remove('middle');
        if (index === 1) {
            item.classList.add('middle'); // Make the second project larger (middle one)
        }
    });
}

document.querySelector('.left-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? projectItems.length - 1 : currentIndex - 1;
    updateCarousel();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projectItems.length;
    updateCarousel();
});

// Initialize carousel
updateCarousel();
