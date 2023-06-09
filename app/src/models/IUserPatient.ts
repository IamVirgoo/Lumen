export interface IUserPatient {
    username : string;
    authenticate : boolean;
    access_token : string
}

export interface IUserPatientLoginRequest {
    username : string;
    password : string
}

export interface IUserPatientRegistrationRequest {
    username : string;
    email : string;
    password : string
}