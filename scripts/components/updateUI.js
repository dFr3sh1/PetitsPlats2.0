import RecipeCardTemplate from './card.js'

export function updateRecipeCards(recipes) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe);
        cardContainer.appendChild(card.DOMElement);
    });
}

export function updateRecipesFound(recipeCount) {
    const resultCountElement = document.getElementById('resultCount');
    resultCountElement.textContent = `${recipeCount}`;
}

export function displayNoResultsMessage() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '<p>Aucune recette trouvée.</p>';
}