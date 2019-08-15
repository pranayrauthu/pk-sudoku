import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeSelection
} from './../redux/actions';
import {
    selectCurrentSelection,
    selectGameStatus
} from './../redux/selectors';
import './Cell.css';

export const Cell = ({
    x,
    y,
    value,
    userInput,
    isHint
}) => {

    let active = '';
    let reveal = '';
    let hint = '';
    const currentSelection = useSelector(selectCurrentSelection);
    const gameStatus = useSelector(selectGameStatus);
    const isActive = x === currentSelection.x && y === currentSelection.y;
    const currentInput = isHint ? value : userInput;
    if(isActive){
        active = ' active';
    }
    if(isHint){
        hint = ' hint'
    }
    
    if(gameStatus === 'over'){
        if( value  === currentInput ){
            reveal = ' correct';
        } else {
            reveal = ' wrong';
        }
    } else {
        if( isActive ){
            reveal = ' active-bg'
        }
    }

    const dispatch = useDispatch();
    const onCellClick = useCallback(
        () => dispatch(changeSelection({x,y})),
        [dispatch, x, y]
    );

    return (
        <span
            data-name="sudoku-cell"
            data-x={x}
            data-y={y}
            data-gamevalue={value}
            className={'cell'+active+reveal+hint}
            onClick={onCellClick}>
            <span className='cell-value'>{currentInput}</span>
        </span>
    );
}

export default Cell;