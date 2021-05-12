const { getValue } = require("../utils/helpers")

const getAddendum = (form, addendum, maxLines) => {
    if (!addendum || addendum.length <= 0 || addendum.filter(a => a.length > 0).length <= 0) return null

    return mapToPages(addendum, maxLines).map((page, index) => {
        let data = {}
        data["addendum.csed"] = getValue(form, ["CSED"])
        data["addendum.mother"] = `${getValue(form, ["Primary", "fname"], "")} ${getValue(form, ["Primary", "lname"], "")}`
        data["addendum.father"] = `${getValue(form, ["OtherParent", "fname"], "")} ${getValue(form, ["OtherParent", "lname"], "")}`
        data["addendum.page"] = index + 1

        data["addendum.copy"] = page.reduce((copy, data) => {
            const lines = data.reduce((lines, line) => {
                return lines += `${line}\n`
            }, "")
            return copy += `${lines}\n`
        }, "")

        return data
    })
}

// Helpers
const mapToPages = (addendum, maxLines) => {
    // Sum data length and new line
    const calcLines = (data) => {
        return data ? data.length + 1 : 0
    }

    return Object.values(
        addendum
            .reduce((splitedData, data) => {
                return [
                    ...splitedData,
                    ...(calcLines(data) > maxLines ?
                        Object.values(
                            data.reduce((acc, line, index) => {
                                const next = Math.floor(index / maxLines)
                                return {
                                    ...acc,
                                    [next]: [
                                        ...(acc[next] || []),
                                        line
                                    ]
                                }
                            }, {})
                        ) :
                        [data]
                    )
                ]
            }, [])
            .reduce((pages, data) => {
                // Get current number of page
                const length = Object.keys(pages).length
                const current = length - 1 < 0 ? 0 : length - 1

                // Calculate number of lines
                const lines = (pages[current] || []).reduce((sum, d) => (sum + calcLines(d)), 0) + calcLines(data)

                // Set next number of page
                const next = Math.floor(lines / maxLines) >= 1 ? current + 1 : current

                return {
                    ...pages,
                    [next]: [
                        ...(pages[next] || []),
                        data
                    ]
                }
            }, {}))
}

module.exports = { getAddendum }