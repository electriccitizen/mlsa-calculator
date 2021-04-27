const isNumber = (x) => {
    return Object.prototype.toString.call(x) === '[object Number]'
}

// Form data helpers
const getValue = (nestedObj, pathArr, defaultTo) => {
    pathArr = Array.isArray(pathArr) ? pathArr : Array(pathArr)
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== undefined) ? obj[key] : defaultTo, nestedObj)
}

const getValueAsNumber = (nestedObj, pathArr, defaultTo = 0) => {
    return Number(getValue(nestedObj, pathArr, defaultTo))
}

const getValueAsArray = (nestedObj, pathArr, defaultTo = []) => {
    return Object.values(getValue(nestedObj, pathArr, defaultTo))
}

const getValueAsMoney = (nestedObj, pathArr, defaultTo) => {
    return numberFormatToMoney(getValueAsNumber(nestedObj, pathArr, defaultTo))
}

// Data helpers
const calcTotal = (array) => {
    if (!array) return 0
    return array.reduce((a, b) => a + b, 0)
}

const numberFormatToMoney = (number) => {
    if (!isNumber(number)) return number
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(number)
}

const parseDataToMoney = (data) => {
    if (!data) return {}
    return (Array.isArray(data) ? data : Array(data)).map(nested => {
        return Object.keys(nested).reduce((acc, key) => {
            return {
                ...acc,
                [key]: numberFormatToMoney(nested[key])
            }
        }, {})
    })
}

module.exports = { isNumber, getValue, getValueAsNumber, getValueAsArray, getValueAsMoney, calcTotal, numberFormatToMoney, parseDataToMoney }