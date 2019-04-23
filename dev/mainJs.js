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

        // Creating game to parent element
        let container = this.htmlElementsCreator.createMainContainer(this.width, this.height);
        //  Creating div to store menu elements
        let div = document.createElement(`div`);
        div.style.width = `${this.width * 0.6}px`;
        div.style.height = `${this.height * 0.05}px`;
        div.style.margin = `20px 10px`;

        // Creating and adding menu elements to store div
        div.appendChild(this.htmlElementsCreator.createDifficultyLevelSelectElement());
        div.appendChild(this.htmlElementsCreator.createStartGameElement());
        // Adding game main element to container
        container.appendChild(div);
        // Creating and adding game board to container
        container.appendChild(this.htmlElementsCreator.createGameBoardElement());
        // Adding container containing game element to given parent html element
        this.parentElement.appendChild(container);

    },


    htmlElementsCreator: {

        containerStyle: {
            backgroundColor: `rgba(52, 179, 168,0.3)`,
            borderRadius: `20px`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`
        },

        startButtonStyle: {
            fontSize: `15px`,
            margin: `10px 10px`,
            color: `rgba(255,255,255,0.8)`,
            backgroundColor: `rgba(0,0,0,.2)`,
            borderRadius: `10px`,
            float: `right`,
            fontFamily: `Sans-serif`,
            fontWeight: `700`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            width: `40%`,
            height: `100%`
        },

        difficultySelectStyle: {
            backgroundColor: `rgba(255,255,255,1)`,
            margin: `10px 10px`,
            width: `40%`,
            height: `100%`
        },

        gameBoardStyle: {
            backgroundColor: `rgba(255,255,255,1)`,
            margin: `10px 10px`,
            width: `90%`,
            height: `80%`
        },


        /**
         *  Add given css styles to given html element
         * @param {object} styles
         * @param {HTML element} element
         */
        addStyles(styles, element) {

            Object.keys(styles).forEach((key, index) => {
                element.style[`${key}`] = `${styles[`${key}`]}`;
            });

        },

        /**
         * Create and return game main container element
         * @param {number} width
         * @param {number} height
         * @return {HTML element}
         */
        createMainContainer(width, height) {

            let element = document.createElement(`div`);
            // Adding css styles to element
            this.addStyles(this.containerStyle, element);
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;

            return element;

        },

        /**
         *  Create and return level difficulty select element
         * @param {number} width
         * @param {number} height
         * @return {HTML element}
         */
        createDifficultyLevelSelectElement(width, height) {

            let element = document.createElement(`select`);
            // Adding css styles to element
            this.addStyles(this.difficultySelectStyle, element);


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
            element.appendChild(document.createTextNode(`START`));
            // Adding css styles to element
            this.addStyles(this.startButtonStyle, element);

            return element

        },

        /**
         * Create and return empty game board
         * @param {number} width
         * @param {number} height
         */
        createGameBoardElement(width, height) {

            let element = document.createElement(`div`);
            // Adding css styles to element
            this.addStyles(this.gameBoardStyle, element);

            return element

        }

    }

}




game.generateGame(document.querySelector(`body`), `600`);