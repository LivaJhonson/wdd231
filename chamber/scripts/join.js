// scripts/join.js - Specific functionality for the Join page

document.addEventListener('DOMContentLoaded', () => {

    // --- Timestamp for Form ---
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // --- Membership Card Animation ---
    const membershipCards = document.querySelectorAll('.membership-card');
    // Use Intersection Observer for better performance if many cards, otherwise simple timeout
    // Or just add the class directly on DOMContentLoaded if you want instant animation
    
    // Simple solution: Add class after a short delay to trigger transition
    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show-card');
        }, 100 + (index * 100)); // Staggered animation
    });


    // --- Modals Functionality ---
    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const modals = document.querySelectorAll('.modal');

    // Open modal
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal; // Get the ID from data-modal attribute
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.style.display = 'flex'; // Use flex to center content
                targetModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Close modal via close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close modal when clicking outside of the content
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Check if the click was directly on the modal background
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') { // If modal is open
                    modal.style.display = 'none';
                    modal.setAttribute('aria-hidden', 'true');
                }
            });
        }
    });

});