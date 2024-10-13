import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import Filter from './components/filter.js';
import { createTagButton } from './components/filteredTag.js';
import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';
import { clearFilterTags } from './components/clearTags.js';
//import { toggleClearButton, clearFilterTags } from './components/clearTags.js';

const CardContainer = document.querySelector('.recipesSection');
const filtersDiv = document.querySelector('.filtersDiv');

// Stock the selectedTags
export const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

export function handleOptionClick(filterElement, item) {
    const filterContainer = filterElement.closest('.filter');
    const filterType = filterContainer.getAttribute('data-type');

    if (!filterType) {
        console.error('Unrecognized filter type.');
        return;
    }

    // Use selectedTags object for managing the selected tags array
    createTagButton(item, filterContainer);
    console.log(createTagButton)
}

try {
    // Display all recipes
    const recipes = getAllRecipes();
    recipes.forEach(recipe => {
        const card = new RecipeCardTemplate(recipe);
        CardContainer.appendChild(card.DOMElement);
    });

    // Display filter ingredient
    const ingredients = getAllIngredients();
    const ingredientFilterButton = new Filter(ingredients, 'Ingrédients');
    ingredientFilterButton.DOMElement.setAttribute('data-type', 'ingredients'); // Set data-type for ingredients
    filtersDiv.appendChild(ingredientFilterButton.DOMElement);


    ingredientFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(ingredientFilterButton.DOMElement, ingredients);
        changeBtnIcon(ingredientFilterButton.DOMElement);
    });

    // Display filter appliances
    const appliance = getAllAppliances();
    const applianceFilterButton = new Filter(appliance, 'Appareils');
    applianceFilterButton.DOMElement.setAttribute('data-type', 'appliances'); // Set data-type for appliances
    filtersDiv.appendChild(applianceFilterButton.DOMElement);

    applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(applianceFilterButton.DOMElement, appliance);
        changeBtnIcon(applianceFilterButton.DOMElement);
    });

    // Display filter ustensils
    const ustensils = getAllUstensils();
    const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
    ustensilFilterButton.DOMElement.setAttribute('data-type', 'ustensils'); // Set data-type for utensils
    filtersDiv.appendChild(ustensilFilterButton.DOMElement);

    ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(ustensilFilterButton.DOMElement, ustensils);
        changeBtnIcon(ustensilFilterButton.DOMElement);
    });

} catch (error) {
    console.error('Error:', error);
}