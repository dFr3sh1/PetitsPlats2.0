import { selectedTags } from "../index.js";
import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from "./updateUI.js";
import { clearFilterTags, toggleClearButton } from "./clearTags.js";
import { filterRecipes } from "./filterRecipes.js";


// filteredTag.js (createTagButton function)
export function createTagButton(tagName, filterContainer, recipes, selectedTagsArray) {
    // Check if tag already exists
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if (existingTag) return; // Tag already exists

    console.log("Inside createTagButton:")

    // Validate recipes is an array before proceeding
    if (!Array.isArray(recipes)) {
        console.error("Expected an array of recipes in createTagButton, but got:", recipes);
        return;
    }
    console.log("Recipes passed to createTagButton", recipes);

    // Limit to 3 tags
    console.log(selectedTagsArray)
    if (selectedTagsArray.length >= 3) {
        const firstTag = selectedTagsArray.shift(); // Remove the first tag
        const firstTagButton = filterContainer.querySelector(`button.tag[data-tag="${firstTag}"]`);
        if (firstTagButton) firstTagButton.remove(); // Remove first tag button from DOM
    }

    // Add new tag
    selectedTagsArray.push(tagName);
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName);
    tagButton.textContent = tagName;

    // Add remove icon and functionality
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
    tagButton.appendChild(removeIcon);

    // Remove tag on clicking the remove icon
    removeIcon.addEventListener('click', () => {
        tagButton.remove(); // Remove the tag button from DOM
        const index = selectedTagsArray.indexOf(tagName);
        if (index > -1) selectedTagsArray.splice(index, 1); // Remove the tag from the array

        // Check if no tags left in `filteredRecipesDiv`
        const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
        if (filteredRecipesDiv && filteredRecipesDiv.querySelectorAll('button.tag').length === 0) {
            filteredRecipesDiv.remove(); // Remove the div from the DOM
        }

        // Update the clear button visibility after tag removal
        const clearButton = filterContainer.querySelector('.clear-btn');
        if (clearButton) toggleClearButton(filteredRecipesDiv, clearButton);

        // Update recipes after tag removal
        const searchTerm = document.querySelector('#searchBarInput').value.trim().toLowerCase();
        const filteredRecipes = filterRecipes(recipes, searchTerm, selectedTags);  // Use validated recipes
        updateRecipeCards(filteredRecipes);  // Update the UI with the filtered recipes
        updateRecipesFound(filteredRecipes.length);  // Update the count
    });

    // Add tag button to `filteredRecipesDiv`
    let filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    if (!filteredRecipesDiv) {
        filteredRecipesDiv = document.createElement('div');
        filteredRecipesDiv.classList.add('filteredRecipesDiv');
        filterContainer.appendChild(filteredRecipesDiv);
    }
    filteredRecipesDiv.classList.add('visible');
    filteredRecipesDiv.appendChild(tagButton);

    // Show clear button if there are 3 or more tags
    const clearButton = filterContainer.querySelector('.clear-btn');
    if (selectedTagsArray.length >= 3) {
        clearFilterTags(filterContainer, selectedTagsArray); // Call this to ensure the clear button is created
    }

    toggleClearButton(filteredRecipesDiv, clearButton);  // Ensure clear button visibility is updated

    // Update recipes when a new tag is added
    const searchTerm = document.querySelector('#searchBarInput').value.trim().toLowerCase();
    const filteredRecipes = filterRecipes(recipes, searchTerm, selectedTags);  // Centralized filtering
    updateRecipeCards(filteredRecipes);  // Update the UI with the filtered recipes
    updateRecipesFound(filteredRecipes.length);  // Update the count
}

export function updateFilteredRecipes(filteredRecipes) {
    // Simply update the UI with the filtered recipes
    if (filteredRecipes.length === 0) {
        displayNoResultsMessage();  // Function to handle no results case
    } else {
        updateRecipeCards(filteredRecipes);  // Function to display the filtered recipes
    }

    // Update the count of found recipes
    updateRecipesFound(filteredRecipes.length);
}

