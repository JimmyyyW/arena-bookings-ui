export interface Customer {
    customerId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumer: string,
    addressOne: string,
    addressTwo: string,
    city: string,
    county: string,
    postCode: string,
    horses: CustomerHorse[]
}

export interface CustomerHorse {
    horseId: number,
    name: string
}

