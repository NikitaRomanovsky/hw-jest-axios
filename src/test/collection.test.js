import { postCredentials } from "../httpMethod/postAuth";
import * as variables from "../utils/globalVariables";
import { credentialsBody } from "../bodyStructure/authBody";
import { getAllBookingIds } from "../httpMethod/getAllBookingIds";
import { postCreateBooking } from "../httpMethod/postCreateBooking";
import { createBodyBooking, updatePatchBodyBooking, updatePutBodyBooking } from "../bodyStructure/bookingBody";
import { getBookingById } from "../httpMethod/getBookingById";
import { putUpdateBooking } from "../httpMethod/putUpdateBooking";
import { patchUpdateBooking } from "../httpMethod/patchUpdateBooking";
import { deleteBooking } from "../httpMethod/delDeleteBooking";
import { getDeletedBooking } from "../httpMethod/getDeletedBooking";


describe('post credentials to receive auth token', () => {
    let response
    beforeAll(async () => {
        response = await postCredentials(credentialsBody, variables.headerAuth);
        console.log('Response is:', response.data);
    })

    afterAll(async () => {
        variables.token = response.data.token
        console.log(variables.token);
    })  

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })
})


describe('Get all booking IDs', () => {
    let response
    beforeAll(async () => {
        response = await getAllBookingIds();
    })

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })
})


describe('Create new booking', () => {
    let response
    beforeAll(async () => {
        response = await postCreateBooking(createBodyBooking, variables.headerBooking)
        console.log('Response is:', response.data);
    })

    afterAll(async () => {
        variables.bookingId = response.data.bookingid
        console.log('ID is:', variables.bookingId);
      })

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })

    test('Confirm that booking is created with expected name only', async () => {
        await expect(response.data.booking.firstname).toEqual('Nikita')
    })
})

describe('Find booking info by its ID', () => {
    let response
    
    beforeAll(async () => {
        response = await getBookingById(variables.headerBookingById)
        console.log('Response is:', response.data);
    })

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })

    test('Confirm that booking is found with expected name only', async () => {
        await expect(response.data.firstname).toEqual('Nikita')
    })
})

describe("Update booking's price and checkout date using PUT method", () => {
    let response

    beforeAll(async () => {
        response = await putUpdateBooking(updatePutBodyBooking, variables.headerForAuthorization)
        console.log('Response is:', response.data);
    })

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })

    test('Confirm that booking is updated above expected price range', async () => {
        await expect(response.data.totalprice).toBeGreaterThan(99)
    })
})

describe("Update booking's deposit state and needs using PATCH method", () => {
    let response

    beforeAll(async () => {
        response = await patchUpdateBooking(updatePatchBodyBooking, variables.headerForAuthorization)
        console.log('Response is:', response.data);
    })

    test('Confirm that status code is 200', async () => {
        await expect(response.status).toEqual(200)
    })

    test('Confirm that booking is updated with expected additional need', async () => {
        await expect(response.data.additionalneeds).toEqual('Parking')
    })

    test('Confirm that booking is updated with expected desposit paid state', async () => {
        await expect(response.data.depositpaids).toBeFalsy()
    })
})


describe('Delete booking', () => {
    let response

    beforeAll(async () => {
        response = await deleteBooking(variables.headerForAuthorization)
    })

    test('Confirm that status code is 201', async () => {
        await expect(response.status).toEqual(201)
    })
})


describe('Should not find deleted booking by ID', () => {
    let response
    
    beforeAll(async () => {
        response = await getDeletedBooking(variables.headerBookingById).catch(error => error)
    })

    test('Confirm that status code is 404', async () => {
        await expect(response.message).toEqual('Request failed with status code 404')
    })
})
