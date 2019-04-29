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


        ///Proba generatora maze
        console.log(this.eventsManager.maze(10));

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

            // Filling maze with empty cells
            this.setEmptyMazeCells(maze, difficulty);

            // Setting start position
            maze[startX][startY].init = true;


            this.wygenerujProby(maze);
            // console.log(this.wygenerujProby(maze));

            // this.setWall(this.getCell(maze, 0, 0), `up`);
            // this.setWall(this.getCell(maze, 0, 0), `down`);

            // this.clearWall(this.getCell(maze, 0, 0), `down`);

            // console.log(this.getNeighbors(maze, 1, 0, difficulty));


            // console.log(cell);
            // console.log(this.getCell(maze, 0, 0));
            // console.log(maze[0][1]);

        },

        setEmptyMazeCells(maze, difficulty) {

            // Creating maze cells
            for (let i = 0; i < difficulty; i++) {
                let m = [];
                for (let j = 0; j < difficulty; j++) {

                    let cell = {
                        init: false,
                        walls: {
                            up: false,
                            down: false,
                            left: false,
                            right: false
                        }
                    }

                    m.push(cell)

                }
                maze.push(m)
            }

        },

        getNeighbors(maze, x, y, difficulty) {

            let neighbors = {
                up: null,
                down: null,
                left: null,
                right: null
            }

            // Out of maze
            if (x < 0 || y < 0 || x > difficulty - 1 || y > difficulty - 1) {
                return false;

                // If within range of maze
            } else {

                neighbors.up = ((y - 1) >= 0) ? this.getCell(maze, x, y - 1) : null
                neighbors.down = ((y + 1) < difficulty) ? this.getCell(maze, x, y + 1) : null
                neighbors.left = ((x - 1) >= 0) ? this.getCell(maze, x - 1, y) : null
                neighbors.right = ((x + 1) < difficulty) ? this.getCell(maze, x + 1, y) : null

            }

            return neighbors;

        },

        getCell(maze, x, y) {
            return maze[x][y];
        },

        setWall(cell, direction) {
            cell.walls[`${direction}`] = true;
        },

        clearWall(cell, direction) {
            cell.walls[`${direction}`] = false;
        },

        setAllWalls(cell) {
            cell.walls.up = true;
            cell.walls.down = true;
            cell.walls.left = true;
            cell.walls.right = true;
        },

        clearAllWalls(cell) {
            cell.walls.up = false;
            cell.walls.down = false;
            cell.walls.left = false;
            cell.walls.right = false;
        },


        ///--------------------------
        ///--------------------------
        ///--------------------------
        ///--------------------------


        wygenerujProby(maze) {

            // let newMaze = []

            maze[0][2].walls.left = true;
            maze[0][7].walls.left = true;
            maze[0][7].walls.right = true;
            maze[0][7].walls.up = true;
            maze[0][7].walls.down = true;

            // Creating maze cells // y
            for (let i = 0; i < maze.length; i++) {
                let mazeStringUp = ` `;
                let mazeStringDown = ` `;
                let mazeString = ` `;
                for (let j = 0; j < maze.length; j++) {

                    mazeStringDown = mazeStringDown + ` `;
                    mazeString = mazeString + ` `;
                    mazeStringUp = mazeStringUp + ` `;

                    if (maze[i][j].walls.left) {
                        mazeString = mazeString.substr(0, mazeString.length - 1) + `|`
                    }

                    if (maze[i][j].walls.right) {
                        mazeString = mazeString + ` |`;
                    }

                    if (maze[i][j].walls.up) {
                        mazeStringUp = mazeStringUp + `-`;
                    }

                    // if (maze[i][j].walls.left) {
                    //     mazeString = mazeString + `|`
                    // } else {
                    //     mazeString = mazeString + ` `
                    // }

                    // if (maze[i][j].walls.left) {
                    //     mazeString = mazeString + `|`
                    // } else {
                    //     mazeString = mazeString + ` `
                    // }

                    // if (maze[i][j].walls.left) {
                    //     mazeString = mazeString + `|`
                    // } else {
                    //     mazeString = mazeString + ` `
                    // }

                }
                console.log(mazeStringUp);
                console.log(mazeString);
                console.log(mazeStringDown);
                // newMaze.push(m)
            }

            // console.log(mazeString.substr(mazeString.length-1,1));
            // console.log(newMaze);
            // return newMaze

            // console.log(mazeString);

        }


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