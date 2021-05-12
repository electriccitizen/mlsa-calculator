var pixelWidth = require('string-pixel-width')

// Form data helpers
const getValue = (nestedObj, pathArr, defaultTo) => {
    pathArr = Array.isArray(pathArr) ? pathArr : Array(pathArr)
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== undefined && obj[key] !== null) ? obj[key] : defaultTo, nestedObj)
}

const getValueAsNumber = (nestedObj, pathArr, defaultTo = 0) => {
    return Number(getValue(nestedObj, pathArr, defaultTo)) || defaultTo
}

const getValueAsArray = (nestedObj, pathArr, defaultTo = []) => {
    return Object.values(getValue(nestedObj, pathArr, defaultTo))
}

const getValuesAsString = (nestedObj, pathsArr, args = { defaultTo: "", separator: "" }) => {
    const { defaultTo, separator } = args
    return pathsArr.reduce((string, pathArr) => {
        const value = getValue(nestedObj, pathArr, defaultTo)
        return string ? value ? [string, value].join(separator + " ") : string : value
    }, null)
}

// Form field helpers
const divideIntoLines = (string, widths, defaultTo = "N/A") => {
    if (!string) return [[defaultTo]]

    return Object.values(
        Object.entries(
            string
                .split(" ")
                .reduce((lines, word) => {
                    // Get current number of lines
                    const length = Object.keys(lines).length
                    const current = length - 1 < 0 ? 0 : length - 1

                    // Calculate number of words
                    const words = [lines[current] || "", word].join(" ").trim()

                    // Calculate width words
                    const width = pixelWidth(words, { font: 'Helvetica', size: 13 })

                    // Set max width field
                    const maxWidth = Array.isArray(widths) ? widths[current] : widths

                    // Set next number of page
                    const next = Math.floor(width / maxWidth) >= 1 ? current + 1 : current

                    if (Array.isArray(widths) && next >= widths.length) {
                        return {
                            ...lines,
                            "addendum": [lines["addendum"] || "", word].join(" ").trim()
                        }
                    }

                    return {
                        ...lines,
                        [next]: [lines[next] || "", word].join(" ").trim()
                    }
                }, {})
        ).reduce((lines, [key, value]) => {
            if (key !== "addendum") {
                return {
                    ...lines,
                    "lines": [
                        ...(lines["lines"] || []),
                        value
                    ]
                }
            } else {
                return {
                    ...lines,
                    "addendum": value
                }
            }
        }, {})
    )
}

const parseLinesByNewLine = (data, widths, defaultTo = "N/A") => {
    return data.reduce((lines, line) => {
        return [
            ...lines,
            ...line
                .split(/\n/g)
                .reduce((strings, string) => {
                    return [
                        ...strings,
                        ...divideIntoLines(string, widths, defaultTo)[0]
                    ]
                }, [])
        ]
    }, [])
}

module.exports = { getValue, getValueAsNumber, getValueAsArray, getValuesAsString, divideIntoLines, parseLinesByNewLine }