import { filterRecipes } from "./filterRecipes.js";
import { updateRecipeCards, displayNoResultsMessage, updateRecipesFound } from "./updateUI.js";

export function buttonManager(recipes, selectedTags) {
    const existingButton = document.querySelector('.tag');

    //Initial update show all recipes count
    updateRecipesFound(recipes.length);
    
    if(existingButton) {
        const filteredRecipes = filterRecipes(recipes, "", selectedTags)
        console.log("Filtered Recipes from buttonManager",filteredRecipes);
        console.log(filteredRecipes.length > 0)
        if(filteredRecipes.length > 0) {
            updateRecipeCards(filteredRecipes);
            updateRecipesFound(filteredRecipes.length);
            console.log("Button manager",filteredRecipes.length);
        } else {
            displayNoResultsMessage();
            updateRecipesFound(filteredRecipes.length);
        }};
}