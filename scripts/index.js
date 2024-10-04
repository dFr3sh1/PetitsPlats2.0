import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
import RecipeCardTemplate from './components/card.js';
import Filter from './components/filter.js';
import { createTagButton } from './components/filteredTag.js';
import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';
import { clearFilterTags } from './components/clearTags.js';

const CardContainer = document.querySelector('.recipesSection');
const filtersDiv = document.querySelector('.filtersDiv');

// Stock the selectedTags
const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

export function handleOptionClick(filterElement, item) {
    const filterContainer = filterElement.closest('.filter');

    // Identify button clicked
    const filterName = filterElement.textContent.trim().toLowerCase();
    let filterType;

    if (filterName.includes('ingrédients')) {
        filterType = 'ingredients';
    } else if (filterName.includes('appareils')) {
        filterType = 'appliances';
    } else if (filterName.includes('ustensiles')) {
        filterType = 'ustensils';
    } else {
        console.error('Filtre non reconnu:', filterName);
        return;
    }

    if (!selectedTags[filterType]) {
        console.error('Filtre non reconnu ou indéfini', filterType);
        return;
    }

    // Create a tag button with the list
    createTagButton(item, filterContainer, selectedTags[filterType]);

    // Ensure clear button behaves correctly
    clearFilterTags(filterContainer);
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
    filtersDiv.appendChild(ingredientFilterButton.DOMElement);

    ingredientFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(ingredientFilterButton.DOMElement, ingredients);
        changeBtnIcon(ingredientFilterButton.DOMElement);
    });

    // Display filter appliances
    const appliance = getAllAppliances();
    const applianceFilterButton = new Filter(appliance, 'Appareils');
    filtersDiv.appendChild(applianceFilterButton.DOMElement);

    applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(applianceFilterButton.DOMElement, appliance);
        changeBtnIcon(applianceFilterButton.DOMElement);
    });

    // Display filter ustensils
    const ustensils = getAllUstensils();
    const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
    filtersDiv.appendChild(ustensilFilterButton.DOMElement);

    ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        createDropdownMenu(ustensilFilterButton.DOMElement, ustensils);
        changeBtnIcon(ustensilFilterButton.DOMElement);
    });

} catch (error) {
    console.error('Error:', error);
}