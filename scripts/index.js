    import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
    import RecipeCardTemplate from './components/card.js';
    import Filter from './components/filter.js';
    import { createTagButton } from './components/filteredTag.js';
    import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';
    import { handleSearchInput, updateFilters } from './components/searchBar.js';
    import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from './components/updateUI.js';

    // Stock the selectedTags
    export const selectedTags = {
        ingredients: [],
        appliances: [],
        ustensils: [],
    };

    // Function to handle filter option click
    export function handleOptionClick(filterElement, item, recipes) {
        const filterContainer = filterElement.closest('.filter');
        const filterType = filterContainer.getAttribute('data-type');

        if (!filterType) {
            console.error('Unrecognized filter type.');
            return;
        }

        // Get the correct selectedTags array based on the filter type
        let selectedTagsArray;
        if (filterType === 'ingredients') {
            selectedTagsArray = selectedTags.ingredients;
        } else if (filterType === 'appliances') {
            selectedTagsArray = selectedTags.appliances;
        } else if (filterType === 'ustensils') {
            selectedTagsArray = selectedTags.ustensils;
        }

        console.log("Recipes passed in handleOptionClick: ", recipes)

        // Pass the selectedTagsArray to createTagButton
        createTagButton(item, filterContainer, selectedTagsArray, recipes);
    }

    // DOMContentLoaded event listener
    document.addEventListener("DOMContentLoaded", function () {
        const cardContainer = document.querySelector('.recipesSection');
        const filtersDiv = document.querySelector('.filtersDiv');
    
        try {
            // Fetch all recipes and validate it is an array
            const recipes = getAllRecipes();
            console.log("Fetched recipes: ", recipes)
            if (!Array.isArray(recipes)) {
                throw new Error("Expected an array of recipes but got " + typeof recipes);
            }
    
            // Display all recipes
            updateRecipeCards(recipes);
    
            // Init search functionality
            handleSearchInput(recipes, updateRecipeCards, displayNoResultsMessage, updateRecipesFound, selectedTags);
            updateFilters(recipes, selectedTags);
    
            // Display filter ingredients
            const ingredients = getAllIngredients();
            const ingredientFilterButton = new Filter(ingredients, 'Ingrédients');
            ingredientFilterButton.DOMElement.setAttribute('data-type', 'ingredients'); 
            filtersDiv.appendChild(ingredientFilterButton.DOMElement);
    
            // Event listener for dropdown and button icon toggle for ingredients
            ingredientFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                createDropdownMenu(ingredientFilterButton.DOMElement, ingredients, recipes);
                changeBtnIcon(ingredientFilterButton.DOMElement);
            });
    
            // Single tagSelected event listener for all tag selections
            // ingredientFilterButton.DOMElement.addEventListener('tagSelected', (event) => {
            //     const tagName = event.detail.tagName;
            //     console.log("Tag selected: ", tagName);
            //     console.log("Recipes at this point: ", recipes)
            //     if (!Array.isArray(recipes)) {
            //         console.error("Expected an array of recipes in createTagButton, but got: ", recipes);
            //         return;
            //     }
            //     createTagButton(tagName, filtersDiv, selectedTags.ingredients, recipes);  // Pass recipes correctly here
            // });
    
            // Display filter appliances
            const appliances = getAllAppliances();
            const applianceFilterButton = new Filter(appliances, 'Appareils');
            applianceFilterButton.DOMElement.setAttribute('data-type', 'appliances'); 
            filtersDiv.appendChild(applianceFilterButton.DOMElement);
    
            // Event listener for dropdown and button icon toggle for appliances
            applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                createDropdownMenu(applianceFilterButton.DOMElement, appliances, recipes);
                changeBtnIcon(applianceFilterButton.DOMElement);
            });
    
            // TagSelected event for appliances (only added once)
            // applianceFilterButton.DOMElement.addEventListener('tagSelected', (event) => {
            //     const tagName = event.detail.tagName;
            //     if (!Array.isArray(recipes)) {
            //         console.error("Expected an array of recipes in createTagButton, but got: ", recipes);
            //         return;
            //     }
            //     createTagButton(tagName, filtersDiv, selectedTags.appliances, recipes);  // Pass recipes correctly here
            // });
    
            // Display filter utensils
            const ustensils = getAllUstensils();
            const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
            ustensilFilterButton.DOMElement.setAttribute('data-type', 'ustensils'); 
            filtersDiv.appendChild(ustensilFilterButton.DOMElement);
    
            // Event listener for dropdown and button icon toggle for utensils
            ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                createDropdownMenu(ustensilFilterButton.DOMElement, ustensils, recipes);
                changeBtnIcon(ustensilFilterButton.DOMElement);
            });
    
            // TagSelected event for utensils (only added once)
            // ustensilFilterButton.DOMElement.addEventListener('tagSelected', (event) => {
            //     const tagName = event.detail.tagName;
            //     if (!Array.isArray(recipes)) {
            //         console.error("Expected an array of recipes in createTagButton, but got: ", recipes);
            //         return;
            //     }
            //     createTagButton(tagName, filtersDiv, selectedTags.ustensils, recipes);  // Pass recipes correctly here
            // });
    
        } catch (error) {
            console.error('Error in initializing filters:', error);
        }
    });    