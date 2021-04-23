const getAddendum = (initiate, addendum) => {
    return mapToPages(addendum).map((page, index) => {
        let data = {}
        data["addendum.csed"] = initiate["initiate.csed"]
        data["addendum.mother"] = initiate["initiate.mother.name"]
        data["addendum.father"] = initiate["initiate.father.name"]
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
const mapToPages = addendum => {
    const MAX_LINES = 62

    // Sum data length and new line
    const calcLines = (data) => {
        return data ? data.length + 1 : 0
    }

    return Object.values(addendum.reduce((pages, data) => {
        // Get current number of page
        const length = Object.keys(pages).length
        const current = length - 1 < 0 ? 0 : length - 1

        // Calculate number of lines
        const lines = (pages[current] || []).reduce((sum, d) => (sum + calcLines(d)), 0) + calcLines(data)

        // Set next number of page
        const next = Math.floor(lines / MAX_LINES) >= 1 ? current + 1 : current

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