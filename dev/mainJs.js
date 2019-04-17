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
    generateGame(parentElement = `body`, width = `500px`) {
        console.log(`Element rodzica: ${parentElement}`, `Szerokość: ${width}`);
    },
    //
    //
    //
    // generatingFunctions: {
    //     wyswietl(hej = `gg`){
    //         console.log(hej);
    //     }
    // }
};



// game.generatingFunctions.wyswietl();
// game.generateGame(`.content`,`700px`);