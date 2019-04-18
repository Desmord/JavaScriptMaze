import css from "./mainCss.css";


const game = {
    parentElement: null,
    width: `500px`,
    height: `600px`,
    difficultyLevel: `easy`,
    maze: [],
    playerPosition: [1, 1],
    endPosition: [9, 9],
    numberOfPlayerMoves: 0,

    /**
     * Generate and add game element no site
     * @param {HTML element} parentElement
     * @param {number} width
     */
    generateGame(parentElement = `body`, width = `500`) {
        // Setting game starting data
        this.parentElement = parentElement;
        this.width = width;
        this.height = this.width * 1.1;

        // Adding game to parent element
        // Dodac metody sprawdzajace czy wartosc minimalna szewrokosci i wys jest spełniobna

        let container = this.htmlElementsCreator.createMainContainer(this.width, this.height);
        let div = document.createElement(`div`);

        div.appendChild(this.htmlElementsCreator.createDifficultyLevelSelectElement(this.width, this.height));
        div.appendChild(this.htmlElementsCreator.createStartGameElement(this.width, this.height));

        container.appendChild(div);
        container.appendChild(this.htmlElementsCreator.createGameBoardElement(this.width, this.height));

        this.parentElement.appendChild(container);

    },

    htmlElementsCreator: {
        /**
         * Create and return game main container element
         * @param {number} width
         * @param {number} height
         * @return {HTML element}
         */
        createMainContainer(width, height) {

            let container = document.createElement(`div`);
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
            container.style.backgroundColor = `rgba(52, 179, 168,0.3)`;
            container.style.borderRadius = `20px`;
            container.style.display = `flex`;
            container.style.justifyContent = `center`;
            container.style.alignItems = `center`;
            container.style.flexDirection = `column`;


            return container;

        },

        /**
         *  Create and return level difficulty select element
         * @param {number} width
         * @param {number} height
         * @return {HTML element}
         */
        createDifficultyLevelSelectElement(width, height) {

            let element = document.createElement(`select`);
            element.style.width = `${width * 0.2}px`;
            element.style.height = `${height * 0.05}px`;
            element.style.backgroundColor = `rgba(255,255,255,1)`;
            element.style.margin = `${width * 0.01}px ${width * 0.01}px `;

            return element

        },

        /**
         * Create and return start/stop button
         * @param {number} width
         * @param {number} height
         * @return {HTML element}
         */
        createStartGameElement(width, height) {

            let element = document.createElement(`div`);
            element.style.width = `${width * 0.2}px`;
            element.style.height = `${height * 0.05}px`;
            element.style.backgroundColor = `rgba(255,255,255,1)`;
            element.style.float = `right`;
            element.style.margin = `${width * 0.01}px ${width * 0.01}px `;

            return element


        },

        createGameBoardElement(width, height) {

            let element = document.createElement(`div`);
            element.style.width = `${width * 0.9}px`;
            element.style.height = `${height * 0.9}px`;
            element.style.backgroundColor = `rgba(255,255,255,1)`;
            element.style.margin = `${width * 0.01}px ${width * 0.01}px `;

            return element


        }


        // create levevdificulty
        // create start/ stop
        // create gamePanel
        // setGame - ustawia i wyswietla w elemencie partent

    }

}




game.generateGame(document.querySelector(`body`), `600`);