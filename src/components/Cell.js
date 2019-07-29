import React, { useEffect, useState } from 'react';

import useActiveSudokuCell from '../hooks/useActiveSudokuCell';
import useSudokuInput from '../hooks/useSudokuInput';
import './Cell.css';

export const Cell = ({ x, y, gameValue, showValue, checkResult }) => {

    const [stateGameValue, setStateGameValue] = useState(gameValue);

    let active = '';
    let reveal = '';
    const activeCell = useActiveSudokuCell();
    const isActive = x + '' === activeCell.x && y + '' === activeCell.y;
    const {
        currentInput,
        onSudokuInput   
    } = useSudokuInput(isActive);
    if(isActive){
        active = ' active';
    }

    useEffect(() => {
        if(showValue){
            onSudokuInput({ key: gameValue }, true);
        }
    }, [showValue]);

    useEffect(() => {

        window.addEventListener('keydown', onSudokuInput);
        return () => {
            window.removeEventListener('keydown', onSudokuInput);
        }

    });
    
    if(checkResult){
        if( gameValue == currentInput ){
            reveal = ' correct';
        } else {
            reveal = ' wrong';
        }
    }

    return (
        <span
            data-name="sudoku-cell"
            data-x={x}
            data-y={y}
            data-gamevalue={gameValue}
            className={'cell'+active+reveal}>
            <span className='cell-value'>{currentInput}</span>
        </span>
    );
}

export default Cell;