import { AxiosError, AxiosResponse } from 'axios';
import {
	bodyForAuthentication,
	bodyForCreatingBooking,
} from '../requestBodies/bookingRequestBodies';
import {
	headerAuth,
	headerBookingById,
	headerCreateBooking,
	populateHeaderWithAuthorizationToken,
} from '../requestHeaders/bookingHeaders';
import {
	createBooking,
	deleteBooking,
	getAuthToken,
	getBookingById,
} from '../requests/bookingRequests';

describe('Delete booking', () => {
	let deleteResponse: AxiosResponse;
	let bookingId: string;

	beforeAll(async () => {
		const {
			data: { token },
		} = await getAuthToken(bodyForAuthentication, headerAuth);

		const {
			data: { bookingid },
		} = await createBooking(bodyForCreatingBooking, headerCreateBooking);
		bookingId = bookingid;

		deleteResponse = await deleteBooking(
			bookingid,
			populateHeaderWithAuthorizationToken(token)
		);

		console.log('Delete booking response: ', deleteResponse.data);
	});

	test('Confirm that status code is 201 and booking is deleted', async () => {
		let getResponse: AxiosError;

		expect(deleteResponse.status).toEqual(201);

		try {
			await getBookingById(bookingId, headerBookingById);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				getResponse = err;
				console.log(
					'Get deleted booking response: ',
					getResponse.response?.data
				);
				expect(getResponse.response?.status).toEqual(404);
				expect(getResponse.response?.statusText).toEqual('Not Found');
			}
		}
	});
});

describe('Delete booking with errors', () => {
	let errorResponse: AxiosError;

	test('Delete booking with non-existing ID', async () => {
		const {
			data: { token },
		} = await getAuthToken(bodyForAuthentication, headerAuth);

		try {
			await deleteBooking(
				'non-existing',
				populateHeaderWithAuthorizationToken(token)
			);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					'Delete booking with non-existing ID response: ',
					errorResponse.response?.data
				);
			}
		}
		// "Restful Booker" API deviates from expected RESTful conventions
		expect(errorResponse.response?.status).toEqual(405);
		expect(errorResponse.response?.statusText).toEqual('Method Not Allowed');
	});

	test('Delete booking without Authorization', async () => {
		const {
			data: { bookingid },
		} = await createBooking(bodyForCreatingBooking, headerCreateBooking);

		try {
			await deleteBooking(bookingid, headerAuth);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					`Delete booking without Authorization response: `,
					errorResponse.response?.data
				);
			}
		}
		expect(errorResponse.response?.status).toEqual(403);
		expect(errorResponse.response?.statusText).toEqual('Forbidden');
	});
});
