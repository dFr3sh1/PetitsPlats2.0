import { selectedTags, addTag } from './tagManager.js';
import { updateFilteredRecipes } from './recipesManager.js';
import { createTagButton } from './createTagButton.js';

// Function to manage the selected tag from the dropdown
export function handleOptionClick(filterElement, item, selectedTags, filteredRecipes, filteredRecipesDiv) {

    // export function handleOptionClick(filterElement, item, selectedTags, filteredRecipes, filteredRecipesDiv) {
    const filterContainer = filterElement.closest('.filter');
    const filterType = filterContainer.getAttribute('data-type');

    if (!filterType) {
        console.error('Unrecognized filter type:', filterType);
        return;
    }

    addTag(filterType, item)

        try {
            // Ensure filteredRecipesDiv is defined before passing

            if (filteredRecipesDiv) {
                createTagButton(item, filterContainer, selectedTags, filteredRecipes, filteredRecipesDiv);
            } else {
                console.error('filteredRecipesDiv is not defined.');
            }
        } catch (error) {
            console.error('Error creating tag button:', error);
        }

        // Call `updateFilteredRecipes` if `filteredRecipesDiv` is defined
        if (filteredRecipesDiv) {
            updateFilteredRecipes(selectedTags, filteredRecipes, filteredRecipesDiv)
        } else {
            console.error("filteredRecipesDiv is undefined; cannot update filtered recipes.");
        }
        // else {
        //     console.warn(`Tag "${item}" is already selected in "${filterType}"`);
        // }
    
        // Log `selectedTags` after a delay to ensure asynchronous updates
        setTimeout(() => {
            console.log("Updated selected tags:", selectedTags);
        }, 0);
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
