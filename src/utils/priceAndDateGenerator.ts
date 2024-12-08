const lodash = require('lodash');
const moment = require('moment');

// For creating booking:

const numberOfDays = lodash.random(2, 4);

export function generatePrice(): number {
	return lodash.random(20, 100);
}

export function generateCheckinDate(): Date {
	return moment().format('YYYY-MM-DD');
}

export function generateCheckoutDate(): Date {
	return moment().add(numberOfDays, 'days').format('YYYY-MM-DD');
}

// For updating booking:

const updatedNumberOfDays: number = lodash.random(5, 8);

export function generateUpdatedPrice(): number {
	return lodash.random(100, 500);
}

export function generateUpdatedCheckoutDate(): Date {
	return moment().add(updatedNumberOfDays, 'days').format('YYYY-MM-DD');
}
