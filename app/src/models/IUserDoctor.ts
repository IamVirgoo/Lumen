export interface IUserDoctor {

}

interface Appointment {
    id : number,
    date : string
}

interface DayAppointment {
    date: string;
    appointments: Appointment[];
    day_of_the_week: string;
}

export interface IUserDoctorDataRequest {
    id: number;
    fio: string;
    info: string;
    photo: string;
    category: string;
    work_experience: number;
    specialization: string[];
    price: number;
    day_appointments: DayAppointment[];
}

export interface IUserDoctorShortDataRequest {
    id : number,
    fio : string,
    info : string,
    photo : string
}
