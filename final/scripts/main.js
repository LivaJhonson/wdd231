import { setupModal, showModal } from './modal.js';
import { applyTheme, setupThemeToggle } from './theme.js';

const recipesContainer = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let allRecipes = [];

// Function to fetch recipes from a local JSON file
async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allRecipes = data;
        displayRecipes(allRecipes);
    } catch (e) {
        console.error('Could not fetch recipes:', e);
        recipesContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
    }
}

// Function to display recipes on the page
function displayRecipes(recipes) {
    recipesContainer.innerHTML = ''; // Clear existing content
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        // Use a template literal to build the card's HTML
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
            <div class="card-text">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <button class="btn view-recipe-btn">View Recipe</button>
            </div>
        `;
        // Attach click event to show the modal
        const viewBtn = recipeCard.querySelector('.view-recipe-btn');
        viewBtn.addEventListener('click', () => showModal(recipe));

        recipesContainer.appendChild(recipeCard);
    });
}

// Function to filter recipes based on search query
function filterRecipes() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = allRecipes.filter(recipe => {
        const title = recipe.name.toLowerCase();
        const ingredients = recipe.ingredients.map(i => i.toLowerCase()).join(' ');
        return title.includes(query) || ingredients.includes(query);
    });
    displayRecipes(filtered);
}

// Event listeners for the search functionality
searchBtn.addEventListener('click', filterRecipes);
searchInput.addEventListener('keyup', filterRecipes);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes();
    setupModal();
    applyTheme();
    setupThemeToggle();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});