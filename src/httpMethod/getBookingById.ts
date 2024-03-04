import { bookingId, endpoint } from '../utils/globalVariables'

const axios = require('axios').default

export function getBookingById (header: object) {
    return axios.get(`${endpoint}/booking/${bookingId}`, header)
}