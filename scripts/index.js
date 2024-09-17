import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import Filter from './components/filter.js'   
import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';

const CardContainer = document.querySelector('.recipesSection')
const filtersDiv = document.querySelector('.filtersDiv')

try {

    //Display all recipes
    const recipes = getAllRecipes();
    
    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe)
        CardContainer.appendChild(card.DOMElement)
    })

    //Display filter ingredient
    const ingredients = getAllIngredients();

    const ingredientFilterButton = new Filter(ingredients, 'Ingrédients');
    filtersDiv.appendChild(ingredientFilterButton.DOMElement);

    ingredientFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); //Prevent the event from bubbling up
        createDropdownMenu(ingredientFilterButton.DOMElement, ingredients);
        changeBtnIcon(ingredientFilterButton.DOMElement);
    });
    
    //Display filter appliances
    const appliance = getAllAppliances();

    const applianceFilterButton = new Filter(appliance, 'Appareils');
    filtersDiv.appendChild(applianceFilterButton.DOMElement);

    applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(applianceFilterButton.DOMElement, appliance);
        changeBtnIcon(applianceFilterButton.DOMElement);
    })

    //Display filter appliances
    const ustensils = getAllUstensils();

    const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
    filtersDiv.appendChild(ustensilFilterButton.DOMElement);

    ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(ustensilFilterButton.DOMElement, ustensils);
        changeBtnIcon(ustensilFilterButton.DOMElement);

    });

    
    // Close dropdown when clicking outside
    // document.addEventListener('click', () => {
    //     document.querySelectorAll('.dropdown-container').forEach(dropdown => {
    //         dropdown.remove();
    //     });
    // });

} catch (error) {
    console.error ('Error:', error)
}