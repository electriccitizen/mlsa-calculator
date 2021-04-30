// Don't use a Dinero instance in this project outside of this file.
// You should use helper functions.
const Dinero = require('dinero.js')

// Set locale
Dinero.globalLocale = 'en-US'

// Create Currency Object with Constructor.
function Currency(object) {
    this.amount = object.amount
    this.currency = object.currency
    this.precision = object.precision
}

// Currency instance factory.
const currency = (amount = 0, rest = { currency: 'USD', precision: 2 }) => {
    if (amount instanceof Currency) return amount
    return new Currency(
        Dinero({ amount: parseInt((Number(amount) || 0) * 100), ...rest })
            .toObject()
    )
}

// Helper functions.
// Access
const getAmount = (currency) => {
    return Dinero(currency)
        .getAmount()
}

// Manipulation
const add = (a, b) => {
    return new Currency(
        Dinero(currency(a))
            .add(Dinero(currency(b)))
            .toObject()
    )
}

const subtract = (a, b) => {
    return new Currency(
        Dinero(currency(a))
            .subtract(Dinero(currency(b)))
            .toObject()
    )
}

const multiply = (amount, ...args) => {
    return args.reduce((a, b) => {
        return new Currency(
            Dinero(a)
                .multiply(b)
                .toObject()
        )
    }, currency(amount))
}

const divide = (a, b) => {
    return new Currency(
        Dinero(currency(a))
            .divide(b)
            .toObject()
    )
}

const sum = (array) => {
    return array.reduce((a, b) => {
        return new Currency(Dinero(currency(a))
            .add(Dinero(currency(b)))
            .toObject()
        )
    })
}

const percentage = (a, b) => {
    return new Currency(
        Dinero(currency(a))
            .percentage(b)
            .toObject()
    )
}

// Testing
const lt = (a, b) => {
    return Dinero(currency(a))
        .lessThan(Dinero(currency(b)))
}

const gt = (a, b) => {
    return Dinero(currency(a))
        .greaterThan(Dinero(currency(b)))
}

const isZero = (amount) => {
    return Dinero(currency(amount))
        .isZero()
}

const isPositive = (amount) => {
    return Dinero(currency(amount))
        .isPositive()
}

const isNegative = (amount) => {
    return Dinero(currency(amount))
        .isNegative()
}

const minimum = (...args) => {
    return new Currency(
        Dinero
            .minimum(args.map(amount => Dinero(currency(amount))))
            .toObject()
    )
}

const maximum = (...args) => {
    return new Currency(
        Dinero
            .maximum(args.map(amount => Dinero(currency(amount))))
            .toObject()
    )
}

// Conversion & formatting
const format = (amount, style = 'decimal') => {
    const dinero = Dinero(currency(amount))

    return dinero
        .toUnit()
        .toLocaleString(
            dinero.getLocale(),
            {
                style: style,
                currency: dinero.getCurrency(),
                minimumFractionDigits: 0,
                maximumFractionDigits: dinero.getPrecision()
            }
        )
}

const convertPrecision = (amount, newPrecision) => {
    return new Currency(
        Dinero(currency(amount))
            .convertPrecision(newPrecision)
            .toObject()
    )
}

// Format Dinero objects into a string.
const formatData = (data) => {
    if (!data) return {}
    return Object.entries(data).reduce((results, [key, value]) => {
        return {
            ...results,
            [key]: (Array.isArray(value) ? value : Array(value))
                .map(nested => {
                    return Object.keys(nested).reduce((acc, key) => {
                        return {
                            ...acc,
                            [key]: nested[key] instanceof Currency ?
                                format(nested[key]) :
                                nested[key]
                        }
                    }, {})
                })
        }
    }, {})
}

module.exports = {
    currency,
    format,
    getAmount,
    convertPrecision,
    add,
    subtract,
    multiply,
    divide,
    sum,
    percentage,
    lt,
    gt,
    isZero,
    isPositive,
    isNegative,
    minimum,
    maximum,
    formatData
}