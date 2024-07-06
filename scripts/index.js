import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import { createIngredientsArray } from './components/filter.js';
//import displayMediaRecipe from './utils/displayMedia.js';

const CardContainer = document.querySelector('.recipesSection')

async function main() {
    try {

        const recipes = await getAllRecipes();
        
        recipes.forEach(recipe => {
            const card = new RecipeCardTemplate(recipe)

            CardContainer.appendChild(card.DOMElement)
        })

        createIngredientsArray(recipes)

    } catch (error) {
        console.error ('Error:', error)
    }
    
}

main()