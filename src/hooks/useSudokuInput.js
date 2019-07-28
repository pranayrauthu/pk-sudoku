import { useState } from 'react';
import { range } from 'lodash';

export function useSudokuInput(isActive){

    const [currentInput, setSudokuInput] = useState(null);

    const onSudokuInput = (e) => {
        const {key} = e;
        if(isActive && range(1,10).includes( parseInt(key) ) ){
            setSudokuInput( key )
        }
    };

    const resetInput = () => {
        setSudokuInput(null);
    }

    return {
        currentInput,
        onSudokuInput,
        resetInput
    };
}

export default useSudokuInput;