export interface IUserPatient {
    name : string;
    surname : string;
    patronymic : string;
    authenticate : boolean;
    access_token : string
}

export interface IUserPatientLoginRequest {
    telephoneNumber : string;
    password : string
}

export interface IUserPatientRegistrationRequest {
    name : string;
    surname : string;
    patronymic : string;
    telephoneNumber : string;
    password : string
}