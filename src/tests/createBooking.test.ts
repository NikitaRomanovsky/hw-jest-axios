import { AxiosError, AxiosResponse } from 'axios';
import { bodyForCreatingBooking } from '../requestBodies/bookingRequestBodies';
import { headerCreateBooking } from '../requestHeaders/bookingHeaders';
import { createBooking } from '../requests/bookingRequests';

describe('Create new booking', () => {
	let response: AxiosResponse;

	beforeAll(async () => {
		response = await createBooking(bodyForCreatingBooking, headerCreateBooking);
		console.log('Create new booking response: ', response.data);
	});

	test('Confirm that status code is 200 and booking is created with expected data', () => {
		expect(response.status).toEqual(200);
		expect(response.data.bookingid).toBeDefined();
		expect(response.data.booking.firstname).toEqual('Nikita');
		expect(response.data.booking.lastname).toEqual('R');
		expect(response.data.booking.additionalneeds).toEqual('Dinner');
	});
});

describe('Create new booking with missing info', () => {
	let errorResponse: AxiosError;

	beforeAll(async () => {
		try {
			const { firstname, ...body } = bodyForCreatingBooking;
			await createBooking(body, headerCreateBooking);
			expect(true).toBe(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorResponse = err;
				console.log(
					'Create new booking without first name response: ',
					errorResponse.response?.data
				);
			}
		}
	});

	test('Confirm that status code is 500 when booking is created without first name', async () => {
		expect(errorResponse.response?.status).toEqual(500);
		expect(errorResponse.response?.statusText).toEqual('Internal Server Error');
	});
});
