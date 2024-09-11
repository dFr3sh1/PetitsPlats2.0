export function createDropdownMenu(btnElement, itemsArray) {
    // Check if itemsArray is an array
    if (!Array.isArray(itemsArray)) {
        console.error('createDropdownMenu expected an array, but received:', itemsArray);
        return;
    };

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

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('aria-label', `Rechercher ${btnElement.textContent}`);
    input.classList.add('filter-input');

    const filterIcon = document.createElement('i');
    filterIcon.classList.add('fa-solid', 'fa-magnifying-glass');

    //Function to change icon inside the input
    function changeIcon() {
        if (input.value.length > 0) {
            filterIcon.classList.add('fa-xmark');
            filterIcon.classList.remove('fa-magnifying-glass');
        } else {
            filterIcon.classList.remove('fa-xmark');
            filterIcon.classList.add('fa-magnifying-glass');
        }
    }
    //Listener to set changeIcon
    input.addEventListener('input', () => {
        changeIcon();
    });

    //Listener to clean the input
    filterIcon.addEventListener('click', () => {
        input.value = "";
        changeIcon();
    });

    //Create the input for tag researches
    const divFilter = document.createElement('div');
    divFilter.classList.add('divFilter');
    const divFilterInput = document.createElement('div');
    divFilterInput.classList.add('divFilterInput')
    divFilterInput.appendChild(input);
    divFilterInput.appendChild(filterIcon);
    divFilter.appendChild(divFilterInput);
    dropdownContainer.appendChild(divFilter);

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
    input.addEventListener('input', (event) => {
        const filterValue = event.target.value.toLowerCase();
        optionsList.querySelectorAll('li').forEach(option => {
            const isVisible = option.textContent.toLowerCase().includes(filterValue);
            option.style.display = isVisible ? '' : 'none';
        });
    });
    filterContainer.appendChild(dropdownContainer)
}