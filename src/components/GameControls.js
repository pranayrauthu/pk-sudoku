import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import InputNumbers from './InputNumbers';

import './GameControls.css';

import {
    endGame,
    resetInput,
    newGame
} from './../redux/actions';

const GameControls = () => {

    const dispatch = useDispatch();

    const onNewGameClick = useCallback(
        () => dispatch(newGame()),
        [dispatch]
    );

    const onCheckClick = useCallback(
        () => dispatch(endGame()),
        [dispatch]
    );
    
    const onClearClick = useCallback(
        () => dispatch(resetInput()),
        [dispatch]
    );

    return (
        <div className='game-ctrl-section'>
            <InputNumbers />
            <div>The Game is ON</div>
            <button
                onClick={onNewGameClick}
                className='game-ctrl-btn'
            >new game</button>
            <button
                onClick={onClearClick}
                className='game-ctrl-btn'
            >clear</button>
            <button
                onClick={onCheckClick}
                className='game-ctrl-btn'
            >check</button>
        </div>
    );
}

export default GameControls;
