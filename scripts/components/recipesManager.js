import { displayNoResultsMessage } from './updateUI.js';
import { getAllRecipes } from '../model/model.js';


export function updateFilteredRecipes(selectedTags, filteredRecipesDiv) {
    const { ingredients, appliances, utensils } = selectedTags;
    const recipes = getAllRecipes()

    const matchingRecipes = filteredRecipes(recipes, '', selectedTags)
    
    filteredRecipes.filter(recipe => {
        return (
            ingredients.every(tag => recipe.ingredients.includes(tag.toLowerCase())) &&
            appliances.every(tag => recipe.appliance.toLowerCase() === tag.toLowerCase()) &&
            utensils.every(tag => recipe.utensils.includes(tag.toLowerCase()))
        );
    });

    filteredRecipesDiv.innerHTML = '';
    if (matchingRecipes.length > 0) {
        matchingRecipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.textContent = recipe.title;
            filteredRecipesDiv.appendChild(recipeElement);
        });
    } else {
        displayNoResultsMessage(filteredRecipesDiv);
    }
}