export function clearFilterTags(filterContainer, selectedTagsArray) {
    let clearButton = filterContainer.querySelector('.clear-btn');

    if (!clearButton) {
        // Create the clear button
        clearButton = document.createElement('button');
        clearButton.classList.add('clear-btn');
        clearButton.setAttribute('aria-label', 'Nettoyer la sélection');
        clearButton.setAttribute('role', 'button');
        clearButton.setAttribute('tabindex', '0');
        clearButton.textContent = 'Nettoyer la sélection';

        // Event listener to clear all tags when clicked
        clearButton.addEventListener('click', () => {
            const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
            if (filteredRecipesDiv) {
                filteredRecipesDiv.innerHTML = ''; // Clear all tags in the filteredRecipesDiv
                filteredRecipesDiv.remove(); // Remove the div from the DOM when no tags are left
                selectedTagsArray.length = 0; // Reset the selected tags array

                clearButton.remove(); // Remove the clearButton from the DOM

                // Update the filtered recipes based on the current search term
                const allRecipes = getAllRecipes();
                const searchTerm = document.querySelector('#searchBarInput').value.trim().toLowerCase();
                const filteredRecipes = filterRecipes(allRecipes, searchTerm, selectedTags);  // Use the centralized filtering

                updateRecipeCards(filteredRecipes); // Update the UI with the filtered recipes
                updateRecipesFound(filteredRecipes.length); // Update the count
            }
        });

        // Append the clear button after `filteredRecipesDiv`
        filterContainer.appendChild(clearButton);
    }

    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    toggleClearButton(filteredRecipesDiv, clearButton);  // Check whether to show or hide clear button
}


export function toggleClearButton(filteredRecipesDiv, clearButton) {
    const tagButtons = filteredRecipesDiv ? filteredRecipesDiv.querySelectorAll('button.tag') : [];
    const hasEnoughTags = tagButtons.length >= 3;

    // If the clearButton is null, return early
    if (!clearButton) return;

    // Show clear button if there are 3 or more tags; otherwise, hide/remove it
    if (hasEnoughTags) {
        clearButton.style.display = 'block';  // Show clear button
    } else {
        clearButton.style.display = 'none';   // Hide clear button
    }
}