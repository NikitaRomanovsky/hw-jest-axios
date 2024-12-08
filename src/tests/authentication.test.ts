import { AxiosResponse } from 'axios';
import { Authentication } from '../interfaces/bookingInterfaces';
import { bodyForAuthentication } from '../requestBodies/bookingRequestBodies';
import { headerAuth } from '../requestHeaders/bookingHeaders';
import { getAuthToken } from '../requests/bookingRequests';

describe('Authentication using valid credentials', () => {
	let response: AxiosResponse;

	beforeAll(async () => {
		response = await getAuthToken(bodyForAuthentication, headerAuth);
		console.log(
			'Authentication with valid credentials response: ',
			response.data
		);
	});

	test('Confirm that status code is 200 and token is defined', () => {
		expect(response.status).toEqual(200);
		expect(response.data.token).toBeDefined();
	});
});

describe('Authentication using invalid credentials', () => {
	let response: AxiosResponse;

	beforeAll(async () => {
		const body: Authentication = JSON.parse(
			JSON.stringify(bodyForAuthentication)
		);
		body.password = 'invalidPassword';

		response = await getAuthToken(body, headerAuth);

		console.log('Authentication with invalid credentials response: ', response.data);
	});

	test('Confirm that status code is 200 but token was not returned', () => {
		expect(response.status).toEqual(200);
		expect(response.data.token).toBeUndefined();
		expect(response.data.reason).toEqual('Bad credentials');
	});
});
