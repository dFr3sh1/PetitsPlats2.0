import { createTagButton } from './createTagButton.js';

// Function to manage the selected tag from the dropdown
export function handleOptionClick(filterElement, item, selectedTags) {
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

    // Create tag button with improved error handling
    try {
        createTagButton(item, filterContainer, selectedTagsArray);
    } catch (error) {
        console.error('Error creating tag button: ' + error);
    }
    setTimeout(() => {
        console.log(selectedTags);
    }, 0)
}



    // const filterContainer = filterElement.closest('.filter');
    // const filterType = filterContainer.getAttribute('data-type');

    // if (!filterType) {
    //     console.error('Unrecognized filter type:', filterType);
    //     return;
    // }

    // // Add the tag to selectedTags dynamically using addTag from tagManager.js
    // addTag(filterType, item);
    // createTagButton(item, filterContainer, selectedTags[filterType], filteredRecipes, filteredRecipesDiv);
    
    // // Update displayed recipes based on selected tags and search term
    // updateFilteredRecipes(selectedTags, filteredRecipesDiv, filteredRecipes);

    // console.log("Updated selected tags:", selectedTags);
