export interface Booking {
    bookingId: number,
    horse: Horse
    startTime: Date,
    endTime: Date,
    jumps: boolean,
    sharing: boolean
}

export interface BookingLp {
    bookingLpId: number,
    horse: Horse,
    startTime: Date,
    endTime: Date,
}

export interface BookingCustomer {
    booking: Booking,
    customerId: number
}

export interface BookingCustomerLp {
    bookingLp: BookingLp,
    customerId: number
}

export interface Horse {
    horseId: number | undefined,
    customer: Customer,
    name: string
}

export interface Customer {
    customerId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    horses: Horse[]
}