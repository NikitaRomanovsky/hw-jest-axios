import { AxiosError, AxiosResponse } from 'axios';
import { bodyForCreatingBooking } from '../requestBodies/bookingRequestBodies';
import {
	headerBookingById,
	headerCreateBooking,
} from '../requestHeaders/bookingHeaders';
import {
	createBooking,
	getAllBookingIds,
	getBookingById,
} from '../requests/bookingRequests';

describe('Get all booking IDs', () => {
	let response: AxiosResponse;

	beforeAll(async () => {
		response = await getAllBookingIds();
		console.log('Get all booking IDs list reponse: ', response.data);
	});

	test('Confirm that status code is 200 and list is not empty', () => {
		expect(response.status).toEqual(200);
		expect(response.data.length).toBeGreaterThan(0);
	});
});

describe('Get booking by ID', () => {
	let response: AxiosResponse;

	beforeAll(async () => {
		const {
			data: { bookingid },
		} = await createBooking(bodyForCreatingBooking, headerCreateBooking);
		response = await getBookingById(bookingid, headerBookingById);
		console.log('Get booking by ID response: ', response.data);
	});

	test('Confirm that status code is 200 and all fields are defined', () => {
		expect(response.status).toEqual(200);
		expect(response.data.firstname).toBeDefined();
		expect(response.data.lastname).toBeDefined();
		expect(response.data.totalprice).toBeDefined();
		expect(response.data.depositpaid).toBeDefined();
		expect(response.data.bookingdates.checkin).toBeDefined();
		expect(response.data.bookingdates.checkout).toBeDefined();
		expect(response.data.additionalneeds).toBeDefined();
	});
});

describe('Get booking by non-existing ID', () => {
	let errorResponse: AxiosError;

	beforeAll(async () => {
		try {
			await getBookingById('non-existing', headerBookingById);
      expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					'Get booking by non-existing ID response: ',
					errorResponse.response?.data
				);
			}
		}
	});

	test('Confirm that reponse is 404 - Not Found', () => {
		expect(errorResponse.response?.status).toEqual(404);
		expect(errorResponse.response?.statusText).toEqual('Not Found');
	});
});
