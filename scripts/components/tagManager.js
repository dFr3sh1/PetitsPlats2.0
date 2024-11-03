export let selectedTags = {
    ingredients: [],
    appliances: [],
    utensils: [],
};

// Helper to ensure no more than 3 tags per category
function enforceTagLimit(filterType) {
    if (selectedTags[filterType].length >= 3) {
        selectedTags[filterType].shift(); // Remove the oldest tag
    }
}

// Add a tag with 3-tag limit
export async function addTag(filterType, tag) {
    let selectedTagsArray = selectedTags[filterType]
    if (!selectedTagsArray[filterType].includes(tag)) {
        enforceTagLimit(filterType);
        selectedTagsArray[filterType].push(tag);
    }
    console.log("SelectedTags from add function", selectedTagsArray)
}

// Remove a tag from selectedTags
export function removeTag(filterType, tag) {
    selectedTags[filterType] = selectedTags[filterType].filter(t => t !== tag);
}

//Clear all tags of a specific type
export function clearTags(filterType) {
    selectedTags[filterType] = [];
}