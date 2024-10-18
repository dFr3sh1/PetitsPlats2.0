import { handleOptionClick } from "../index.js";

export function handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags) {
    const searchBar = document.querySelector('#searchBarInput');
    
    // Initial update to show all recipes count
    updateRecipesFound(recipes.length);

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();

        // Start search only after 3 characters
        if (searchTerm.length < 3 && selectedTags.ingredients.length === 0 && selectedTags.appliances.length === 0 && selectedTags.ustensils.length === 0) {
            updateRecipeCards(recipes); // Show all recipes if search term is less than 3 chars and no tags are selected
            updateRecipesFound(recipes.length); // Ensure we reset the count to 50
            return;
        }

        // Filter recipes based on the search term (e.g., title, ingredients, appliance, or utensils)
        let filteredRecipes = recipes.filter(recipe => {
            const recipeTitle = recipe.title ? recipe.title.toLowerCase() : ''; // Safeguard for undefined title
            const recipeIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.map(i => i.ingredient.toLowerCase()) : []; // Handle ingredient arrays
            const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : ''; // Safeguard for undefined appliance
            const recipeUstensils = Array.isArray(recipe.ustensils) ? recipe.ustensils.map(u => u.toLowerCase()) : []; // Handle ustensil arrays

            // Check if the search term is in the title, ingredients, appliance, or utensils
            const titleMatches = recipeTitle.includes(searchTerm);
            const ingredientsMatch = recipeIngredients.some(ingredient => ingredient.includes(searchTerm));
            const applianceMatches = recipeAppliance.includes(searchTerm);
            const ustensilsMatch = recipeUstensils.some(utensil => utensil.includes(searchTerm));

            return titleMatches || ingredientsMatch || applianceMatches || ustensilsMatch;
        });

        // If any tags are selected, refine the results further (intersection of tags)
        if (selectedTags.ingredients.length > 0 || selectedTags.appliances.length > 0 || selectedTags.ustensils.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                const recipeIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.map(i => i.ingredient) : [];
                const recipeAppliance = recipe.appliance ? recipe.appliance : '';
                const recipeUstensils = Array.isArray(recipe.ustensils) ? recipe.ustensils : [];

                // Check if the recipe matches ALL selected tags (intersection)
                const matchesIngredients = selectedTags.ingredients.every(tag => recipeIngredients.includes(tag));
                const matchesAppliances = selectedTags.appliances.every(tag => recipeAppliance.includes(tag));
                const matchesUstensils = selectedTags.ustensils.every(tag => recipeUstensils.includes(tag));
                return matchesIngredients && matchesAppliances && matchesUstensils;
            });
        }

        // Update the number of recipes found
        updateRecipesFound(filteredRecipes.length);

        // Display filtered recipes or show no results message
        if (filteredRecipes.length > 0) {
            updateRecipeCards(filteredRecipes);
        } else {
            displayNoResultsMessage();
        }
    });
}


export function updateFilters(filteredRecipes) {
    const ingredients = getUniqueIngredientsFromRecipes(filteredRecipes);
    const appliances = getUniqueAppliancesFromRecipes(filteredRecipes);
    const utensils = getUniqueUtensilsFromRecipes(filteredRecipes);
    
    // Update the dropdowns for ingredients, appliances, and utensils
    // updateIngredientDropdown(ingredients);
    // updateApplianceDropdown(appliances);
    // updateUtensilDropdown(utensils);
    
}

const selectedTags = handleOptionClick.selectedTags

function getUniqueIngredientsFromRecipes(selectedTags) {
    const filteredRecipes = selectedTags.ingredients;
    return;
}
function getUniqueAppliancesFromRecipes(selectedTags) {
    const filteredRecipes = selectedTags.appliances;
    return;
}
function getUniqueUtensilsFromRecipes(selectedTags) {
    const filteredRecipes = selectedTags.ustensils;
    return;
}