class RecipeCardTemplate {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients["ingredient", "quantity", "unit"];
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance
        this.ustensils = data.ustensils
        this.DOMElement = null;
    }

    getRecipes(recipes) {
        const recipesSection = document.querySelector('.recipesSection');

        if(!recipesSection) {
            console.error('La recette n'a pas été trouvé);
            return
        };

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipes_cards');

        const thumbnail = document.createElement('span');
        thumbnail.classList.add('thumbnail');
        thumbnail.setAttribute('tabindex', 0);

        const image = document.createElement('image');
        image.classList.add('recipeCard');
        image.src = ('./assets/images/${this.image}');
        thumbnail.appendChild('image');

        const title = document.createElement('h2');
        title.textContent = this.name;
        title.classList.add('title');

        const subTitle = document.createElement('h3');
        subTitle.innerText = "Recette"
        subTitle.classList.add('recette');

        const description = document.querySelector('p'):
        description.textContent = this.description;
        description.classList.add('description');

        const ingredientsSubTitle = document.createElement('h2')
        ingredientsSubTitle.innerText = "Ingrédients";
        ingredientsSubTitle.classList.add('ingredientsSubTitle')

        const ingredients = this.ingredients
        ingredients.classList.add('ingredients');

        const ingredientsContainer = document.createElement('div');

        ingredients.forEach(item => {
            const ingredient = document.createElement('p');

            let content = `${item.ingredient}`;
            if(item.quanity !== undefined) {
                content + `${item.quantity}`;
            }
            if(item.unit !== undefined) {
                content += `${item.unit}`;
            }

            ingredient.textContent = content;

            ingredientsContainer.appenChild(ingredient)
        })

        const recipeTime = document.createElement('p');
        recipeTime.textContent = this.time;
        recipeTime.classList.('.time_cta');
        thumbnail.appendChild('recipeTime');

        const servings = document.createElement('p')
        servings.textContent = this.servings
        servings.classList.add('servings');

        const appliance = document.createElement('p');
        appliance.textContent = this.appliance;
        appliance.classList.add('appliance');

        const ustensils = this.ustensils;

        const ustensilsContainer = document.createElement('div');

        ustensiles.forEach(item => {
            const ustensils = document.createElement('p');

            let content = `${item.ustensils[item]}`

            ustensilsContainer.appendChild(ustensils)
        });

        recipeCard.appendChild('thumbnail');
        recipeCard.appendChild('title');
        recipeCard.appendChild('subTitle');
        recipeCard.appendChild('description');
        recipeCard.appendChild('ingredientsContainer');
        recipeCard.appendChild('servings');
        recipeCard.appendChild('appliance');
        recipeCard.appendChild('ustensilsContainer');

        recipesSection.appendChild('recipeCard');

        this.DOMElement = recipeCard

    };
}

export default RecipeCardTemplate