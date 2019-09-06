import {
    range,
    chunk,
    flatMap,
    shuffle,
    sampleSize
} from 'lodash';

const ZERO_TO_EIGHT = range(0, 9);
export const ONE_TO_NINE = range(1, 10);
const GROUP_INDEX = chunk(ZERO_TO_EIGHT, 3);

class GameGenerator {
    constructor() {
        this._game = null;
    }
    _getFlatCells() {
        if (!this._flatGameCells) {
            this._flatGameCells = flatMap(this._game);
        }
        return this._flatGameCells;
    }
    /**
     * 
     * @param {Number} rowIndex 
     * @param {Number} columnIndex 
     * @returns {Address}
     */
    _findGroupAddress(rowIndex, columnIndex) {
        return GROUP_INDEX.reduce((acc, cur, index) => {
            if (cur.includes(rowIndex)) {
                acc.rowIndex = index;
            }
            if (cur.includes(columnIndex)) {
                acc.columnIndex = index;
            }
            return acc;
        }, new Address());
    }
    _initializeGame() {
        this._game = ZERO_TO_EIGHT.map(
            rowIndex => ZERO_TO_EIGHT.map(
                columnIndex => {
                    const cellAddress = new Address(rowIndex, columnIndex);
                    const groupAddress = this._findGroupAddress(
                        rowIndex,
                        columnIndex
                    );
                    return new Cell(cellAddress, groupAddress);
                }
            )
        );
        // fill diagnol values
        const randomRow = chunk(this._randomOneToNine(), 3);
        [0, 1, 2].forEach(i => {
            const diagnolAddress = new Address(i, i);
            this._game.forEach(row => row.forEach(
                cell => {
                    if (cell.groupAddress.isSameAddress(diagnolAddress)) {
                        cell.value = randomRow[cell.cellAddress.rowIndex - (i * 3)][cell.cellAddress.columnIndex - (i * 3)];
                    }
                }
            ));
        });
    }
    _generateSolution() {
        while (true) {
            // generate possible values
            this._game.forEach(
                row => row.forEach(
                    cell => {
                        if (cell.value) {
                            cell.possibleValues = [];
                            return;
                        }
                        cell.possibleValues = this._getPossibleValue(cell);
                    }
                )
            );
            const hasSinglePossibleValue = this._getFlatCells()
                .some(
                    cell => cell.possibleValues.length === 1
                );
            if (hasSinglePossibleValue) {
                this._game.forEach(
                    row => row.forEach(
                        cell => {
                            if (cell.possibleValues.length === 1) {
                                cell.value = cell.possibleValues[0];
                            }
                        }
                    )
                );
            } else {
                this._assignRandomFromPossible();
            }

            const valuesFilled = this._getFlatCells()
                .every(
                    cell => cell.value
                );
            if (valuesFilled) {
                break;
            }
        }
    }
    _assignRandomFromPossible() {
        const cellWithLeastPossibles = this._getFlatCells().reduce( (acc, cur) => {
            if(acc.value && !cur.value){
                acc = cur;
            }
            if(
                !cur.value && 
                (cur.possibleValues.length < acc.possibleValues.length)
            ) {
                acc = cur;
            }
            return acc;
        } )
        cellWithLeastPossibles.value = cellWithLeastPossibles.possibleValues[0];
    }
    /**
     * 
     * @param {Cell} cell 
     */
    _getPossibleValue(cell) {
        let possibleValue = this._randomOneToNine();
        possibleValue = possibleValue.filter(value => (
            this._getFlatCells().every(gameCell => {
                if (cell.groupAddress.isSameAddress(gameCell.groupAddress)) {
                    if (gameCell.value && gameCell.value === value) {
                        return false;
                    }
                }
                if (cell.cellAddress.isSameColumn(gameCell.cellAddress)) {
                    if (gameCell.value && gameCell.value === value) {
                        return false;
                    }
                }
                if (cell.cellAddress.isSameRow(gameCell.cellAddress)) {
                    if (gameCell.value && gameCell.value === value) {
                        return false;
                    }
                }
                return true;
            })
        ));
        return possibleValue;
    }
    _randomOneToNine() {
        return shuffle(ONE_TO_NINE);
    }
    _generateHints() {
        const cellGrid = range(0,9)
        .map( x => (range(0, 9).map( y => ( `${x}${y}` ) )) );

        const randomCellGrid = sampleSize(flatMap(cellGrid), 33);

        this._game.forEach( (row, x) => (
            row.forEach( (cell, y) => {
                cell.isHint = randomCellGrid.includes(`${x}${y}`);
            } )
        ) );

    }
    generateGame(newGame) {
        if (!newGame && this._game) {
            return this._game;
        }
        this._initializeGame();
        this._generateSolution();
        this._generateHints();
        return this._game;
    }
}

class Cell {
    /**
     * 
     * @param {Address} cellAddress 
     * @param {Address} groupAddress 
     */
    constructor(cellAddress, groupAddress) {
        this.cellAddress = cellAddress;
        this.groupAddress = groupAddress;
        this.value = null;
        this.isHint = false;
        this.possibleValues = [];
    }
}

class Address {
    constructor(rowIndex, columnIndex) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }
    isDiagnol() {
        return (this.columnIndex === this.rowIndex);
    }
    isSameAddress(address) {
        return (
            this.columnIndex === address.columnIndex &&
            this.rowIndex === address.rowIndex
        );
    }
    isSameRow(address) {
        return (
            this.rowIndex === address.rowIndex
        );
    }
    isSameColumn(address) {
        return (
            this.columnIndex === address.columnIndex
        );
    }
}

/**
 * 
 * @returns {Array}
 */
export default function (){
    let game = (new GameGenerator()).generateGame(true);
    return game;
}
