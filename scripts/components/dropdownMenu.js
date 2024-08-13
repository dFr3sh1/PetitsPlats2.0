export function createDropdownMenu(btnElement, itemsArray) {
    // Check if itemsArray is an array
    if (!Array.isArray(itemsArray)) {
        console.error('createDropdownMenu expected an array, but received:', itemsArray);
        return;
    }

    //Get the closest parent .filter div
    const filterContainer = btnElement.closest('.filter');

    //Check if dropdownContainer already exists
    let dropdownContainer = filterContainer.querySelector('.dropdown-container');
    if (dropdownContainer) {
        //If it exists, remove it to hide the list
        dropdownContainer.remove();
        return;
    }

    //Create element with the list
    dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('dropdown-container');

    //Create the input for tag researches
    const filterInput = document.createElement('input');
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('aria-label', `Rechercher ${btnElement.textContent}`);
    filterInput.classList.add('filter-input');
    dropdownContainer.appendChild(filterInput);

    //Create the dropdown list
    const optionsList = document.createElement('ul');
    optionsList.setAttribute('role', 'listbox');
    optionsList.classList.add('dropdown-list');

    //Fill the list with arrays
    itemsArray.forEach(item => {
        const optionItem = document.createElement('li');
        optionItem.setAttribute('role', 'option');
        optionItem.textContent = item;
        optionItem.classList.add('dropdown-item');
        optionsList.appendChild(optionItem);
    });

    dropdownContainer.appendChild(optionsList);

    //Filter the user tags
    filterInput.addEventListener('input', (event) => {
        const filterValue = event.target.value.toLowerCase();
        optionsList.querySelectorAll('li').forEach(option => {
            const isVisible = option.textContent.toLowerCase().includes(filterValue);
            option.style.display = isVisible ? '' : 'none';
        });
    });

    filterContainer.appendChild(dropdownContainer)
}

// const ingredientsFilter = document.getElementById('ingredientFilter');
// const appareilsFilter = document.getElementById('appareilsFilter');
// const ustensilsFilter = document.getElementById('ustensilsFilter');


// //Function to create the input of the filter
// // export async function createFilterInput() {
// //     const filterInput = document.createElement('input', type="text");
// //     filterInput.classList.add('filterInput')
// //     const filterInputImg = document.createElement('img');
// //     filterInputImg.classList.add('filterInputImg')
// //     filterInputImg.src =`assets/images/arrow_down_vector.png`;

// //     filterInput.appendChild(filterInputImg);

// //     return filterInput;
// // } 

// //Function to recuperate all ingredients
// export async function createIngredientsArray() {
//     const ingredientsfilterArray = getAllIngredients(recipes);
//     // const ingredientsSet = new Set();
//     // for (let i = 0; i < recipes.length; i++) {
//     //     const ingredients = recipes[i].ingredients;
//     //     for (let j = 0; j < ingredients.length; j++) {
//     //         ingredientsSet.add(ingredients[j].ingredient);
//     //     }
//     //     console.log(ingredientsSet)
//     // }
//     //return Array.from(ingredientsSet);
//     console.log(ingredientsfilterArray);
//     return ingredientsfilterArray;
// }

// export async function createAppliancesArray() {
//     const appliancesFilterArray = getAllAppliances(recipes);
//     console.log(appliancesFilterArray);
//     return appliancesFilterArray;
// }

// export async function createUstensilsArray() {
//     const ustensilsFilterArray = getAllUstensils(recipes);
//     console.log(ustensilsFilterArray);
//     return ustensilsFilterArray;
// }

// const dropdownFilterArrays = [createAppliancesArray, createIngredientsArray, createUstensilsArray];

// // Function to create the dropdown Menu
// function createDropdownMenu() {
//     const dropdown = document.querySelectorAll('.dropdwnDatalist');
//     console.log(dropdown)


//     // const dropdown = document.getElementById('ingredientDatalist');
//     // const inputIngredientsFilter = document.createElement('input')
//     // dropdown.classList.add('dropdown-menu');
//     // dropdown.setAttribute('aria-labelledby', 'ingredientFilter');
//     // dropdown.setAttribute('role', 'menu');

//     // for (let i = 0; i < ingredients.length; i++) {
//     //     const listItem = document.createElement('option');
//     //     listItem.setAttribute('role', 'menuitem');
//     //     const link = document.createElement('a');
//     //     link.href = '#';
//     //     link.textContent = ingredients[i];
//     //     link.setAttribute('aria-label', ingredients[i]);
//     //     listItem.appendChild(link);
//     //     dropdown.appendChild(listItem);
//     // }

//     // return dropdown;
// }

// // Get all ingredients and create dropdown menu
// const ingredients = createIngredientsArray(recipes);
// const dropdownMenu = createDropdownMenu(ingredients);

// // Add the dropdown button to the DOM
// const ingredientFilterButton = document.getElementById('ingredientFilter');
// ingredientFilterButton.addEventListener('click', () => {
//     const existingDropdown = document.querySelector('.dropdown-menu');
//     if (existingDropdown) {
//         existingDropdown.remove();
//     } else {
//         ingredientFilterButton.appendChild(dropdownMenu);
//         dropdownMenu.style.display = 'flex';  // Display dropdown menu
//     }
// });