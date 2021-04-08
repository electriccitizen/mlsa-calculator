function isNumber(x) {
    return Object.prototype.toString.call(x) === '[object Number]'
}

function convertToNumber(value) {
    return Number(value)
}

module.exports = { isNumber, convertToNumber }