const config = require('../src/config');
const utils = require('../src/utils');

const checkBoard = (board) => {

    return checkRows(board, selectHorizontal)
        || checkRows(board, selectVertical)
        || checkRows(board, selectRightDiagonal)
        || checkRows(board, selectLeftDiagonal)

}

exports.checkBoard = checkBoard;

const selectHorizontal = (i, j) => {
    return Math.floor(j / config.rowSize) === i
}
exports.selectHorizontal = selectHorizontal

const selectVertical = (i, j) => {
    return j % config.rowSize === i
}
exports.selectVertical = selectVertical

const selectLeftDiagonal = (i, j) => {
    return ((i * config.rowSize) + i)  === j;
}

exports.selectLeftDiagonal = selectLeftDiagonal

const selectRightDiagonal = (i, j) => {
    return (((i + 1) * config.rowSize) - (i + 1))  === j;
}

exports.selectRightDiagonal = selectRightDiagonal

const checkForEmpty = (board) => {
    
    return board.includes('-');

}

exports.checkForEmpty = checkForEmpty;

//board, callback => groups
// break board into groups based on the selection callback
const sortBoard = (board, conditionCB) => {
    const groups = []
    for (let i = 0; i < config.rowSize; i++) {

        for (let j = 0; j < board.length; j++) {
            if (conditionCB(i, j)) {
                groups.push(board[j])
            }
        }
    }
    return groups
}
exports.sortBoard = sortBoard;

const checkRows = (board, cb) => {

    let groups = utils.chunkArray(sortBoard(board, (i, j) => cb(i, j)), config.rowSize);

    return groups.some(checkRowForSolved);

}

exports.checkRows = checkRows;

// row => boolean
// checks a row to see if it is a solved
const checkRowForSolved = row => row.every(val => { 

    return (val === row[0] && row[0] !== '-');

})

exports.checkRowForSolved = checkRowForSolved;
