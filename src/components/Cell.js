import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useActiveSudokuCell from '../hooks/useActiveSudokuCell';
import useSudokuInput from '../hooks/useSudokuInput';
import { changeSelection } from './../redux/actions';
import './Cell.css';

export const Cell = ({ x, y, gameValue, showValue, checkResult }) => {

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
            onSudokuInput({ key: gameValue }, true, checkResult);
        }
    }, [showValue, onSudokuInput, checkResult, gameValue ]);

    useEffect(() => {

        const onKeyDown = (e) => {
            onSudokuInput(e, false, checkResult);
        }

        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }

    }, [checkResult, onSudokuInput]);
    
    if(checkResult){
        if( gameValue == currentInput ){
            reveal = ' correct';
        } else {
            reveal = ' wrong';
        }
    } else {
        if( isActive ){
            reveal = ' active-bg'
        }
    }

    /**
     * REDUX REGION - START
     */
    const dispatch = useDispatch();
    const onCellClick = useCallback(
        () => dispatch(changeSelection({x,y})),
        [dispatch, x, y]
    );

    /**
     * REDUX REGION - END
     */

    return (
        <span
            data-name="sudoku-cell"
            data-x={x}
            data-y={y}
            data-gamevalue={gameValue}
            className={'cell'+active+reveal}
            onClick={onCellClick}>
            <span className='cell-value'>{currentInput}</span>
        </span>
    );
}

export default Cell;