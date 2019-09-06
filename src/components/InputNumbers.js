import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { inputValue } from './../redux/actions';
import { ONE_TO_NINE } from './../utils/generateGame.v2';

import './InputNumbers.css';

const Input = ({ value }) => {

    const dispatch = useDispatch();
    const onInputClick = useCallback(
        () => {
            dispatch(inputValue(value))
        },
        [dispatch, value]
    );
    return (
        <button className="input-value-box" onClick={onInputClick}>
            <span className="input-value">
                {value}
            </span>
        </button>
    );
}

const InputNumbers = () => (
    <div className="input-values">
        {
            ONE_TO_NINE.map((value, i) => (
                <Input value={value} key={i} />
            ))
        }
    </div>
);

export default InputNumbers;