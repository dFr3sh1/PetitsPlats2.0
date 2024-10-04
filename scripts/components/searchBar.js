export function handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound) {
    const searchInput = document.getElementById('searchBarInput');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length < 3) {
            updateRecipeCards(recipes); 
            updateRecipesFound(recipes.length);
            return;
        }

        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query) || 
                recipe.description.toLowerCase().includes(query) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));
            });

        updateRecipeCards(filteredRecipes);
        updateRecipesFound(filteredRecipes.length);
        
        if (filteredRecipes.length === 0) {
            displayNoResultsMessage();
        }
    });
}