import { CREDENTIAL_VALUES } from '../constants/credentialsForAuthentication';
import { BOOKING_CREATION_VALUES } from '../constants/valuesForBookingCreation';
import { BOOKING_UPDATE_VALUES } from '../constants/valuesForBookingUpdate';
import type {
	Authentication,
	CreateBookingBody,
	PatchBookingBody,
	UpdateBookingBody,
} from '../interfaces/bookingInterfaces';

export const bodyForAuthentication: Authentication = {
	username: CREDENTIAL_VALUES.username,
	password: CREDENTIAL_VALUES.password,
};

export const bodyForCreatingBooking: CreateBookingBody = {
	firstname: BOOKING_CREATION_VALUES.firstname,
	lastname: BOOKING_CREATION_VALUES.lastname,
	totalprice: BOOKING_CREATION_VALUES.price,
	depositpaid: BOOKING_CREATION_VALUES.depositpaid,
	bookingdates: {
		checkin: BOOKING_CREATION_VALUES.checkinDate,
		checkout: BOOKING_CREATION_VALUES.checkoutDate,
	},
	additionalneeds: BOOKING_CREATION_VALUES.additionalneeds,
};

export const bodyForUpdatingBooking: UpdateBookingBody = {
	firstname: BOOKING_CREATION_VALUES.firstname,
	lastname: BOOKING_CREATION_VALUES.lastname,
	totalprice: BOOKING_UPDATE_VALUES.updatedPrice,
	depositpaid: BOOKING_CREATION_VALUES.depositpaid,
	bookingdates: {
		checkin: BOOKING_UPDATE_VALUES.updatedCheckoutDate,
		checkout: BOOKING_CREATION_VALUES.checkoutDate,
	},
	additionalneeds: BOOKING_CREATION_VALUES.additionalneeds,
};

export const bodyForPatchingBooking: PatchBookingBody = {
	depositpaid: BOOKING_UPDATE_VALUES.updatedDepositState,
	additionalneeds: BOOKING_UPDATE_VALUES.updatedAdditionalNeeds,
};
