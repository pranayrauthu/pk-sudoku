import React, { useEffect } from 'react';

import useActiveSudokuCell from '../hooks/useActiveSudokuCell';
import useSudokuInput from '../hooks/useSudokuInput';
import './Cell.css';

export const Cell = ({ x, y }) => {

    let active = '';
    const activeCell = useActiveSudokuCell();
    const isActive = x + '' === activeCell.x && y + '' === activeCell.y;
    const {currentInput, onSudokuInput} = useSudokuInput(isActive);
    if(isActive){
        active = ' active';
    }

    useEffect(() => {

        window.addEventListener('keydown', onSudokuInput);
        return () => {
            window.removeEventListener('keydown', onSudokuInput);
        }

    });

    return (
        <span
            data-name="sudoku-cell"
            data-x={x}
            data-y={y}
            className={'cell'+active}>
            <span className='cell-value'>{currentInput}</span>
        </span>
    );
}

export default Cell;