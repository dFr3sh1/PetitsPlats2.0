import { createDropdownMenu } from "./dropdownMenu.js";
import { filterRecipes } from "./filterRecipes.js";

export function handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags) {
    const searchBar = document.querySelector('#searchBarInput');
    
    // Initial update to show all recipes count
    updateRecipesFound(recipes.length);

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();

        //Search only if 3 or more characters are entered
        if (searchTerm.length >= 3 || selectedTags.ingredients.length > 0 || selectedTags.appliances.length > 0 || selectedTags.utensils.length > 0) {
            const filteredRecipes = filterRecipes(recipes, searchTerm, selectedTags);

            //handle displaying no results
            updateRecipesFound(filteredRecipes.length);
            if (filteredRecipes.length > 0) {
                updateRecipeCards(filteredRecipes);
            } else {
                displayNoResultsMessage();
            }
        } else {
            // If less than 3 characters entered, show all recipes again
            updateRecipesFound(recipes.length);
            updateRecipeCards(recipes);
        }
    });
}

export function updateFilters(filteredRecipes) {
    const ingredients = getUniqueIngredientsFromRecipes(filteredRecipes);
    const appliances = getUniqueAppliancesFromRecipes(filteredRecipes);
    const utensils = getUniqueUtensilsFromRecipes(filteredRecipes);

    // Call the dropdown update functions to refresh the dropdown menus
    updateIngredientDropdown(ingredients);
    updateApplianceDropdown(appliances);
    updateUtensilDropdown(utensils);
}

// Get unique ingredients from filtered recipes
function getUniqueIngredientsFromRecipes(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientsSet.add(ingredient.ingredient.toLowerCase())); // Ensure consistency in case formatting
    });
    return [...ingredientsSet]; // Return unique ingredients
}

// Get unique appliances from filtered recipes
function getUniqueAppliancesFromRecipes(recipes) {
    const appliancesSet = new Set();
    recipes.forEach(recipe => appliancesSet.add(recipe.appliance.toLowerCase())); // Ensure consistency in case formatting
    return [...appliancesSet]; // Return unique appliances
}

// Get unique utensils from filtered recipes
function getUniqueUtensilsFromRecipes(recipes) {
    const utensilsSet = new Set();
    recipes.forEach(recipe => {
        recipe.utensils.forEach(utensil => utensilsSet.add(utensil.toLowerCase())); // Ensure consistency in case formatting
    });
    return [...utensilsSet]; // Return unique utensils
}

// Update the ingredient dropdown menu
export function updateIngredientDropdown(ingredients) {
    const ingredientFilterButton = document.querySelector('[data-type="ingredients"]');
    if (ingredientFilterButton) {
        const buttonElement = ingredientFilterButton.querySelector('button');
        createDropdownMenu(buttonElement, ingredients); // Use the existing createDropdownMenu function
    }
}

// Update the appliance dropdown menu
export function updateApplianceDropdown(appliances) {
    const applianceFilterButton = document.querySelector('[data-type="appliances"]');
    if (applianceFilterButton) {
        const buttonElement = applianceFilterButton.querySelector('button');
        createDropdownMenu(buttonElement, appliances); // Use the existing createDropdownMenu function
    }
}

// Update the utensil dropdown menu
export function updateUtensilDropdown(utensils) {
    const utensilFilterButton = document.querySelector('[data-type="utensils"]');
    if (utensilFilterButton) {
        const buttonElement = utensilFilterButton.querySelector('button');
        createDropdownMenu(buttonElement, utensils); // Use the existing createDropdownMenu function
    }
}

