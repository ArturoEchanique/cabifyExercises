const checkIfEmpty = (str) => {

    if (str === '') return true

    const strArr = str.split('')

    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] !== ' ') {
            return false
        }
    }
    return true
}

module.exports = checkIfEmpty