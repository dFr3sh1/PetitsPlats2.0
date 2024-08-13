import recipes from "../data/recipes.js";

export function getAllRecipes() {
    return recipes;
}

export function getAllIngredients() {

    const ingredientsSet = new Set();
    
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const normalizedIngredients = ingredient.ingredient.trim().toLowerCase();
            ingredientsSet.add(normalizedIngredients);
        });
    });

    //Convert the set in an array and sort it
    const ingredientsArray = Array.from(ingredientsSet)
        .map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1))
        .sort();

        console.log(ingredientsArray)

    return ingredientsArray
}

export function getAllUstensils() {

    const ustensilsSet = new Set();
    
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            const normalizedUstensils = ustensil.trim().toLowerCase();
            ustensilsSet.add(normalizedUstensils);
        });
    });

    //Convert the set in an array and sort it
    const ustensilsArray = Array.from(ustensilsSet)
        .map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1))
        .sort();

        console.log(ustensilsArray)    

    return ustensilsArray
}

export function getAllAppliances() {

    const appliancesSet = new Set(); 
    
    recipes.forEach(recipe => {
        // As several appliance are not an array we check them before, if not, convert it to an array
        let appliances = recipe.appliance;
        if (!Array.isArray(appliances)) {
            if (typeof appliances === 'string') {
                appliances = [appliances]; // Convert string to array
            } else if (appliances == null) {
                appliances = []; // Convert null or undefined to empty array
            } else {
                console.error(`Unexpected type for appliance: ${typeof appliances} in recipe:`, recipe);
                return; // Skip this recipe as it has an unexpected type
            }
        }
    
        // Process the appliances
        appliances.forEach(appliance => {
            const normalizedAppliance = appliance.trim().toLowerCase();
            appliancesSet.add(normalizedAppliance);
        });
    });
    
    console.log(appliancesSet);

    //Convert the set in an array and sort it
    const appliancesArray = Array.from(appliancesSet)
        .map(appliance => appliance.charAt(0).toUpperCase() + appliance.slice(1))
        .sort();

        console.log(appliancesArray)

    return appliancesArray
}

export default { getAllRecipes, getAllIngredients, getAllUstensils, getAllAppliances }