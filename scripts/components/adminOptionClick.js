
import { createTagButton } from "./createTagButton.js";
import { filterRecipes } from "./filterRecipes.js";
import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from "./updateUI.js";
import { buttonManager } from "./buttonManager.js";

// Function to handle filter option click
export function handleOptionClick(filterElement, item, selectedTags, recipes) {
    const filterContainer = filterElement.closest('.filter');
    const filterType = filterContainer.getAttribute('data-type');

    if (!filterType) {
        console.error('Unrecognized filter type.' + filterType);
        return;
    }

    // Get the correct selectedTags array based on the filter type
    let selectedTagsArray;
    if (filterType === 'ingredients') {
        selectedTagsArray = selectedTags.ingredients;
    } else if (filterType === 'appliances') {
        selectedTagsArray = selectedTags.appliances;
    } else if (filterType === 'utensils') {
        selectedTagsArray = selectedTags.utensils;
    } else {
        console.error('Invalid filter type: ' + filterType);
        return;
    }

    selectedTagsArray.push(item)
    
    console.log("Updated selectedTagsArray, from adminOptionCLick:", selectedTagsArray);
    console.log("Full selectedTags object, from adminOptionClick:", selectedTags);
    const filteredRecipes = filterRecipes(recipes, filterType, selectedTags);
    console.log("Filtered Recipes by filterRecipes ", filteredRecipes)
    
    // Create tag button with improved error handling
    try {
        createTagButton(item, filterContainer, selectedTagsArray);
        buttonManager(recipes, selectedTags);
    } catch (error) {
        console.error('Error creating tag button: ' + error);
    }
    
    // updateRecipesFound(recipes.length);
    // console.log(updateRecipesFound(recipes.length))
    // if (filteredRecipes.length > 0) {
    //     updateRecipeCards(recipes)
    //     console.log(updateRecipeCards(recipes))
    // } else {
    //     displayNoResultsMessage()
    // }
    // Give time to fetch let selectedTags
    setTimeout(() => {
        console.log("Time set to selectedTag before loaded in the DOM, from adminOptionClick",selectedTags);
    }, 0)
}