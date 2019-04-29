import css from "./mainCss.css";


const game = {
    parentElement: null,
    width: `500px`,
    height: `600px`,
    difficultyLevel: 10,
    maze: [],
    path: [],
    playerPosition: [0, 0],
    endPosition: [9, 9],
    numberOfPlayerMoves: 0,

    /**
     * Generate and add game element no site, adds elements events
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

        // Setting maze cells
        this.maze = this.mazeManager.createMaze(this.difficultyLevel);
        this.path = this.mazeManager.createMazePath(this.difficultyLevel);


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

        },


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

        }


    },

    mazeManager: {

        createMaze(difficulty) {

            let maze = [];

            for (let i = 0; i < difficulty; i++) {
                let mazeRow = [];
                for (let j = 0; j < difficulty; j++) {

                    mazeRow.push(this.createCell())

                }
                maze.push(mazeRow)
            }

            return maze;

        },

        /**
         * Creating maze cell
         * @return {object}
         */
        createCell() {
            return {
                up: this.rollIfWall(),
                down: this.rollIfWall(),
                left: this.rollIfWall(),
                right: this.rollIfWall()
            }
        },

        /**
         * Rolls if wall or not
         * @return {boolean}
         */
        rollIfWall() {
            return (Math.floor((Math.random() * 2) + 1)) == 1 ? true : false;
        },

        /**
         * Creating maze path
         * @param {number} difficulty level
         * @return {array} array with path corridinates
         */
        createMazePath(difficulty) {

            let path = []
            let currentCell = { x: 0, y: 0 };

            while ((currentCell.x != difficulty - 1) || (currentCell.y != difficulty - 1)) {

                let direction = this.rollPathDirection();

                if (direction == `D`) {

                    if (currentCell.y == difficulty - 1) {
                        currentCell.x++
                    } else {
                        currentCell.y++
                    }

                } else {

                    if (currentCell.x == difficulty - 1) {
                        currentCell.y++
                    } else {
                        currentCell.x++
                    }

                }

                let pathCell = {
                    x: currentCell.x,
                    y: currentCell.y
                }

                path.push(pathCell);

            }

            return path;
        },

        /**
         * Roll down/right path direction
         * @return {string} direction
         */
        rollPathDirection() {
            return (Math.floor((Math.random() * 2) + 1)) == 1 ? `D` : `R`;
        },

        setPath(maze, path) {

            path.forEach((pathCell, index, arr) => {

                if (arr[index - 1]) {
                    if (pathCell.x != arr[index - 1].x) {
                        maze[pathCell.x][pathCell.y].up = true;
                        maze[pathCell.x - 1][pathCell.y].down = true;
                    } else {
                        maze[pathCell.x][pathCell.y].left = true;
                        maze[pathCell.x][pathCell.y - 1].right = true;
                    }
                }

            })

        }

    }

}




game.generateGame(document.querySelector(`body`), `600`);