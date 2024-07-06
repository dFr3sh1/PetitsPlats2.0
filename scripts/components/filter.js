import { getAllIngredients, getAllAppliances, getAllUstensils } from "../model/model.js";
import recipes from "../data/recipes.js";

const ingredientsFilter = document.getElementById('ingredientFilter');
const appareilsFilter = document.getElementById('appareilsFilter');
const ustensilsFilter = document.getElementById('ustensilsFilter');


//Function to create the input of the filter
export async function createFilterInput() {
    const filterInput = document.createElement('input', type="text");
    filterInput.classList.add('filterInput')
    const filterInputImg = document.createElement('img');
    filterInputImg.classList.add('filterInputImg')
    filterInputImg.src =`assets/images/arrow_down_vector.png`;

    filterInput.appendChild(filterInputImg);

    return filterInput;
} 

//Function to recuperate all ingredients
export function createIngredientsArray(recipes) {
    const ingredientsSet = new Set();
    for (let i = 0; i < recipes.length; i++) {
        const ingredients = recipes[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            ingredientsSet.add(ingredients[j].ingredient);
        }
        console.log(ingredientsSet)
    }
    return Array.from(ingredientsSet);
}

// Función para crear el dropdown menu
function createDropdownMenu(ingredientsSet) {
    const dropdown = document.getElementById('ingredientDatalist');
    const inputIngredientsFilter = document.createElement('input')
    dropdown.classList.add('dropdown-menu');
    dropdown.setAttribute('aria-labelledby', 'ingredientFilter');
    dropdown.setAttribute('role', 'menu');

    for (let i = 0; i < ingredients.length; i++) {
        const listItem = document.createElement('option');
        listItem.setAttribute('role', 'menuitem');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = ingredients[i];
        link.setAttribute('aria-label', ingredients[i]);
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    }

    return dropdown;
}

// Obtener todos los ingredientes y crear el menú dropdown
const ingredients = createIngredientsArray(recipes);
const dropdownMenu = createDropdownMenu(ingredients);

// Añadir el dropdown menu al DOM al hacer clic en el botón con id="ingredientFilter"
const ingredientFilterButton = document.getElementById('ingredientFilter');
ingredientFilterButton.addEventListener('click', () => {
    const existingDropdown = document.querySelector('.dropdown-menu');
    if (existingDropdown) {
        existingDropdown.remove();
    } else {
        ingredientFilterButton.appendChild(dropdownMenu);
        dropdownMenu.style.display = 'block';  // Mostrar el dropdown menu
    }
});