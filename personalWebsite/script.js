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

        if (!isDeleting && charIndex <= nameToType.length) {
            // Type out the name
            typedNameElement.textContent = nameToType.substring(0, charIndex);
            charIndex++;
        } else if (isDeleting && charIndex >= 0) {
            // Delete the name
            typedNameElement.textContent = nameToType.substring(0, charIndex);
            charIndex--;
        }

        if (charIndex === nameToType.length) {
            isDeleting = true; // Start deleting after typing the full name
            setTimeout(typeAnimation, delayAfterComplete); // Wait before starting to delete
        } else if (charIndex === 0 && isDeleting) {
            isDeleting = false; // Reset after deletion is complete
            setTimeout(typeAnimation, typingSpeed); // Restart typing animation
        } else {
            // Continue typing or deleting with constant speed
            setTimeout(typeAnimation, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    // Start the typing animation
    typeAnimation();
} else {
    console.error('Element with ID "typed-name" not found.');
}
