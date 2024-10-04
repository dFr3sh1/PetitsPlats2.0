export function clearFilterTags(filterContainer) {
    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    const clearButton = filterContainer.querySelector('.clear-btn');

    if (filteredRecipesDiv) {
        filteredRecipesDiv.innerHTML = ''; // Remove all tag buttons
    }

    // Clear the selectedTags array for this filter
    const filterType = filterContainer.getAttribute('data-type');
    if (filterType && selectedTags[filterType]) {
        selectedTags[filterType].length = 0; // Clear the selected tags
    }

    // Hide the clear button if no tags remain
    if (clearButton) {
        clearButton.style.display = 'none';
    }
}
