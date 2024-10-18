import RecipeCardTemplate from './card.js'

export function updateRecipeCards(recipes) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    console.log(cardContainer);

    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe);
        cardContainer.appendChild(card.DOMElement);
    });
}

export function updateRecipesFound(recipeCount) {
    const resultCountElement = document.getElementById('resultsCount');
    resultCountElement.textContent = `${count}`;
}

export function displayNoResultsMessage() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '<p>Aucune recette trouvée.</p>';
}