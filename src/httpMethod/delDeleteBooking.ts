import { bookingId, endpoint } from '../utils/globalVariables'

const axios = require('axios').default

export function deleteBooking (header: object) {
    return axios.delete(`${endpoint}/booking/${bookingId}`, header)
}