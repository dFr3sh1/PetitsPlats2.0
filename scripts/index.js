import { getAllRecipes } from './model/model.js';
import RecipeCardTemplate from './components/card.js';

const CardContainer = document.querySelector('.recipesSection')

async function main() {
    try {

        const recipes = await getAllRecipes();
        
        recipes.forEach(recipe => {
            const card = new RecipeCardTemplate(recipe)

            CardContainer.appendChild(card.DOMElement)
        })

    } catch (error) {
        console.error ('Error:', error)
    }
}

main()