export function createTagButton(tagName, filterContainer) {
    //Verify if existing tag
    const existingTag = filterContainer.querySelector(`button.tag[data-tag="${tagName}"]`);
    if(existingTag){
        return;//Nothing if existing tag
    }

    //Create button tag
    const tagButton = document.createElement('button');
    tagButton.classList.add('tag', 'filters');
    tagButton.setAttribute('data-tag', tagName);
    tagButton.textContent = tagName;

    //Create x icon
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-xmark');
    tagButton.appendChild(removeIcon);

    removeIcon.addEventListener('click', () => {
        tagButton.remove(); //Remove tag button
    });

    const filteredRecipesDiv = filterContainer.querySelector('.filteredRecipesDiv');
    if(!filteredRecipesDiv) {
        const newTagsContainer = document.createElement('div');
        newTagsContainer.classList.add('filteredRecipesDiv');
        filterContainer.appendChild(newTagsContainer);
        newTagsContainer.appendChild(tagButton);
    } else {
        filteredRecipesDiv.appendChild(tagButton);
    }
}