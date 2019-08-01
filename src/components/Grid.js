import React, { Fragment, useState } from 'react';

import Cell from './Cell';
import useSudokuGenerator from './../hooks/useSudokuGenerator';

import './Grid.css';

export const Grid = () => {


    const { game, refreshGame } = useSudokuGenerator();
    const [checkResult, setCheckResult] = useState(false);

    const cells = game.map((gameRow, x) => {

        if ((x + 1) % 3 === 0) {
            return (
                <Fragment key={x}>
                    <div className='sudoku-grid-row'>
                        {gameRow.map(({ value, showValue }, y) => {

                            if ((y + 1) % 3 === 0) {
                                return (<Fragment key={y}>
                                    <Cell
                                        x={x}
                                        y={y}
                                        gameValue={value}
                                        showValue={showValue}
                                        checkResult={checkResult}>
                                    </Cell>
                                    <span className='gutter'></span>
                                </Fragment>)
                            }

                            return (
                                <Cell x={x} y={y} key={y} gameValue={value} showValue={showValue} checkResult={checkResult}></Cell>
                            );
                        })}
                    </div>
                    <div className='gutter'></div>
                </Fragment>
            );
        }

        return (
            <div key={x} className='sudoku-grid-row'>
                {gameRow.map(({ value, showValue }, y) => {

                    if ((y + 1) % 3 === 0) {
                        return (<Fragment key={y}>
                            <Cell x={x} y={y} gameValue={value} showValue={showValue} checkResult={checkResult}></Cell>
                            <span className='gutter'></span>
                        </Fragment>);
                    }

                    return (
                        <Cell x={x} y={y} key={y} gameValue={value} showValue={showValue} checkResult={checkResult}></Cell>
                    );
                })}
            </div>
        );
    });

    function onNewGameClick(){
        // TODO: Need to implement refreshGame
        // refreshGame();
        // setCheckResult(false);

        window.location.reload();
    }

    return (
        <div>
            <div className='sudoku-grid'>
                {cells}
            </div>
            <div className='game-ctrl-section'>
                <div>The Game is ON</div>
                <button
                    onClick={onNewGameClick}
                    className='game-ctrl-btn'
                >new game</button>
                <button
                    onClick={() => setCheckResult(true)}
                    className='game-ctrl-btn'
                >check</button>
            </div>
        </div >
    );
}

export default Grid;