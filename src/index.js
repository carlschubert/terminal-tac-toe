const chalk = require('chalk');
const inquirer = require('inquirer');
const checker = require('../src/checker.js');
const config = require('../src/config');
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

/**
 * Takes state and returns an input tuple
 *
 * @param {Object} state a game state object
 * @returns {Array} input, a tuple of user coords
 */
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

/**
 * Creates a function to validate user input
 * Text needs to be a comma delimited string corresponding to an empty space 
 * @param {Object} state
 * @returns {Function}
 */
const validator = (state) => {
    return (text) => {

        if (textIsValid(text) && isEmptySquare(text, state)) {
            return true;
        }
        return "Invalid move, try again."
    }
}
/**
 * Determines if an input is valid
 *
 * @param {Array} input an input tuple of user coords
 * @returns {Bool} 
 */
const textIsValid = (input) => {
    return (input.length === 2
        && input[0] <= config.rowSize
        && input[0] >= 0
        && input[1] <= config.rowSize
        && input[1] >= 0
    )
};

/**
 * Add a new user move to game state
 *
 * @param {Object} state game state object
 * @param {Array} input an input tuple of user coords
 * @returns {Object} state game state object
 */
const addInput = (state, input) => {

    const index = input[0] + (input[1] * config.rowSize);

    const newState = {

        board: Object.assign([], state.board, { [index]: state.turn }),

    }

    return Object.assign({}, state, newState);

}
/**
 * Checks that the inputed coords represent an empty spot on the board
 *
 * @param {Object} state game state object
 * @param {Array} input an input tuple of user coords
 * @returns {Bool}
 */
const isEmptySquare = (input, state) => {

    const index = input[0] + (input[1] * config.rowSize);

    return state.board[index] === '-';
}

/**
 *  Parse string text into a tuple like structure
 * @param text {String} the string text that the user entered
 * @param input {Array} A two integer tuple
 */
const parseText = text => {
    return text.split(',').map(i => parseInt(i, 10) - 1);
}
/**
 * Check if the game board has a winner
 *
 * @param {Array} board
 * @returns {Bool}
 */
const isSolved = (board) => {

    return checker.checkBoard(board);

}

/**
 * Check if the game board is in a draw state
 *
 * @param {Array} board
 * @returns
 */
const isDraw = (board) => {

    return !board.includes('-');

}
/**
 * Changes which users turn it is in state
 *
 * @param {Object} state
 * @returns {Object} state
 */
const advanceTurn = (state) => {

    const newState = {

        turn: state.turn === 'X' ? 'O' : 'X',

    }

    return Object.assign({}, state, newState);

};
