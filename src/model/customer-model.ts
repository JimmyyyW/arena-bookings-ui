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
    horses: CustomerHorse[],
    users: CustomerUser[]
}

export interface CustomerHorse {
    horseId: number,
    name: string
}

export interface CustomerUser {
    id: number,
    username: string,
    enabled: true,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    roles: Role[]
}

export interface Role {
    id: number,
    roleName: string
}

