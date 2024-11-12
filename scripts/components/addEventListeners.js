import { handleSearchInput } from './searchBar.js';
import { updateRecipeCards, displayNoResultsMessage, updateRecipesFound } from './updateUI.js';


// Initialize event listeners for search and tags
export function initEventListeners(recipes, selectedTags) {
    // Handle search bar input
    const searchInput = document.querySelector('.searchBar input');
    handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags);

    // Handle tag search click
    document.querySelectorAll('.SelectedTag').forEach(tag => {
        tag.addEventListener('click', () => {
            const filteredRecipes = filterByTags(recipes, selectedTags);
            if (filteredRecipes.length === 0) {
                displayNoResultsMessage();
            } else {
                updateRecipeCards(filteredRecipes);
                updateRecipesFound(filteredRecipes);
            }
        });
    });
}
