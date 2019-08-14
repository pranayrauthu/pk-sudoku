import cloneDeep from 'lodash/cloneDeep';
import {
    END_GAME,
    NEW_GAME,
    CHANGE_SELECTION,
    INPUT_VALUE,
    RESET_INPUT
} from '../action-types';
import generateGame from './../../utils/generateGame';

const initialState = {
    values: generateGame(),
    currentSelection: {
        x: 0,
        y: 0
    },
    gameStatus: "active"
}

const actionMap = {
    [END_GAME]: (state) => ({
        ...state,
        gameStatus: "over"
    }),
    [NEW_GAME]: (state, data) => ({
        ...state,
        values: data
    }),
    [CHANGE_SELECTION]: (state, data) => ({
        ...state,
        currentSelection: data
    }),
    [INPUT_VALUE]: (state, data) => {
        const {
            currentSelection: {x,y}
        } = state;

        const newValues = cloneDeep(state.values);
        newValues[x][y].userInput = data;
        
        return {
            ...state,
            values: newValues
        }
    },
    [RESET_INPUT]: (state) => {
        const {
            currentSelection: {x,y}
        } = state;

        const newValues = cloneDeep(state.values);
        newValues[x][y].userInput = null;
        
        return {
            ...state,
            values: newValues
        }
    }
}

function game(state = initialState, action){
    const {type, data} = action;
    const matchedAction = actionMap[type];
    if(matchedAction){
        return matchedAction(state, data);
    }
    return state;
}

export default game;