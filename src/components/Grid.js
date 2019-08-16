import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get, range, isEqual } from 'lodash';

import Cell from './Cell';
import GameControls from './GameControls';
import { selectGameData } from './../redux/selectors';
import { inputValue } from './../redux/actions';

import './Grid.css';

export const Grid = () => {

    const game = useSelector(selectGameData, isEqual);

    const cells = game.map((gameRow, x) => {

        if ((x + 1) % 3 === 0) {
            return (
                <Fragment key={x}>
                    <div className='sudoku-grid-row'>
                        {gameRow.map(({ value, isHint, userInput }, y) => {

                            if ((y + 1) % 3 === 0) {
                                return (<Fragment key={`${y}${userInput}${value}${isHint}`}>
                                    <Cell
                                        x={x}
                                        y={y}
                                        value={value}
                                        isHint={isHint}
                                        userInput={userInput}>
                                    </Cell>
                                    <span className='gutter'></span>
                                </Fragment>)
                            }

                            return (
                                <Cell
                                    x={x}
                                    y={y}
                                    key={`${y}${userInput}${value}${isHint}`}
                                    value={value}
                                    isHint={isHint}
                                    userInput={userInput}>
                                </Cell>
                            );
                        })}
                    </div>
                    <div className='gutter'></div>
                </Fragment>
            );
        }

        return (
            <div key={x} className='sudoku-grid-row'>
                {gameRow.map(({ value, isHint, userInput }, y) => {

                    if ((y + 1) % 3 === 0) {
                        return (<Fragment key={`${y}${userInput}${value}${isHint}`}>
                            <Cell
                                x={x}
                                y={y}
                                value={value}
                                isHint={isHint}
                                userInput={userInput}>
                            </Cell>
                            <span className='gutter'></span>
                        </Fragment>);
                    }

                    return (
                        <Cell
                            x={x}
                            y={y}
                            key={`${y}${userInput}${value}${isHint}`}
                            value={value}
                            isHint={isHint}
                            userInput={userInput}>
                        </Cell>
                    );
                })}
            </div>
        );
    });

    const dispatch = useDispatch();
    useEffect(
        () => {
            function onKeyDown(e) {

                const key = parseInt(get(e, 'key', null));

                if (key && range(1, 10).includes(key)) {
                    dispatch(inputValue(key));
                }
            }
            window.addEventListener('keydown', onKeyDown);

            return () => {
                window.removeEventListener('keydown', onKeyDown);
            }
        },
        [dispatch]
    );

    return (
        <div>
            <div className='sudoku-grid'>
                {cells}
            </div>
            <GameControls/>
        </div >
    );
}

export default Grid;
