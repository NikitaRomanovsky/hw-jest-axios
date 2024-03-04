const axios = require('axios').default
import * as variables from '../utils/globalVariables'

export function postCredentials(body: object, headers: object) {
    return axios.post(`${variables.endpoint}/auth`, body, headers)
}


