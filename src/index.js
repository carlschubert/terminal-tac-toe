const chalk = require('chalk');
const inquirer = require('inquirer');
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

    } else if (isDraw(state.board)) {

        display.displayDraw();

    } else {

        return getInput(state).then(input => {

            return play(advanceTurn(addInput(state, input)));

        });

    }

};

module.exports.play = play;

const getInput = (state) => {

    console.log(chalk.bold.white('Enter your move in an X,Y format i.e. 1,1'));

    const questions = [
        {
            type: 'input',
            name: 'coord',
            message: `${state.turn}'s turn`,
            filter: parseText,
            validate: validator(state),
        },
    ];
    return inquirer.prompt(questions).then(answers => {

        return answers.coord;

    });
}

const validator = (state) => {
    return (text) => {

        if (textIsValid(text) && isEmptySquare(text, state)) {
            return true;
        }
        return "Invalid move, try again."
    }
}

const textIsValid = (input) => {
    return (input.length === 2
        && input[0] <= config.rowSize
        && input[0] >= 0
        && input[1] <= config.rowSize
        && input[1] >= 0
    )
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
    return text.split(',').map(i => parseInt(i, 10) - 1);
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
