import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import Filter from './components/filter.js'   
// import { createIngredientsArray } from './components/filter.js';
//import displayMediaRecipe from './utils/displayMedia.js';

const CardContainer = document.querySelector('.recipesSection')
const filtersDiv = document.querySelector('.filtersDiv')

try {

    /* Display all recipes */
    const recipes = getAllRecipes();
    
    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe)
        CardContainer.appendChild(card.DOMElement)
    })

    /* Display filter ingredient */
    const ingredients = getAllIngredients();

    const ingredientFilterButton = new Filter(ingredients, 'Ingrédients');
    filtersDiv.appendChild(ingredientFilterButton.DOMElement);
    
    /* Display filter appliances */
    const appliance = getAllAppliances();

    const applianceFilterButton = new Filter(appliance, 'Appareils');
    filtersDiv.appendChild(applianceFilterButton.DOMElement);

    /* Display filter appliances */
    const ustensils = getAllUstensils();

    const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
    filtersDiv.appendChild(ustensilFilterButton.DOMElement);
    

} catch (error) {
    console.error ('Error:', error)
}