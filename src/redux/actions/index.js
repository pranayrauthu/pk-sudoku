import {
    END_GAME,
    NEW_GAME,
    CHANGE_SELECTION,
    INPUT_VALUE,
    RESET_INPUT,
    RESET_ALL_INPUTS
} from '../action-types';
import generateGame from './../../utils/generateGame';

export function endGame() {
    return {
        type: END_GAME
    };
}

export function newGame() {
    return {
        type: NEW_GAME,
        data: generateGame()
    };
}

export function changeSelection(data) {
    return {
        type: CHANGE_SELECTION,
        data
    };
}

export function inputValue(data) {
    return {
        type: INPUT_VALUE,
        data
    };
}

export function resetInput(data) {
    return {
        type: RESET_INPUT,
        data
    };
}

export function resetAllInputs() {
    return {
        type: RESET_ALL_INPUTS
    };
}
