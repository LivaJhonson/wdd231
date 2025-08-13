// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
});


// ==========================
// Recipe Search Functionality
// ==========================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipes = document.querySelectorAll('#recipeGrid .recipe-card');

function filterRecipes() {
    const query = searchInput.value.toLowerCase().trim();
    recipes.forEach(recipe => {
        const title = recipe.querySelector('h3').textContent.toLowerCase();
        const ingredients = recipe.getAttribute('data-ingredients').toLowerCase();
        if (title.includes(query) || ingredients.includes(query)) {
            recipe.style.display = '';
        } else {
            recipe.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', filterRecipes);
searchInput.addEventListener('keyup', filterRecipes);
