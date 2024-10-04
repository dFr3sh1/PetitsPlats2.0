import { updateRecipesFound } from "./updateUI.js";

export function filterRecipesByTags(recipes, selectedTags, updateRecipeCards, displayNoResultsMessage) {
    const filteredRecipes = recipes.filter(recipe => {
        return selectedTags.every(tag => 
            recipe.ingredients.includes(tag) ||
            recipe.appliances.includes(tag) ||
            recipe.utensils.includes(tag)
        );
    });

    if (filteredRecipes.length === 0) {
        displayNoResultsMessage();
    } else {
        updateRecipeCards(filteredRecipes);
    }
    //Update found recipes
    updateRecipesFound(filteredRecipes.length)

    return filteredRecipes
}