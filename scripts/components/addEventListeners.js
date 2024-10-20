import { handleSearchInput } from './searchBar.js';
import { filterByTags } from './filterTags.js';
import { updateRecipeCards, displayNoResultsMessage } from './updateUI.js';

// Recipes init
export function initEventListeners(recipes, selectedTags) {
    const searchInput = document.querySelector('.searchBar input');

    // SearchBar mgm
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        if (searchTerm.length >= 3) {
            const filteredRecipes = handleSearchInput(recipes, searchTerm);
            if (filteredRecipes.length === 0) {
                displayNoResultsMessage(searchTerm);
            } else {
                updateRecipeCards(filteredRecipes);
            }
        } else {
            updateRecipeCards(recipes); // Display all recipes if less than three characters
        }
    });

    // Tags research mgm
    document.querySelector('.SelectedTag').addEventListener('click', () => {
        const filteredRecipes = filterByTags(recipes, selectedTags);
        console.log(filteredRecipes)
        if (filteredRecipes.length === 0) {
            displayNoRecipesFound('tags sélectionnés');
        } else {
            updateRecipesDisplay(filteredRecipes);
        }
    });
}
