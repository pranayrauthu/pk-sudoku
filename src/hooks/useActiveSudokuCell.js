import { useState, useEffect } from 'react';

export function useActiveCellStatus(){
    const [activeCellId, setActiveCellId] = useState({x:"0",y:"0"});

    useEffect(() => {
        const checkCellAndUpdate = (e) => {
            const {
                name,
                x,
                y
            } = e.target.dataset;
            if(name === "sudoku-cell"){
                setActiveCellId({ x, y });
            }
        };
        window.addEventListener("mousedown", checkCellAndUpdate);

        return () => {
            window.removeEventListener("mousedown", checkCellAndUpdate);
        }
    });

    return activeCellId;
}

export default useActiveCellStatus;