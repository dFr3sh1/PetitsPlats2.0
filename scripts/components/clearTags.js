// Function to show or hide the clear button
export function toggleClearButton(filteredRecipesDiv, clearButton) {
    if (!filteredRecipesDiv || !clearButton) return;
    if (filteredRecipesDiv.children.length > 0) {
        clearButton.style.display = 'inline-block'; // Show the button if tags exist
    } else {
        clearButton.style.display = 'none'; // Hide the button if no tags
        //filteredRecipesDiv.remove();
    }
}

// Clear tags for a specific filter
export function clearFilterTags(filterContainer) {
    let clearButton = filterContainer.querySelector('.clear-btn');

    if (!clearButton) {
        clearButton = document.createElement('button');
        clearButton.classList.add('clear-btn');
        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
        clearButton.appendChild(removeIcon);

        // Add event listener to clear all tags within this filter
        clearButton.addEventListener('click', () => {
            const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
            if (filteredRecipesDiv) {
                filteredRecipesDiv.innerHTML = ''; // Remove all tag buttons
                toggleClearButton(filteredRecipesDiv, clearButton); // Hide clear button if no tags
            }
        });

        filterContainer.appendChild(clearButton);
    }

    // Ensure the button is hidden if no tags exist
    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    toggleClearButton(filteredRecipesDiv, clearButton);
}
