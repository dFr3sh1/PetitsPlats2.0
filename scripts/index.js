import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import Filter from './components/filter.js';
import { createDropdownMenu, changeBtnIcon } from './components/createDropdownMenu.js';
import { handleSearchInput } from './components/searchBar.js';
import { updateFilters } from './components/filterRecipes.js';
import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from './components/updateUI.js';


// Display all recipes
export const recipes = getAllRecipes();

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector('.recipesSection');
    const filtersDiv = document.querySelector('.filtersDiv');


    try {

        // Check if recipes is an array
        if (!Array.isArray(recipes)) {
            throw new Error("Expected an array of recipes, but got " + typeof recipes);
        }

        updateRecipeCards(recipes);

        // Init search functionality
        handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags);
        updateFilters(recipes);  // Pass recipes here

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

        // Display filter utensils
        const utensils = getAllUstensils();
        const ustensilFilterButton = new Filter(utensils, 'Ustensiles');
        ustensilFilterButton.DOMElement.setAttribute('data-type', 'utensils'); 
        filtersDiv.appendChild(ustensilFilterButton.DOMElement);

        ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            createDropdownMenu(ustensilFilterButton.DOMElement, utensils);
            changeBtnIcon(ustensilFilterButton.DOMElement);
        });
        
    } catch (error) {
        console.error('Error in initializing filters:', error);
    }
});    