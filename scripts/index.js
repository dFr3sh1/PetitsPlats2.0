import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import Filter from './components/filter.js';
import { createTagButton } from './components/filteredTag.js';
import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';
import { handleSearchInput, updateFilters } from './components/searchBar.js';
import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from './components/updateUI.js';

// Stock the selectedTags
export const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

// Function to handle filter option click
export function handleOptionClick(filterElement, item) {
    const filterContainer = filterElement.closest('.filter');
    const filterType = filterContainer.getAttribute('data-type');

    if (!filterType) {
        console.error('Unrecognized filter type.');
        return;
    }

    // Get the correct selectedTags array based on the filter type
    let selectedTagsArray;
    if (filterType === 'ingredients') {
        selectedTagsArray = selectedTags.ingredients;
    } else if (filterType === 'appliances') {
        selectedTagsArray = selectedTags.appliances;
    } else if (filterType === 'ustensils') {
        selectedTagsArray = selectedTags.ustensils;
    }

    // Pass the selectedTagsArray to createTagButton
    createTagButton(item, filterContainer, selectedTagsArray);
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector('.recipesSection');
    const filtersDiv = document.querySelector('.filtersDiv');

    try {
        // Display all recipes
        const recipes = getAllRecipes();
        updateRecipeCards(recipes);

        // Init search functionality
        handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags);
        updateFilters(selectedTags);

        // Display filter ingredient
        const ingredients = getAllIngredients();
        const ingredientFilterButton = new Filter(ingredients, 'Ingrédients');
        ingredientFilterButton.DOMElement.setAttribute('data-type', 'ingredients'); 
        filtersDiv.appendChild(ingredientFilterButton.DOMElement);

        ingredientFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            createDropdownMenu(ingredientFilterButton.DOMElement, ingredients);
            changeBtnIcon(ingredientFilterButton.DOMElement);
        });

        // Display filter appliances
        const appliances = getAllAppliances();
        const applianceFilterButton = new Filter(appliances, 'Appareils');
        applianceFilterButton.DOMElement.setAttribute('data-type', 'appliances'); 
        filtersDiv.appendChild(applianceFilterButton.DOMElement);

        applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            createDropdownMenu(applianceFilterButton.DOMElement, appliances);
            changeBtnIcon(applianceFilterButton.DOMElement);
        });

        // Display filter ustensils
        const ustensils = getAllUstensils();
        const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
        ustensilFilterButton.DOMElement.setAttribute('data-type', 'ustensils'); 
        filtersDiv.appendChild(ustensilFilterButton.DOMElement);

        ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            createDropdownMenu(ustensilFilterButton.DOMElement, ustensils);
            changeBtnIcon(ustensilFilterButton.DOMElement);
        });

    } catch (error) {
        console.error('Error:', error);
    }
});
