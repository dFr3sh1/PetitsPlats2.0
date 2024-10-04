



export default class FilteredTag {
    constructor (data, name) {
        this.data = data;
        this.name = name;
        this.DOMElement = this.createFilteredTag()
    }

    createFilteredTag() {
        const filtered = document. createElement('div');
        filtered.classList.add('filtered');
        filtered.style.position = 'relative';

        const button = document.createElement('button');
        button.classList.add('filters', 'filtered', 'isDisplayed');
        button.textContent = this.name;
        button.setAttribute = ('aria-description', 'Bouton pour afficher à la recette');

        filtered.appendChild(button)

    }
    
}