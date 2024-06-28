import { recipes } from "./data.js";

export async function getAllRecipes() {
    return recipes;
}

export async function getAllIngredients() {
    const ingredients = recipes.map(recipe => recipe.ingredients);
    return ingredients.filter((item, position, array) => array.indexOf(item) === position);
}

export async function getAllUstensils() {
    const ustensils = recipes.map(recipe => recipe.ustensils);
    return ustensils.filter((item, position, array) => array.indexOf(item) === position);
}

export async function getAllAppliances() {
    const appliances = recipes.map(recipe => recipe.appliance);
    return appliances.filter((item, position, array) => array.indexOf(item) === position);
}

export default { getAllRecipes, getAllIngredients, getAllUstensils, getAllAppliances }