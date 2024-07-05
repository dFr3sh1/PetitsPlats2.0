import RecipeCardTemplate from "../components/card";

export default function displayMediaRecipe(recipe) {
    const recipe = document.querySelector('.recipes_card');
    //const recipeCard = new RecipeCardTemplate(recipe);

    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');

    const recipeImg = document.createElement('img');
    recipeImg.classList.add('recipeCard');
    recipeImg.src = `assets/images/${this.image}`;
    recipeImg.alt = `${this.name}`

    thumbnail.appendChild(recipeImg);
}