import * as random from '../utils/priceAndDateGenerator';

interface BookingUpdateValues {
	updatedPrice: number;
	updatedDepositState: boolean;
	updatedCheckoutDate: Date;
	updatedAdditionalNeeds: string;
}

export const BOOKING_UPDATE_VALUES = {
	updatedPrice: random.generateUpdatedPrice(),
	updatedDepositState: false,
	updatedCheckoutDate: random.generateUpdatedCheckoutDate(),
	updatedAdditionalNeeds: 'Parking',
};
