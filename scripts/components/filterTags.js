import { updateRecipesFound } from "./updateUI.js";

export function filterRecipesByTags(recipes, selectedTags) {
    const { ingredients: selectedIngredients, appliances: selectedAppliances, ustensils: selectedUstensils } = selectedTags;

    return recipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
        const recipeAppliance = recipe.appliance.toLowerCase();
        const recipeUstensils = recipe.ustensils.map(u => u.toLowerCase());

        // Check if all selected ingredients, appliances, and utensils are present in the recipe
        const matchesIngredients = selectedIngredients.every(tag => recipeIngredients.includes(tag.toLowerCase()));
        const matchesAppliances = selectedAppliances.every(tag => recipeAppliance.includes(tag.toLowerCase()));
        const matchesUstensils = selectedUstensils.every(tag => recipeUstensils.includes(tag.toLowerCase()));

        return matchesIngredients && matchesAppliances && matchesUstensils;
    });
}

