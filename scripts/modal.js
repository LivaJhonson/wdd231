let modal, closeBtn, modalTitle, modalImage, modalIngredients, modalInstructions;

export function setupModal() {
    modal = document.getElementById('recipeModal');
    closeBtn = document.querySelector('.close-btn');
    modalTitle = document.getElementById('modalTitle');
    modalImage = document.getElementById('modalImage');
    modalIngredients = document.getElementById('modalIngredients');
    modalInstructions = document.getElementById('modalInstructions');
    
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

export function showModal(recipe) {
    modalTitle.textContent = recipe.name;
    modalImage.src = recipe.image;
    modalImage.alt = recipe.name;
    modalIngredients.innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    modalInstructions.textContent = recipe.instructions;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}