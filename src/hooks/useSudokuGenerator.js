import { useState } from 'react';
import {
    shuffle,
    range,
    chunk,
    concat,
    tail,
    head,
    flatMap,
    sampleSize
} from 'lodash';

function createGame() {
    const row1 = shuffle(range(1, 10));
    const row1Chunks = chunk(row1, 3);
    const row2Chunks = concat(
        tail(row1Chunks),
        [head(row1Chunks)]
    );
    const row2 = flatMap(row2Chunks);
    const row3Chunks = concat(
        tail(row2Chunks),
        [head(row2Chunks)]
    );
    const row3 = flatMap(row3Chunks);
    const row4 =  concat(tail(row1), [head(row1)]);
    const row4Chunks = chunk(row4, 3);
    const row5Chunks = concat(
        tail(row4Chunks),
        [head(row4Chunks)]
    );
    const row5 = flatMap(row5Chunks);
    const row6Chunks = concat(
        tail(row5Chunks),
        [head(row5Chunks)]
    );
    const row6 = flatMap(row6Chunks);
    const row7 =  concat(tail(row4), [head(row4)]);
    const row7Chunks = chunk(row7, 3);
    const row8Chunks = concat(
        tail(row7Chunks),
        [head(row7Chunks)]
    );
    const row8 = flatMap(row8Chunks);
    const row9Chunks = concat(
        tail(row8Chunks),
        [head(row8Chunks)]
    );
    const row9 = flatMap(row9Chunks);

    let game = [
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        row7,
        row8,
        row9
    ];

    const cellGrid = range(0,9)
        .map( x => (range(0, 9).map( y => ( `${x}${y}` ) )) );

    const randomCellGrid = sampleSize(flatMap(cellGrid), 28);

    game = game.map( (gameRow, x) => (
        gameRow.map( (value, y) => ({
            value,
            showValue: randomCellGrid.includes(`${x}${y}`)
        }) )
    ) );

    return game;       
    
}

const initialGame = createGame();


export function useSudokuGenerator() {
    const [game, setGame] = useState(initialGame);

    const refreshGame = () => {
        setGame(createGame());
    }

    return {
        game,
        refreshGame
    }
}

export default useSudokuGenerator;