import {selectedTags } from "./clearTag.js";
import { updateFilteredRecipes } from "./recipesManager.js";

export function clearFilterTags(filterContainer) {
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
                toggleClearButton(filteredRecipesDiv, clearButton); // Hide clear button after clearing tags
                filteredRecipesDiv.remove();
                updateFilteredRecipes();
                selectedTags[filterType].length = 0;
                
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
