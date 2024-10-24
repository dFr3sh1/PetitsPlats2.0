// Centralized filtering function based on search term and tags
export function filterRecipes(recipes, searchTerm, selectedTags) {
    // Add a validation to ensure recipes is always an array
    if (!Array.isArray(recipes)) {
        console.error("Expected an array of recipes, but got:", recipes);
        return [];
    }

    const { ingredients: selectedIngredients, appliances: selectedAppliances, ustensils: selectedUstensils } = selectedTags;

    // First, filter recipes based on the search term (if 3 or more characters are entered)
    let filteredRecipes = recipes;
    if (searchTerm.length >= 3) {
        filteredRecipes = recipes.filter(recipe => {
            const recipeTitle = recipe.title ? recipe.title.toLowerCase() : ''; 
            const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
            const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
            const recipeUstensils = recipe.ustensils.map(u => u.toLowerCase());

            // Match recipe title, ingredients, appliance, or utensils to search term
            return (
                recipeTitle.includes(searchTerm) ||
                recipeIngredients.some(ingredient => ingredient.includes(searchTerm)) ||
                recipeAppliance.includes(searchTerm) ||
                recipeUstensils.some(utensil => utensil.includes(searchTerm))
            );
        });
    }

    // Further filter by selected tags if any tags are present
    if (selectedIngredients.length > 0 || selectedAppliances.length > 0 || selectedUstensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
            const recipeAppliance = recipe.appliance ? recipe.appliance.toLowerCase() : '';
            const recipeUstensils = recipe.ustensils.map(u => u.toLowerCase());

            // Check if the recipe contains all the selected tags
            const matchesIngredients = selectedIngredients.every(tag => recipeIngredients.includes(tag.toLowerCase()));
            const matchesAppliances = selectedAppliances.every(tag => recipeAppliance.includes(tag.toLowerCase()));
            const matchesUstensils = selectedUstensils.every(tag => recipeUstensils.includes(tag.toLowerCase()));

            return matchesIngredients && matchesAppliances && matchesUstensils;
        });
    }

    return filteredRecipes;
}