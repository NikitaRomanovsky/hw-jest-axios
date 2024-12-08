export interface Authentication {
	username: string;
	password: string;
}

export interface CreateBookingBody {
	firstname: string;
	lastname: string;
	totalprice: number;
	depositpaid: boolean;
	bookingdates: { checkin: Date; checkout: Date };
	additionalneeds: string;
}

export interface UpdateBookingBody {
	firstname: string;
	lastname: string;
	totalprice: number;
	depositpaid: boolean;
	bookingdates: { checkin: Date; checkout: Date };
	additionalneeds: string;
}

export interface PatchBookingBody {
	depositpaid: boolean;
	additionalneeds: string;
}
