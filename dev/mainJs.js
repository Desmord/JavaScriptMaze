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

    generateGame(parentElement = `body`, width = `500`) {
        // Setting game starting data
        this.parentElement = parentElement;
        this.width = width;
        this.height = this.width * 1.1;

        // Adding game to parent element
        //tutaj pierw dodac poszczegule elementy do contenera a pozniej do rodzica
        this.parentElement.appendChild(this.generatingMethods.createMainContainer(this.width, this.height));

    },

    generatingMethods: {
        /**
         * Create and return game main container element
         * @return {HTML element}
         */
        createMainContainer(width, height) {

            let container = document.createElement(`div`);
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
            container.style.backgroundColor = `rgba(52, 179, 168,0.9)`;

            return container;

        }

        // create levevdificulty
        // create start/ stop
        // create gamePanel
        // setGame - ustawia i wyswietla w elemencie partent

    }

}




game.generateGame(document.querySelector(`body`), `600`);