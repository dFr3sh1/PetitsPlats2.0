    import { getAllRecipes, getAllAppliances, getAllIngredients, getAllUstensils } from './model/model.js';
    import Filter from './components/filter.js';
    import { createTagButton } from './components/filteredTag.js';
    import { createDropdownMenu, changeBtnIcon } from './components/dropdownMenu.js';
    import { handleSearchInput, updateFilters } from './components/searchBar.js';
    import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from './components/updateUI.js';
    import { getSelectedTags } from './components/selectedTags.js';

    // Stock the selectedTags
    
    export let selectedTags = {
        ingredients: [],
        appliances: [],
        ustensils: [],
    };

    // Function to handle filter option click
    export function handleOptionClick(filterElement, item, recipes, selectedTags) {
        const filterContainer = filterElement.closest('.filter');
        const filterType = filterContainer.getAttribute('data-type');

        if (!filterType) {
            console.error('Unrecognized filter type.');
            return;
        }
        
        // Get the correct selectedTags array based on the filter type
        let selectedTagsArray;
        if (filterType == 'ingredients') {
            selectedTagsArray = selectedTags.ingredients;
        } else if (filterType == 'appliances') {
            selectedTagsArray = selectedTags.appliances;
        } else if (filterType == 'ustensils') {
            selectedTagsArray = selectedTags.ustensils;
        }
        
        // Pass the selectedTagsArray to createTagButton
        createTagButton(item, filterContainer, recipes, selectedTagsArray);
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
                console.log(selectedTags)
                createDropdownMenu(ingredientFilterButton.DOMElement, ingredients, recipes, selectedTags);
                changeBtnIcon(ingredientFilterButton.DOMElement);
            });
    
            // Display filter appliances
            const appliances = getAllAppliances();
            const applianceFilterButton = new Filter(appliances, 'Appareils');
            applianceFilterButton.DOMElement.setAttribute('data-type', 'appliances'); 
            filtersDiv.appendChild(applianceFilterButton.DOMElement);
    
            // Event listener for dropdown and button icon toggle for appliances
            applianceFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                createDropdownMenu(applianceFilterButton.DOMElement, appliances, recipes, selectedTags);
                changeBtnIcon(applianceFilterButton.DOMElement);
            });
    
            // Display filter utensils
            const ustensils = getAllUstensils();
            const ustensilFilterButton = new Filter(ustensils, 'Ustensiles');
            ustensilFilterButton.DOMElement.setAttribute('data-type', 'ustensils'); 
            filtersDiv.appendChild(ustensilFilterButton.DOMElement);
            
            // Event listener for dropdown and button icon toggle for utensils
            ustensilFilterButton.DOMElement.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                createDropdownMenu(ustensilFilterButton.DOMElement, ustensils, recipes, selectedTags);
                changeBtnIcon(ustensilFilterButton.DOMElement);
            });

    
        } catch (error) {
            console.error('Error in initializing filters:', error);
        }
    });    