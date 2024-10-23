import { selectedTags } from "../index.js";
import { getAllRecipes } from "../model/model.js";
import { clearFilterTags } from "./clearTags.js";
import { toggleClearButton } from "./clearTags.js";
import { filterRecipesByTags } from "./filterTags.js";
import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from "./updateUI.js";


export function createTagButton(tagName, filterContainer, selectedTagsArray) {
    // Check if tag already exists
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if (existingTag) return; // Tag already exists

    // Limit to 3 tags
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

    removeIcon.addEventListener('click', () => {
        tagButton.remove(); // Remove the tag button from DOM
        const index = selectedTagsArray.indexOf(tagName);
        if (index > -1) selectedTagsArray.splice(index, 1); // Remove the tag from the array
        updateFilteredRecipes(); // Update recipes when tag is removed
    });

    // Add tag button to filteredRecipesDiv
    let filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    if (!filteredRecipesDiv) {
        filteredRecipesDiv = document.createElement('div');
        filteredRecipesDiv.classList.add('filteredRecipesDiv');
        filterContainer.appendChild(filteredRecipesDiv);
    }
    filteredRecipesDiv.classList.add('visible');
    filteredRecipesDiv.appendChild(tagButton);

    // Update recipes when new tag is added
    updateFilteredRecipes();
}


function updateFilteredRecipes() {
    const recipes = getAllRecipes(); // Fetch all recipes
    const filteredRecipes = filterRecipesByTags(recipes, selectedTags); // Filter based on tags

    if (filteredRecipes.length === 0) {
        displayNoResultsMessage();
    } else {
        updateRecipeCards(filteredRecipes);
    }
    updateRecipesFound(filteredRecipes.length); // Update found recipes count
}
