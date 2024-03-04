import * as variables from '../utils/globalVariables'
import * as generated from './preRequest';

interface BookingBody {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid: boolean;
  bookingdates?: { checkin: Date; checkout: Date };
  additionalneeds: string;
}


export const createBodyBooking: BookingBody = {
    firstname: variables.firstname,
    lastname: variables.lastname,
    totalprice: generated.price,
    depositpaid: true,
    bookingdates: {
      checkin: generated.checkinDate,
      checkout: generated.checkoutDate,
    },
    additionalneeds: variables.additionalneeds,
  };

  export const updatePutBodyBooking: BookingBody = {
    firstname: variables.firstname,
    lastname: variables.lastname,
    totalprice: generated.updatedPrice,
    depositpaid: true,
    bookingdates: {
      checkin: generated.checkinDate,
      checkout: generated.updatedCheckoutDate,
    },
    additionalneeds: variables.additionalneeds,
  };

  export const updatePatchBodyBooking: BookingBody = {
    depositpaid: false,
    additionalneeds: 'Parking',
  }