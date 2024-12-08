import { AxiosError, AxiosResponse } from 'axios';
import { BOOKING_UPDATE_VALUES } from '../constants/valuesForBookingUpdate';
import {
	bodyForAuthentication,
	bodyForCreatingBooking,
	bodyForPatchingBooking,
	bodyForUpdatingBooking,
} from '../requestBodies/bookingRequestBodies';
import {
	headerAuth,
	headerCreateBooking,
	populateHeaderWithAuthorizationToken,
} from '../requestHeaders/bookingHeaders';
import {
	createBooking,
	getAuthToken,
	patchBooking,
	updateBooking,
} from '../requests/bookingRequests';

describe("Update booking's price and checkout date with PUT", () => {
	let createBookingResponse: AxiosResponse;
	let updateBookingresponse: AxiosResponse;

	beforeAll(async () => {
		const {
			data: { token },
		} = await getAuthToken(bodyForAuthentication, headerAuth);

		createBookingResponse = await createBooking(
			bodyForCreatingBooking,
			headerCreateBooking
		);

		updateBookingresponse = await updateBooking(
			createBookingResponse.data.bookingid,
			bodyForUpdatingBooking,
			populateHeaderWithAuthorizationToken(token)
		);

		console.log(
			'Update price and checkout date response: ',
			updateBookingresponse.data
		);
	});

	test('Confirm that status code is 200 and returned data is updated', () => {
		expect(updateBookingresponse.status).toEqual(200);
		expect(updateBookingresponse.data.totalprice).toBeGreaterThan(
			createBookingResponse.data.booking.totalprice
		);
	});
});

describe("Update booking's deposit state and additional needs with PATCH", () => {
	let createBookingResponse: AxiosResponse;
	let updateBookingresponse: AxiosResponse;

	beforeAll(async () => {
		const {
			data: { token },
		} = await getAuthToken(bodyForAuthentication, headerAuth);

		createBookingResponse = await createBooking(
			bodyForCreatingBooking,
			headerCreateBooking
		);

		updateBookingresponse = await patchBooking(
			createBookingResponse.data.bookingid,
			bodyForPatchingBooking,
			populateHeaderWithAuthorizationToken(token)
		);

		console.log(
			'Update desposit state and additional needs response: ',
			updateBookingresponse.data
		);
	});

	test('Confirm that status code is 200 and returned data is updated', async () => {
		expect(updateBookingresponse.status).toEqual(200);
		expect(updateBookingresponse.data.additionalneeds).toEqual(
			BOOKING_UPDATE_VALUES.updatedAdditionalNeeds
		);
		expect(updateBookingresponse.data.depositpaid).toEqual(
			BOOKING_UPDATE_VALUES.updatedDepositState
		);
	});
});

describe("Update booking's data with errors", () => {
	let errorResponse: AxiosError;
	let authToken: string;
	let bookingId: string;

	beforeEach(async () => {
		const {
			data: { token },
		} = await getAuthToken(bodyForAuthentication, headerAuth);
		authToken = token;

		const {
			data: { bookingid },
		} = await createBooking(bodyForCreatingBooking, headerCreateBooking);
		bookingId = bookingid;
	});

	test.each([
		{
			updateRequest: updateBooking,
			description: 'Update booking with non-existing ID with PUT',
		},
		{
			updateRequest: patchBooking,
			description: 'Update booking with non-existing ID with PATCH',
		},
	])('$description', async ({ updateRequest }): Promise<void> => {
		try {
			await updateRequest(
				'non-existing',
				bodyForUpdatingBooking,
				populateHeaderWithAuthorizationToken(authToken)
			);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					`Update booking with non-existing ID response with ${
						updateRequest === updateBooking ? 'PUT' : 'PATCH'
					} reponse: `,
					errorResponse.response?.data
				);
			}
		}

		// "Restful Booker" API deviates from expected RESTful conventions
		expect(errorResponse.response?.status).toEqual(405);
		expect(errorResponse.response?.statusText).toEqual('Method Not Allowed');
	});

	test('Update booking witout required field with PUT', async () => {
		try {
			const { firstname, ...body } = bodyForUpdatingBooking;
			await updateBooking(
				bookingId,
				body,
				populateHeaderWithAuthorizationToken(authToken)
			);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					'Update booking without first name response: ',
					errorResponse.response?.data
				);
			}
		}
		expect(errorResponse.response?.status).toEqual(400);
		expect(errorResponse.response?.statusText).toEqual('Bad Request');
	});

	test.each([
		{
			updateRequest: updateBooking,
			description: 'Update booking without Authorization with PUT',
		},
		{
			updateRequest: patchBooking,
			description: 'Update booking without Authorization with PATCH',
		},
	])('$description', async ({ updateRequest }): Promise<void> => {
		try {
			await updateRequest(bookingId, bodyForUpdatingBooking, headerAuth);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					`Update booking without Authorization with ${
						updateRequest === updateBooking ? 'PUT' : 'PATCH'
					} reponse: `,
					errorResponse.response?.data
				);
			}
		}
		expect(errorResponse.response?.status).toEqual(403);
		expect(errorResponse.response?.statusText).toEqual('Forbidden');
	});
});
