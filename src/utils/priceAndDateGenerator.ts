const lodash = require('lodash')
const moment = require('moment')
let numberOfDays = lodash.random(2, 4)


// For creating booking:

export function generatePrice (): number {
    return lodash.random(20, 100)
}

export function generateCheckinDate (): Date {
    return moment().format(("YYYY-MM-DD"))
}

export function generateCheckoutDate (): Date {
    return moment().add(numberOfDays, 'days').format(('YYYY-MM-DD'))
}


// For updating booking with PUT:

let updatedNumberOfDays: number = lodash.random(5, 8)

export function generateUpdatedPrice (): number {
    return lodash.random(100, 500)
}

export function generateUpdatedCheckoutDate (): Date {
    return moment().add(updatedNumberOfDays, 'days').format(('YYYY-MM-DD'))
}