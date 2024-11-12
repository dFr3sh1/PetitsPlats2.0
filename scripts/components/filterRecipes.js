import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from "../components/updateUI.js";

// Centralized filtering function based on search term and tags
export function filterRecipes(recipes, searchTerm, selectedTags) {
    // Add a validation to ensure recipes is always an array
    if (!Array.isArray(recipes)) {
        console.error("Expected an array of recipes, but got:", recipes);
        return [];
    }

    

     // First, filter recipes based on the search term (if 3 or more characters are entered)
    let filteredRecipes = recipes;
    if (searchTerm.length >= 3) {
        filteredRecipes = recipes.filter(recipe => {
            const recipeTitle = recipe.title ? recipe.title.toLowerCase() : ''; 
            const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
            const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
            const recipeUtensils = recipe.utensils.map(u => u.toLowerCase());

            // Match recipe title, ingredients, appliance, or utensils to search term
            return (
                recipeTitle.includes(searchTerm) ||
                recipeIngredients.some(ingredient => ingredient.includes(searchTerm)) ||
                recipeAppliance.includes(searchTerm) ||
                recipeUtensils.some(utensil => utensil.includes(searchTerm))
            );
        });

        console.log("Filtered Recipes filterRecipes.js", filteredRecipes)
    }

    // Further refine by selected tags (intersection logic)
    if (selectedTags.ingredients.length > 0 || selectedTags.appliances.length > 0 || selectedTags.utensils.length > 0) {
        console.log("SelectedTags from filteredRecipes",selectedTags)
        filteredRecipes = filteredRecipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
            const recipeAppliances = recipe.appliance.toLowerCase();
            const recipeUtensils = recipe.utensils.map(u => u.toLowerCase());
            
            const matchesIngredients = selectedTags.ingredients.every(tag => recipeIngredients.includes(tag.toLowerCase()));
            const matchesAppliances = selectedTags.appliances.every(tag => recipeAppliances.includes(tag.toLowerCase()));
            const matchesUtensils = selectedTags.utensils.every(tag => recipeUtensils.includes(tag.toLowerCase()));
            
            return matchesIngredients && matchesAppliances && matchesUtensils
        });
    }

    console.log("Real filtered recipes", filteredRecipes)
    return filteredRecipes;
}

    // Further filter by selected tags if any tags are present

    // const { ingredients: selectedIngredients, appliances: selectedAppliances, utensils: selectedUtensils } = selectedTags;
    // console.log("filteredRecipes test from button clicked", selectedTags)
    // if (selectedIngredients.length > 0 || selectedAppliances.length > 0 || selectedUtensils.length > 0) {
    //     filteredRecipes = filteredRecipes.filter(recipe => {
    //         const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
    //         const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
    //         const recipeUtensils = recipe.utensils.map(u => u.toLowerCase());

    //         // Check if the recipe contains all the selected tags
    //         const matchesIngredients = selectedIngredients.forEach(tag => recipeIngredients.includes(tag.toLowerCase()));
    //         const matchesAppliances = selectedAppliances.forEach(tag => recipeAppliance.includes(tag.toLowerCase()));
    //         const matchesUtensils = selectedUtensils.forEach(tag => recipeUtensils.includes(tag.toLowerCase()));

    //         return matchesIngredients || matchesAppliances || matchesUtensils;
    //     });



    // // First, filter recipes based on the search term (if 3 or more characters are entered)
    // let filteredRecipes = recipes;
    // if (searchTerm.length >= 3) {
    //     filteredRecipes = recipes.filter(recipe => {
    //         const recipeTitle = recipe.title ? recipe.title.toLowerCase() : ''; 
    //         const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
    //         const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
    //         const recipeUtensils = recipe.utensils.map(u => u.toLowerCase());

    //         // Match recipe title, ingredients, appliance, or utensils to search term
    //         return (
    //             recipeTitle.includes(searchTerm) ||
    //             recipeIngredients.some(ingredient => ingredient.includes(searchTerm)) ||
    //             recipeAppliance.includes(searchTerm) ||
    //             recipeUtensils.some(utensil => utensil.includes(searchTerm))
    //         );
    //     });
    // }

    // // Further filter by selected tags if any tags are present
    // if (selectedIngredients.length > 0 || selectedAppliances.length > 0 || selectedUtensils.length > 0) {
    //     filteredRecipes = filteredRecipes.filter(recipe => {
    //         const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
    //         const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
    //         const recipeUtensils = recipe.utensils.map(u => u.toLowerCase());

    //         // Check if the recipe contains all the selected tags
    //         const matchesIngredients = selectedIngredients.forEach(tag => recipeIngredients.includes(tag.toLowerCase()));
    //         const matchesAppliances = selectedAppliances.forEach(tag => recipeAppliance.includes(tag.toLowerCase()));
    //         const matchesUtensils = selectedUtensils.forEach(tag => recipeUtensils.includes(tag.toLowerCase()));

    //         return matchesIngredients && matchesAppliances && matchesUtensils;
    //     });


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
