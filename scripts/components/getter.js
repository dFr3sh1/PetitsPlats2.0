import exp from "constants";

export async function getRecipes() {
    try {
        const response = await fetch('./data/recipes.js');
        const data = await response.json();
        return data.recipes; //Return the recipes array
    } catch (error) {
        console.error('Error loading recipes:', error);
        return []; //Return empty array in case of error
    }
}

export async function getMedias() {
    try {
        const response = await fetch('./data/recipes.json');
        const data = await response.json();
        return data.recipes['image']; //Return only the recipes array 
    } catch (error) {
        console.error('Error loading the media:', error);
        return [];
    }
}

export async function getRecipeById(id) {
    try {
        const response = await fetch('./data/recipes.json');
        const data = await response.json();
        return data.recipes.find(r => r.id === id); //Return only the recipe
    } catch (error) {
        console.error('Error loading recipe:', error);
        return null
    }
}

export async function getMediaByRecipeById(id) {
    try {
        const response = await fetch('./data/recipes.json');
        const data = await response.json();
        return data.recipes['image'].filter(image => image.recipeId === id); //Return only the media from the recipe id
    } catch (error) {
        console.error('Error loading the media:', error);
        return null
    }
}