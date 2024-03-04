import * as variables from '../utils/globalVariables'

interface Credentials {
    username: string,
    password: string
}

export const credentialsBody: Credentials = {
    username : variables.username,
    password : variables.password
}