const displayState = (state) => {

    console.log(chalk.bold.red('-----------------'));

    console.log(chalk.bold.yellow('            1  2  3  '));
    console.log(chalk.bold.yellow('      ============='));

    utils.chunkArray(state.board, config.rowSize).map((row, index) => {


        console.log(chalk.bold.yellow(`      ${index + 1}  || ${row.join('  ')}`))


    });

    console.log(chalk.bold.red('-----------------'));

}

module.exports.displayState = displayState;

const displayWinner = (winner) => {

    console.log(chalk.bold.red('-----------------'));

    console.log(chalk.bold.blueBright(winner + " is the winner!"));

}

module.exports.displayWinner = displayWinner;

const displayDraw = (board) => {

    console.log(chalk.bold.red('-----------------'));

    console.log(chalk.bold.blueBright('A STRANGE GAME'));
    console.log(chalk.bold.blueBright('THE ONLY WINNING MOVE IS'));
    console.log(chalk.bold.blueBright('NOT TO PLAY'));

}

module.exports.displayDraw = displayDraw;
