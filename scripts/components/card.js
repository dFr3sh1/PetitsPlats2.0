import RecipeCardTemplate from '../templates/recipeCard'

export function displayCard(recipes) {
    const recipeContainer = document.querySelector('recipesSection');

    let allRecipesElements = [];

    recipes.forEach((recipe) => {
        recipeModel = new RecipeCardTemplate(recipe);
        recipeModel.getRecipes(recipes); //Pass all recipes here

        let recipeItem = recipeModel.DOMElement;
        allRecipesElements.push(recipeModel);

        recipeContainer.appendChild(recipeItem);        
    });

    return allRecipesElements

}