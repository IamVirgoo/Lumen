export interface IUserPatient {
    name : string;
    surname : string;
    patronymic : string;
    phone_number : string;
    authenticate : boolean;
    access_token : string;
    refresh_token : string
}

export interface IUserPatientLoginRequest {
    phone : string;
    password : string
}

export interface IUserPatientRegistrationRequest {
    name : string;
    surname : string;
    patronymic : string;
    phone_number : string;
    password : string
}