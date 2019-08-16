import React from 'react';
import { useSelector } from 'react-redux';

import { selectGameStatus } from './../redux/selectors';

const messageMap = {
    over: 'GAME OVER',
    active: 'The Game is ON'
}

const GameStatus = () => {

    const gameStatus = useSelector(selectGameStatus);
    const message = messageMap[gameStatus]

    return (
        <div>{message}</div>
    );
}

export default GameStatus;