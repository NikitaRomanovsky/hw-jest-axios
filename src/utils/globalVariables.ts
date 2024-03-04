export const endpoint: string = 'https://restful-booker.herokuapp.com';

export const username: string = 'admin';
export const password: string = 'password123';

export let token!: string;
export let bookingId: string;

export const firstname: string = 'Nikita';
export const lastname: string = 'R';
export const additionalneeds: string = 'Dinner';

interface Header {
  headers: {
    'Content-Type'?: string;
    Accept?: string;
    Cookie?: string;
    Authorization?: string;
  };
}

export const headerAuth: Header = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const headerBooking: Header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const headerBookingById: Header = {
  headers: {
    Accept: 'application/json',
  },
};

export const headerForAuthorization: Header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Cookie: `token=${token}`,
    Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
  },
};
