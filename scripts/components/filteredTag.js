import { clearFilterTags } from "./clearTags.js";
import { toggleClearButton } from "./clearTags.js";

    export function createTagButton(tagName, filterContainer, selectedTags) {
        const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
        if (existingTag) {
            return; // Do nothing if the tag already exists
        }
    
        // Handle tag limit (max 3)
        if (selectedTags.length >= 3) {
            const firstTag = selectedTags.shift(); // Remove the first tag
            const firstTagButton = filterContainer.querySelector(`button.tag[data-tag="${firstTag}"]`);
            if (firstTagButton) {
                firstTagButton.remove(); // Remove the button from the DOM
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
                selectedTags.splice(index, 1); // Remove the tag from the array
            }
    
            // Check visibility after tag removal
            const clearButton = filterContainer.querySelector('.clear-btn');
            toggleClearButton(filteredRecipesDiv, clearButton);
    
            // Hide filteredRecipesDiv if no tags left
            if (selectedTags.length === 0) {
                filteredRecipesDiv.classList.remove('visible'); // Hide when empty
            }
        });
    
        // Fetch the existing filteredRecipesDiv from the DOM
        let filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    
        // Check if it exists in the DOM
        if (!filteredRecipesDiv) {   
            // Create the filteredRecipesDiv if not present
            filteredRecipesDiv = document.createElement('div');
            filteredRecipesDiv.classList.add('filteredRecipesDiv');
            filterContainer.appendChild(filteredRecipesDiv); // Append it to the DOM
        }
    
        // Make it visible if hidden
        filteredRecipesDiv.classList.add('visible'); // Show it
    
        // Add the tag button to the filteredRecipesDiv
        filteredRecipesDiv.appendChild(tagButton);
    
        // Ensure clear button is created and shown only if there are 3 or more tags
        if (selectedTags.length >= 3) {
            clearFilterTags(filterContainer);
        }
    
        // Toggle clear button visibility after each tag creation
        const clearButton = filterContainer.querySelector('.clear-btn');
        toggleClearButton(filteredRecipesDiv, clearButton);
    }