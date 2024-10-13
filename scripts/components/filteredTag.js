import { selectedTags } from '../index.js';

export function createTagButton(tagName, filterContainer) {
    // Get the filter type from the container
    const filterType = filterContainer.getAttribute('data-type');

    // Check inside the correct tag array for duplicates
    if (selectedTags[filterType].includes(tagName)) {
        return; // If the tag already exists, don't add it again
    }

    console.log(selectedTags[filterType])

    // Remove the first tag if more than 3 tags are selected
    if (selectedTags[filterType].length >= 3) {
        const firstTag = selectedTags[filterType].shift(); // Remove the first tag from the array
        const firstTagButton = document.querySelector(`button.tag[data-tag="${firstTag}"]`);

        console.log('Before removing:', document.querySelectorAll('button.tag'));
        if (firstTagButton) {
            firstTagButton.remove(); // Remove the button from the DOM
        }
        console.log('After removing:', document.querySelectorAll('button.tag'));
    }

    const allTagButtons = document.querySelectorAll('button.tag');
        allTagButtons.forEach(button => {
            console.log('Button:', button, 'Data-tag:', button.getAttribute('data-tag'));
        });


    // Add the new tag to the selectedTags array
    selectedTags[filterType].push(tagName);

    // Create the tag button
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName)
    const tagButtonTxt = document.createElement('p');
    tagButtonTxt.textContent = tagName;
    console.log('Bouton tag pour', tagName)
    tagButtonTxt.classList.add('tagTxt');
    tagButton.appendChild(tagButtonTxt);

    // Create the 'X' icon for removal
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-circle-xmark');
    tagButton.appendChild(removeIcon);

    // Remove tag button when 'X' is clicked
    removeIcon.addEventListener('click', () => {
        tagButton.remove();
        const index = selectedTags[filterType].indexOf(tagName);
        if (index > -1) {
            selectedTags[filterType].splice(index, 1); // Remove the tag from the array
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