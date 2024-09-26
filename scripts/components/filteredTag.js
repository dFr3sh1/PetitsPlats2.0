import { toggleClearButton } from './clearTags.js';  // Import the function

export function createTagButton(tagName, filterContainer, selectedTags) {
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if (existingTag) {
        return; // If exists, do nothing
    }

    // Handle tag limit (max 3)
    if (selectedTags && selectedTags.length >= 3) {
        const firstTag = selectedTags.shift(); // Delete the first tag
        const firstTagButton = filterContainer.querySelector(`button.tag[data-tag="${firstTag}"]`);
        if (firstTagButton) {
            firstTagButton.remove(); // Delete the button
        }
    }

    selectedTags.push(tagName);

    // Create the tag button
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName);
    tagButton.textContent = tagName;

    // Create the x-mark remove icon
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
    tagButton.appendChild(removeIcon);

    // Remove tag on click
    removeIcon.addEventListener('click', () => {
        tagButton.remove();
        const index = selectedTags.indexOf(tagName);
        if (index > -1) {
            selectedTags.splice(index, 1); // Delete the tag from the list
        }

        const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
        const clearButton = filterContainer.querySelector('.clear-btn');
        toggleClearButton(filteredRecipesDiv, clearButton);  // Hide clear button if no tags
    });

    let filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    if (!filteredRecipesDiv) {
        filteredRecipesDiv = document.createElement('div');
        filteredRecipesDiv.classList.add('filteredRecipesDiv');
        filterContainer.appendChild(filteredRecipesDiv);
    }

    // Add the tag button to the filteredRecipesDiv
    filteredRecipesDiv.appendChild(tagButton);

    // Ensure the clear button appears only if tags exist
    const clearButton = filterContainer.querySelector('.clear-btn');
    toggleClearButton(filteredRecipesDiv, clearButton);  // Show button if tags exist
}