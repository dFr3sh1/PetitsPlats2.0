import { updateRecipeCards, updateRecipesFound, displayNoResultsMessage } from "./updateUI.js";
import { clearFilterTags, toggleClearButton } from "./clearTags.js";
import { selectedTags } from "./tagManager.js";
import { filterRecipes } from "./filterRecipes.js";


export function createTagButton(tagName, filterContainer, selectedTagsArray) {
    // Check if tag already exists
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if (existingTag) return; // Tag already exists

    // Limit to 3 tags
    if (selectedTagsArray.length >= 4) {
        const firstTag = selectedTagsArray.shift(); // Remove the first tag
        const firstTagButton = filterContainer.querySelector(`button.tag[data-tag="${firstTag}"]`);
        if (firstTagButton) firstTagButton.remove(); // Remove first tag button from DOM
    }

    // Add new tag
    //selectedTagsArray.push(tagName);
    console.log("Displays selectedTagsArray of button creation, from createTagButton", selectedTagsArray)
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName);
    tagButton.textContent = tagName;

    // Add remove icon and functionality
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
    tagButton.appendChild(removeIcon);

    //Remove tag on clicking the remove icon
    removeIcon.addEventListener('click', () => {
        tagButton.remove(); // Remove the tag button from DOM
        const index = selectedTagsArray.indexOf(tagName);
        if (index > -1) selectedTagsArray.splice(index, 1); // Remove the tag from the array
        if(filteredRecipesDiv.querySelectorAll('button.tag').length === 0) {
            filteredRecipesDiv.classList.remove('visible')
        }
        // toggleClearButton(filteredRecipesDiv, clearButton);
        
        //updateFilteredRecipes(selectedTags); // Update recipes when tag is removed
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

    //Clear button for 3 or more tags
    const clearButton = filterContainer.querySelector('.clear-btn');
    toggleClearButton(filteredRecipesDiv, clearButton);

    if(selectedTagsArray.length >= 3) {
        clearFilterTags(filterContainer);
    }

    //Update recipes when new tag is added
    //updateFilteredRecipes(selectedTags);
}


// export function updateFilteredRecipes(recipes, filterType, selectedTags) {

//     const filteredRecipes = filteredRecipes(recipes, filterType, selectedTags)
//     console.log(filteredRecipes);
//     if (filteredRecipes.length === 0) {
//         displayNoResultsMessage();
//     } else {
//         updateRecipeCards(filteredRecipes);
//     }
//     updateRecipesFound(filteredRecipes.length); // Update found recipes count

// }
