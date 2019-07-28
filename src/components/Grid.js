import React from 'react';
import Cell from './Cell';

import './Grid.css';

export const Grid = () => {
    const cellsData = Array.from({length:9}).map((x,i) => i);
    const cells = cellsData.map(x => (
        <div key={x} className='sudoku-grid-row'>
            {cellsData.map(y => (<Cell x={x} y={y} key={y}></Cell>))}
        </div>
    ));

    return (
        <div className='sudoku-grid'>
            { cells }
        </div>
    );
}

export default Grid;