export interface Booking {
    bookingId: number,
    horse: Horse
    startTime: Date,
    endTime: Date,
    jumps: boolean,
    sharing: boolean
}

export interface Horse {
    horseId: number,
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