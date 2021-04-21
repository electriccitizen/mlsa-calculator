function isNumber(x) {
    return Object.prototype.toString.call(x) === '[object Number]'
}

function convertToNumber(value) {
    return Number(value)
}

function convertToString(value) {
    return String(value)
}

const getValue = (nestedObj, pathArr, defaultTo = 0) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== undefined) ? obj[key] : defaultTo, nestedObj)
}

const getValueAsNumber = (...args) => {
    return Number(getValue(...args))
}

module.exports = { isNumber, convertToNumber, convertToString, getValue, getValueAsNumber }