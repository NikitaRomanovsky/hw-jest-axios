import { endpoint } from '../utils/globalVariables'

const axios = require('axios').default

export function getAllBookingIds() {
    return axios.get(`${endpoint}/booking`)
}
