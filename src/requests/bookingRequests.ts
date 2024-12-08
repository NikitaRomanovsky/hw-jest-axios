import axios from 'axios';

const endpoint: string = 'https://restful-booker.herokuapp.com';

export function getAuthToken(body: object, headers: object) {
	return axios.post(`${endpoint}/auth`, body, headers);
}

export function createBooking(body: object, header: object) {
	return axios.post(`${endpoint}/booking`, body, header);
}

export function updateBooking(bookingId: string, body: object, header: object) {
	return axios.put(`${endpoint}/booking/${bookingId}`, body, header);
}

export function patchBooking(bookingId: string, body: object, header: object) {
	return axios.patch(`${endpoint}/booking/${bookingId}`, body, header);
}

export function getAllBookingIds() {
	return axios.get(`${endpoint}/booking`);
}

export function getBookingById(bookingId: string, header: object) {
	return axios.get(`${endpoint}/booking/${bookingId}`, header);
}

export function deleteBooking(bookingId: string, header: object) {
	return axios.delete(`${endpoint}/booking/${bookingId}`, header);
}
