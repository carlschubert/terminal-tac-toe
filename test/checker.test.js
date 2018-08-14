
const assert = require('chai').assert;
const checker = require('../src/checker.js');

// base board

const BR_BASE = [
    '-', '-', '-',
    '-', '-', '-',
    '-', '-', '-',
];

//solved X wins horizontal
const BR_X = [
    'X', 'X', 'X',
    'O', '-', 'O',
    'O', '-', '-',
];

//solved O wins vertical
const BR_O = [
    'O', '-', 'X',
    'O', 'X', 'X',
    'O', '-', '-',
];

//draw
const BR_DRAW = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    'O', 'X', 'O',
];

//solved right diagnal
const BR_RD = [
    'X', '-', 'X',
    'O', 'X', 'O',
    'X', '-', '-',
];
//solved left diagnal
const BR_LD = [
    'O', '-', 'X',
    'O', 'O', 'O',
    'X', '-', 'O',
];

describe('sortBoard', () => {

    let result;

    beforeEach(() => {
        result = [];
    });

    it('should format a horizontal board', () => {
        result = [
            'X', 'X', 'X',
            'O', '-', 'O',
            'O', '-', '-',
        ];
        assert.deepEqual(checker.sortBoard(BR_X, checker.selectHorizontal), result);
    })

    it('should format a vertical board', () => {
        result = [
            'O', 'O', 'O',
            '-', 'X', '-',
            'X', 'X', '-',
        ];
        assert.deepEqual(checker.sortBoard(BR_O, checker.selectVertical), result);
    })
    it('should format a left diagnal from a board', () => {

        result = ['O', 'O', 'O'];

        assert.deepEqual(checker.sortBoard(BR_LD, checker.selectLeftDiagonal), result);

    })
    it('should format a right diagnal from a board', () => {

        result = ['X', 'X', 'X'];

        assert.deepEqual(checker.sortBoard(BR_RD, checker.selectRightDiagonal), result);

    })
})

describe('checkBoard', () => {
    it('should return true given a solved board', () => {
        assert.isTrue(checker.checkBoard(BR_X))
    })

    it('should return true given a solvable board', () => {
        assert.isFalse(checker.checkBoard(BR_BASE))
    })

    it('should return false given a draw board', () => {
        assert.isFalse(checker.checkBoard(BR_DRAW))
    })
})

describe('checkRows Horizontal', () => {

    it('should return true given a solved board', () => {
        assert.isTrue(checker.checkRows(BR_X, checker.selectHorizontal))
    })

    it('should return false given a unsolved board', () => {
        assert.isFalse(checker.checkRows(BR_O, checker.selectHorizontal))
    })
})

describe('checkRows Vertical', () => {
    it('should return true given a solved board', () => {
        assert.isTrue(checker.checkRows(BR_O, checker.selectVertical))
    })

    it('should return false given a unsolved board', () => {
        assert.isFalse(checker.checkRows(BR_X, checker.selectVertical))
    })
})

describe('checkRows Left Diagnal', () => {
    it('should return true given a solved board', () => {
        assert.isTrue(checker.checkRows(BR_LD, checker.selectLeftDiagonal))
    })

    it('should return false given a unsolved board', () => {
        assert.isFalse(checker.checkRows(BR_X, checker.selectLeftDiagonal))
    })
})
