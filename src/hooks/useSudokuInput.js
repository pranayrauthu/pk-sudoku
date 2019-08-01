import { useState } from 'react';
import { range } from 'lodash';

export function useSudokuInput(isActive){

    const [currentInput, setSudokuInput] = useState(null);

    const onSudokuInput = (e, force, gameOver) => {
        if( gameOver ){
            return;
        }
        const {key} = e;
        if( force || (isActive && range(1,10).includes( parseInt(key) )) ){
            setSudokuInput( key )
        }
    };

    return {
        currentInput,
        onSudokuInput
    };
}

export default useSudokuInput;