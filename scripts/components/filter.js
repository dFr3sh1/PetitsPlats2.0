export default class Filter {
    constructor(data, name) {
        this.data = data
        this.name = name
        this.DOMElement = this.createFilter()//Result of the function
    }

    createFilter() {
        const filter = document.createElement('div');
        filter.classList.add('filter');
        filter.style.position ='relative'; //Ensures dropdown is positioned correctly

        const button = document.createElement('button');
        button.classList.add('filters');
        button.textContent = this.name
        button.setAttribute = ('aria-description', 'Bouton pour afficher le menu')

        const btnIcons = document.createElement('div');
        btnIcons.classList.add('btn-icons');

        const btnDownArrow = document.createElement('img');
        btnDownArrow.src = `assets/images/arrow_down_vector.png`;
        btnDownArrow.classList.add('down-arrow')
        btnDownArrow.alt = ('Icon fleche en bas');

        const btnUpArrow = document.createElement('img');
        btnUpArrow.src = `assets/images/arrow_up_vector.png`;
        btnUpArrow.classList.add('up-arrow', 'isDisplayed')
        btnUpArrow.alt = ('Icon fleche en haut');

        filter.appendChild(button)
        button.appendChild(btnIcons)
        btnIcons.appendChild(btnDownArrow)
        btnIcons.appendChild(btnUpArrow)

        return filter
    }

}