class RecipeCardTemplate {
    
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance
        this.ustensils = data.ustensils
        this.DOMElement = this.createCard()
    }

    createCard() {

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipes_cards');

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        thumbnail.setAttribute('tabindex', 0);

        const image = document.createElement('img');
        image.classList.add('recipeCard');
        image.src = `assets/images/${this.image}`;
        image.alt = this.name
        //image.setAttribute('aria-hidden', false)
        console.log(image.src)
        thumbnail.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = this.name;
        title.classList.add('title');

        const subTitle = document.createElement('h3');
        subTitle.innerText = "Recette"
        subTitle.classList.add('recette');

        const description = document.createElement('p');
        description.textContent = this.description;
        description.classList.add('description');

        const ingredientsSubTitle = document.createElement('h2')
        ingredientsSubTitle.innerText = "Ingrédients";
        ingredientsSubTitle.classList.add('ingredientsSubTitle')
        
        const ingredientsTable = document.createElement('table');
        ingredientsTable.classList.add('ingredientsTable');
        
        const tableTitle = document.createElement('th');
        tableTitle.innerText = "Ingrédients";
        
        ingredientsTable.appendChild(tableTitle)

        for (let i = 0; i < this.ingredients.length; i += 2) {
            // Row to create ingredients
            const ingredientRow = document.createElement('tr');
            const ingredientCell1 = document.createElement('td');
            ingredientCell1.classList.add('upRow')
            const ingredientCell2 = document.createElement('td');
            ingredientCell2.classList.add('upRow');

            ingredientCell1.textContent = this.ingredients[i].ingredient;
            if (i + 1 < this.ingredients.length) {
                ingredientCell2.textContent = this.ingredients[i + 1].ingredient;
            }
        
            ingredientRow.appendChild(ingredientCell1);
            ingredientRow.appendChild(ingredientCell2);
            ingredientsTable.appendChild(ingredientRow);
            
            // Fila para la cantidad y unidad del primer ingrediente
            const quantityUnitRow = document.createElement('tr');
            const quantityUnitCell1 = document.createElement('td');
            quantityUnitCell1.classList.add('ingredients', 'downRow');
            const quantityUnitCell2 = document.createElement('td');
            quantityUnitCell2.classList.add('ingredients',  'downRow');
            
            if (this.ingredients[i].quantity !== undefined && this.ingredients[i].unit !== undefined) {
                quantityUnitCell1.textContent = `${this.ingredients[i].quantity} ${this.ingredients[i].unit}`;
            } else if (this.ingredients[i].quantity !== undefined) {
                quantityUnitCell1.textContent = `${this.ingredients[i].quantity}`;
            }
            
            if (i + 1 < this.ingredients.length) {
                if (this.ingredients[i + 1].quantity !== undefined && this.ingredients[i + 1].unit !== undefined) {
                    quantityUnitCell2.textContent = `${this.ingredients[i + 1].quantity} ${this.ingredients[i + 1].unit}`;
                } else if (this.ingredients[i + 1].quantity !== undefined) {
                    quantityUnitCell2.textContent = `${this.ingredients[i + 1].quantity}`;
                }
            }
            
            quantityUnitRow.appendChild(quantityUnitCell1);
            quantityUnitRow.appendChild(quantityUnitCell2);
            ingredientsTable.appendChild(quantityUnitRow);
        }
        
        recipeCard.appendChild(ingredientsTable);

        const recipeTime = document.createElement('p');
        recipeTime.textContent = this.time+'min';
        recipeTime.classList.add('time_cta');
        thumbnail.appendChild(recipeTime);

        const servings = document.createElement('p')
        servings.textContent = this.servings
        servings.classList.add('servings');

        const appliance = document.createElement('p');
        appliance.textContent = this.appliance;
        appliance.classList.add('appliance');

        const ustensilsContainer = document.createElement('div');

        this.ustensils.forEach(item => {

            const ustensil = document.createElement('p');
            ustensil.textContent = item

            ustensilsContainer.appendChild(ustensil)
        });

        let areDisplayed = [servings, appliance, ustensilsContainer];
        console.log(areDisplayed);

        areDisplayed.map((item) => {
            item.style.display = "none"
        });

        const cardBody = document.createElement('div');
        cardBody.classList.add('cardBody');

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('descriptionDiv');
        
        recipeCard.appendChild(thumbnail);
        recipeCard.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(descriptionDiv);
        descriptionDiv.appendChild(subTitle);
        descriptionDiv.appendChild(description);
        cardBody.appendChild(ingredientsTable);
        cardBody.appendChild(appliance);
        cardBody.appendChild(ustensilsContainer);
        cardBody.appendChild(servings);
        
        return recipeCard

    };
}

export default RecipeCardTemplate