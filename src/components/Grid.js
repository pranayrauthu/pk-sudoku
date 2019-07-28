import React from 'react';

import Cell from './Cell';
import useSudokuGenerator from './../hooks/useSudokuGenerator';

import './Grid.css';

export const Grid = () => {


    const { game, refreshGame } = useSudokuGenerator();

    const cells = game.map((gameRow, x) => (
        <div key={x} className='sudoku-grid-row'>
            {gameRow.map((cellGameValue, y) => (
                <Cell x={x} y={y} key={y} gameValue={cellGameValue}></Cell>
            ))}
        </div>
    ));

    return (
        <div>
            <div className='sudoku-grid'>
                {cells}
            </div>
            <div>
                <div>The Game is ON</div>
                <button onClick={refreshGame}>new game</button>
                <button>check</button>
            </div>
        </div>
    );
}

export default Grid;