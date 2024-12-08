import { CommonHeader } from '../interfaces/headersInterfaces';

export const headerAuth: CommonHeader = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export const headerCreateBooking: CommonHeader = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

export const headerBookingById: CommonHeader = {
	headers: {
		Accept: 'application/json',
	},
};

export const populateHeaderWithAuthorizationToken = (
	authToken: string
): CommonHeader => ({
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Cookie: `token=${authToken}`,
		Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
	},
});
