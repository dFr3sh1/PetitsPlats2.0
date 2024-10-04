//import { selectedTags } from '../index.js'

export function createTagButton(tagName, filterContainer, selectedTags) {
    // Check if the tag already exists
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if (existingTag) {
        return; // If tag already exists, do nothing
    }

    // Check if more than 3 tags are selected
    if (selectedTags.length >= 3) {
        const firstTag = selectedTags.shift(); // Remove the first tag
        const firstTagButton = filterContainer.querySelector(`button.tag[data-tag="${firstTag}"]`);
        if (firstTagButton) {
            firstTagButton.remove(); // Remove the button from the DOM
        }
    }

    // Add the new tag to the selectedTags array
    selectedTags.push(tagName);

    // Create the tag button
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName);
    tagButton.textContent = tagName;

    // Create the 'X' icon for removal
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
    tagButton.appendChild(removeIcon);

    // Remove tag button when 'X' is clicked
    removeIcon.addEventListener('click', () => {
        tagButton.remove();
        const index = selectedTags.indexOf(tagName);
        if (index > -1) {
            selectedTags.splice(index, 1); // Remove the tag from the array
        }
    });

    // Append the tag button to the correct container
    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    if (!filteredRecipesDiv) {
        const newTagsContainer = document.createElement('div');
        newTagsContainer.classList.add('filteredRecipesDiv');
        filterContainer.appendChild(newTagsContainer);
        newTagsContainer.appendChild(tagButton);
    } else {
        filteredRecipesDiv.appendChild(tagButton);
    }
}