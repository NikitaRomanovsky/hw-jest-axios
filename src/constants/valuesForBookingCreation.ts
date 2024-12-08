import * as random from '../utils/priceAndDateGenerator';

interface BookingCreationValues {
	firstname: string;
	lastname: string;
	price: number;
	depositpaid: boolean;
	checkinDate: Date;
	checkoutDate: Date;
	additionalneeds: string;
}

export const BOOKING_CREATION_VALUES: BookingCreationValues = {
	firstname: 'Nikita',
	lastname: 'R',
	price: random.generatePrice(),
	depositpaid: true,
	checkinDate: random.generateCheckinDate(),
	checkoutDate: random.generateCheckoutDate(),
	additionalneeds: 'Dinner',
};
