import { dropdownMenu } from "../components/dropdownMenu.js";
export default class Filter {
    constructor(data, name) {
        this.data = data
        this.name = name
        this.DOMElement = this.createFilter()//Result of the function
    }

    createFilter() {
        const filter = document.createElement('div');
        filter.classList.add('filter');

        const button = document.createElement('button');
        button.classList.add('filters');
        button.textContent = this.name
        button.setAttribute = ('aria-decription', 'Bouton pour afficher le menu')

        const btnIcon = document.createElement('img');
        btnIcon.src = `assets/images/arrow_down_vector.png`
        btnIcon.alt = ('Icon fleche en bas')

        filter.appendChild(button)
        button.appendChild(btnIcon)

        filter.addEventListener('click', dropdownMenu)
        
        
        return filter
    }

}