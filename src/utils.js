/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
chunkArray = (original, chunk_size) => {

    const arr = original.slice();

    const results = [];

    while (arr.length) {

        results.push(arr.splice(0, chunk_size));

    }

    return results;
}

module.exports.chunkArray = chunkArray;
