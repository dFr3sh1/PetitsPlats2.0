<<<<<<< HEAD
import { selectedTags } from "../index.js";
import { getAllRecipes } from "../model/model.js";
import { filterRecipes } from "./filterRecipes.js";

export function clearFilterTags(filterContainer, selectedTagsArray) {
=======
import {selectedTags } from "./tagManager.js";
import { updateFilteredRecipes } from "./recipesManager.js";

export function clearFilterTags(filterContainer, filteredRecipes) {
>>>>>>> 049c2395974666fe896c0014f516f8a95e3adae0
    let clearButton = filterContainer.querySelector('.clear-btn');

    if (!clearButton) {
        // Create the clear button with the text "Nettoyer la sélection"
        clearButton = document.createElement('button');
        clearButton.classList.add('clear-btn');
        clearButton.setAttribute('aria-label', 'Nettoyer la sélection');
        clearButton.setAttribute('role', 'button');
        clearButton.setAttribute('tabindex', '0'); // Ensure keyboard access
        clearButton.textContent = 'Nettoyer la sélection'; // Set the button text

        // Add event listener to clear all tags within this filter
        clearButton.addEventListener('click', () => {
            const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
            if (filteredRecipesDiv) {
                filteredRecipesDiv.innerHTML = ''; // Clear all tags
<<<<<<< HEAD
                filteredRecipesDiv.remove();
                if (selectedTagsArray) {
                    selectedTagsArray.length = 0;
                    console.log("Clear tags ", selectedTagsArray);
                } else {
                    console.error('selectedTagsArray is undefined');
                }
                clearButton.remove();
                const allRecipes = getAllRecipes();
                const searchTerm = document.querySelector('#searchBar');
                const filteredRecipes = filterRecipes(allRecipes, searchTerm, selectedTags);
=======
                toggleClearButton(filteredRecipesDiv, clearButton); // Hide clear button after clearing tags
                filteredRecipesDiv.remove();
                updateFilteredRecipes(selectedTags, filteredRecipes, filteredRecipesDiv);
                selectedTags[filterType].length = 0;
>>>>>>> 049c2395974666fe896c0014f516f8a95e3adae0
                
                updateRecipeCards(filteredRecipes);
                updateRecipesFound(filteredRecipes.length)
            }
        });

        filterContainer.appendChild(clearButton);
    }

    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    toggleClearButton(filteredRecipesDiv, clearButton);  // Check whether to show or hide clear button
}

export function toggleClearButton(filteredRecipesDiv, clearButton) {
    const tagButtons = filteredRecipesDiv ? filteredRecipesDiv.querySelectorAll('button.tag') : [];
    const hasEnoughTags = tagButtons.length >= 3;

    // If the clearButton is null, return early
    if (!clearButton) {
        return;
    }

    // If there are 3 or more tags, show the clear button; otherwise, hide it
    if (hasEnoughTags) {
        clearButton.style.display = 'block';  // Show clear button
    } else {
        clearButton.style.display = 'none';   // Hide clear button
    }
}
