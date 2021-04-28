// Form data helpers
const getValue = (nestedObj, pathArr, defaultTo) => {
    pathArr = Array.isArray(pathArr) ? pathArr : Array(pathArr)
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== undefined) ? obj[key] : defaultTo, nestedObj)
}

const getValueAsNumber = (nestedObj, pathArr, defaultTo = 0) => {
    return Number(getValue(nestedObj, pathArr, defaultTo)) || defaultTo
}

const getValueAsArray = (nestedObj, pathArr, defaultTo = []) => {
    return Object.values(getValue(nestedObj, pathArr, defaultTo))
}

module.exports = { getValue, getValueAsNumber, getValueAsArray }