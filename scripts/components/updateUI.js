import RecipeCardTemplate from './card.js'

export function updateRecipeCards(recipes) {
    const cardContainer = document.querySelector('.recipesSection');
    cardContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe);
        cardContainer.appendChild(card.DOMElement);
    });
}

export function updateRecipesFound(count) {
    const resultCountElement = document.getElementById('resultsCount');
    resultCountElement.textContent = `${count}`;
}

export function displayNoResultsMessage() {
    const cardContainer = document.querySelector('.recipesSection');
    cardContainer.innerHTML = '<p>Aucune recette trouvée.</p>';
}