import { bookingId, endpoint } from '../utils/globalVariables'

const axios = require('axios').default

export function patchUpdateBooking (body: object, header: object) {
    return axios.patch(`${endpoint}/booking/${bookingId}`, body, header)
}