import * as random from "../utils/priceAndDateGenerator";
const moment = require('moment')

// For creating booking:

export const price: number = random.generatePrice()

export const checkinDate: Date = random.generateCheckinDate()

export const checkoutDate: Date = random.generateCheckoutDate()

// For updating booking with PUT:

export const updatedPrice: number = random.generateUpdatedPrice()

export const updatedCheckoutDate: Date = random.generateUpdatedCheckoutDate()