
export function getSelectedTags() {
    const tagElements = document.querySelectorAll('.tag'); // Assuming the tag buttons have this class
    const selectedTags = Array.from(tagElements).map(tag => tag.textContent.trim()); // Get the text from each tag

    return selectedTags;
}