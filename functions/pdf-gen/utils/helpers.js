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
const divideIntoLines = (string, widths, defaultTo = "N/A", text = "Continued in Financial Affidavit Addendum") => {
    text = `(${text})`
    if (!string) return [[defaultTo]]

    const pixelWidthConfig =  { font: 'Helvetica', size: 13 }

    return Object.values(
        Object.entries(
            string
                .split(" ")
                .reduce((lines, word, index, array) => {
                    // Get current number of lines
                    const length = Object.keys(lines).length
                    const current = length - 1 < 0 ? 0 : length - 1

                    // Is last line
                    const isLastLine = Array.isArray(widths) && current === widths.length - 1

                    // Set max width field
                    const maxWidth = Array.isArray(widths) ? widths[current] : widths

                    // Calculate number of words
                    let words = [lines[current] || "", word].join(" ").trim()

                    // Check if rest words fit to last line
                    if (isLastLine) {
                        const restWords = array.slice(index, array.length)
                        const lastLineWidth = pixelWidth([words, restWords].join(" ").trim(), pixelWidthConfig)
                        if (Math.floor(lastLineWidth / maxWidth) >= 1) {
                            words = [words, text].join(" ").trim()
                        }
                    }

                    // Calculate width words
                    const width = pixelWidth(words, pixelWidthConfig)

                    // Set next number of page
                    const next = Math.floor(width / maxWidth) >= 1 ? current + 1 : current

                    // Is addendum
                    const isAddendum = Array.isArray(widths) && next >= widths.length

                    return {
                        ...lines,
                        ...(!isAddendum) && {
                            [next]: [
                                lines[next] || "",
                                word
                            ].join(" ").trim()
                        },
                        ...(isLastLine && isAddendum) && {
                            [current]: [
                                lines[current] || "",
                                text
                            ].join(" ").trim(),
                            "addendum": [
                                lines["addendum"] || "",
                                word
                            ].join(" ").trim()
                        },
                        ...(!isLastLine && isAddendum) && {
                            "addendum": [
                                lines["addendum"] || "",
                                word
                            ].join(" ").trim()
                        }
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

const splitLines = (data, widths, defaultTo = "") => {
    return data.reduce((lines, line) => {
        return [
            ...lines,
            ...divideIntoLines(line, widths, defaultTo)[0]
        ]
    }, [])
}

const flattenLines = (data) => {
    return data.reduce((lines, line) => {
        return [
            ...lines,
            ...(Array.isArray(line) ? line.reduce((a, b) => [...a, ...b]) : Array(line))
        ]
    }, [])
}

const setInvalidValuesAsNA = (data) => {
    return Object.keys(data)
        .reduce((acc, key) => {
            return {
                ...acc,
                [key]: (
                    data[key] === undefined ||
                    data[key] === null ||
                    data[key] === false ||
                    (typeof data[key] === "string" && !!!data[key].trim().length)
                ) ?
                    "N/A" :
                    data[key]
            }
        }, {})
}

// Operations with strings helpers
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = { getValue, getValueAsNumber, getValueAsArray, getValuesAsString, divideIntoLines, splitLines, flattenLines, setInvalidValuesAsNA, capitalize }