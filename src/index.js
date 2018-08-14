const chalk = require('chalk');
const checker = require('../src/checker.js');
const config = require('../src/config');
const utils = require('../src/utils.js');
const display = require('../src/display.js');

/*
 *  Runs a game of tic tac toe.
*/
const play = (state) => {

    display.displayState(state);

    if (isSolved(state.board)) {

        display.displayWinner(state.turn === 'X' ? 'O' : 'X');

        process.exit();

    } else if (isDraw(state.board)) {

        display.displayDraw();

        process.exit();

    } else {

        getInput(state, input => {

            play(advanceTurn(addInput(state, input)));

        });

    }

};

module.exports.play = play;

const getInput = (state, cb) => {

    console.log(chalk.bold.white(`${state.turn}'s turn`));
    console.log(chalk.bold.white('Enter your move i.e. 1,1'));

    process.stdin.setEncoding('utf8');

    process.stdin.once('data', text => {

        const input = parseText(text);

        if (textIsValid(input, state) && isEmptySquare(input, state)) {
            cb(input);
        } else {
            console.log(chalk.red("Invalid move, try again\n"));
            takeInput(state, cb);
        }

    });

};

function textIsValid(input, state) {
    return input.length === 2
        && input[0] <= config.rowSize
        && input[1] <= config.rowSize
};

const addInput = (state, input) => {

    const index = input[0] + (input[1] * config.rowSize);

    const newState = {

        board: Object.assign([], state.board, { [index]: state.turn }),

    }

    return Object.assign({}, state, newState);

}

const isEmptySquare = (input, state) => {

    const index = input[0] + (input[1] * config.rowSize);

    return state.board[index] === '-';
}

const parseText = text => {
    return text.replace(/(\r\n|\n|\r)/gm, "").split(',').reverse().map(i => parseInt(i, 10) - 1);
}

const isSolved = (board) => {

    return checker.checkBoard(board);

}


const isDraw = (board) => {

    return !board.includes('-');

}

const advanceTurn = (state) => {

    const newState = {

        turn: state.turn === 'X' ? 'O' : 'X',

    }

    return Object.assign({}, state, newState);

};
