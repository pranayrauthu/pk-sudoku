import {
    END_GAME
} from '../action-types';

const initialState = {
    values: [{
        address: {
            x: "0",
            y: "0",
        },
        isHint: true,
        correctValue: "5",
        inputValue: "4"
    }],
    currentSelection: {
        x: "0",
        y: "0"
    },
    gameStatus: "active" // or over
}

const actionMap = {
    [END_GAME]: (state) => ({
        ...state,
        gameStatus: "over"
    })
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