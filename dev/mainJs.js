import css from "./mainCss.css";


const game = {
    parentElement: null,
    width: `500px`,
    height: `600px`,
    difficultyLevel: `Easy`,
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

        // Setting evetns
        this.eventsManager.setEvents(this.difficultyLevel);

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
            // backgroundColor: `rgba(255,255,255,1)`,
            backgroundColor: `rgba(105,105,155,.3)`,
            margin: `10px 10px`,
            width: `90%`,
            height: `80%`,
            borderRadius: `5px`
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

            // Creating difficulty options
            let optionEasy = document.createElement(`option`);
            optionEasy.appendChild(document.createTextNode(`Easy`));
            let optionNormal = document.createElement(`option`);
            optionNormal.appendChild(document.createTextNode(`Normal`));
            let optionHard = document.createElement(`option`);
            optionHard.appendChild(document.createTextNode(`Hard`));

            element.add(optionEasy);
            element.add(optionNormal);
            element.add(optionHard);

            element.classList.add(`difficultySelect`);

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

            element.classList.add(`startButton`);

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

            element.classList.add(`gameBoard`);

            return element

        }

    },

    eventsManager: {

        /**
         *  Sets all elements events
         */
        setEvents(difficulty) {

            this.startButton();
            this.selectDifficulty(difficulty);

        },

        /**
         * Sets all start button events
         */
        startButton() {

            const startButton = document.querySelector(`.startButton`);

            this.startButtonHoverEvent(startButton);
            this.startButtonClickEvent(startButton);

        },

        /**
         * Start button hover event
         */
        startButtonHoverEvent(button) {

            button.addEventListener(`mouseenter`, (e) => button.style.backgroundColor = `rgba(0,0,0,.4)`);

            button.addEventListener(`mouseleave`, (e) => button.style.backgroundColor = `rgba(0,0,0,0.2)`);

        },

        /**
         *  Sets click events for startButton
         * @param {HTML element} button
         */
        startButtonClickEvent(button) {

            button.addEventListener(`click`, () => {

                console.log(this.maze(10));
                // console.log(`object`);
            });

        },


        /**
         * Sets select option change event
         * @param {string} difficulty
         */
        selectDifficulty(difficulty) {

            const difficultySelect = document.querySelector(`.difficultySelect`);

            difficultySelect.addEventListener(`change`, (e) => difficulty = e.target.value);

        },

        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------

        maze(difficulty) {
            //zmienic pozwiom
            const startX = 0,
                startY = 0,
                endX = difficulty - 1,
                endY = difficulty - 1;

            let maze = [];

            // Creating maze empty cells
            for (let i = 0; i < difficulty; i++) {
                let m = [];
                for (let j = 0; j < difficulty; j++) {

                    m.push(null)

                }
                maze.push(m)
            }






            console.log(maze[0][1]);

        },

        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------



    }

}




game.generateGame(document.querySelector(`body`), `600`);