import AppHeader from "../../components/admin/header";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { useGetUserQuery } from "../../services/authService";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { doctor_logIn } from "../../store/reducers/UserDoctorSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useGetDoctorAllAppointmentsQuery, useGetDoctorTodayAppointmentsQuery } from "../../services/dataService";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DoctorPanel() {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    let subtitle;

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<number>()
    const [doctorId, setDoctorId] = useState<string>()

    const USER = useAppSelector((state : RootState) => state.userDoctor)

    const GET_USER =
        useGetUserQuery(localStorage.getItem("access_token") as string)
    const GET_TODAY_APPOINTMENTS =
        useGetDoctorTodayAppointmentsQuery(localStorage.getItem("access_token") as string)
    const GET_ALL_APPOINTMENTS =
        useGetDoctorAllAppointmentsQuery(localStorage.getItem("access_token") as string)

    console.log(GET_TODAY_APPOINTMENTS)
    console.log(GET_ALL_APPOINTMENTS)

    useEffect(() => {
        if (GET_USER.isSuccess) {
            dispatch(doctor_logIn({
                name : GET_USER.data.name,
                surname : GET_USER.data.surname,
                patronymic : GET_USER.data.patronymic,
                phone_number : GET_USER.data.phone_number,
                authenticate : true,
                access_token : localStorage.getItem("access_token") as string,
                refresh_token : localStorage.getItem("refresh_token") as string
            }))
            console.log(GET_USER)
        }
    }, [GET_USER])

    const openModal = (record_Id : number, doctor_Id : string) => {
        setDoctorId(doctor_Id)
        setRecordId(record_Id)
        console.log("added", record_Id)
        setModalIsOpen(true)
    }
    const closeModal = () => setModalIsOpen(false)

    return <main className={'app-main'}>
        <AppHeader name={USER.name} surname={USER.surname} patronymic={USER.patronymic}/>
        <div className={'app-main--container'}>
            <div className={'app-main--container--content'}>
                <p className={'app-main--container--content--title'}>Мои записи на сегодня</p>
                { GET_TODAY_APPOINTMENTS.isSuccess
                    ? <>{ GET_TODAY_APPOINTMENTS.data.length == 0
                        ? <p className={'app-main--container--content__warning'}>На сегодня записей нет</p>
                        : <div className={'app-main--container--content--swiper'}>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={4}
                            >
                                { GET_TODAY_APPOINTMENTS.data.map((value : any) =>
                                    <>{value.appointments.map((value : any) =>
                                        <SwiperSlide><RecordCard
                                            type={value.check as boolean}
                                            title={value.info}
                                            data={value.date.substring(0, 10)}
                                            doctor={value.fio.split(" ", 2)[0] + " " + value.fio.split(" ", 2)[1]}
                                            time={value.date.substring(11, 16)}
                                            click={() => openModal(value.id, String(value.doctor_id))}
                                        /></SwiperSlide>
                                    )}</>
                                )}
                            </Swiper>
                        </div>
                    }</>
                    : <>{ GET_TODAY_APPOINTMENTS.isLoading
                        ? <>Загрузка...</>
                        : <>Ошибочка((</>
                    }</>
                }
                <div className={'app-main--container--content__line'}/>
                <p className={'app-main--container--content--title'}>История записей</p>
                { GET_ALL_APPOINTMENTS.isSuccess
                    ? <>{ GET_ALL_APPOINTMENTS.data.length == 0
                        ? <>Записей ещё не было</>
                        : <div className={'app-main--container--content--swiper'}>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={4}
                            >
                                { GET_ALL_APPOINTMENTS.data.map((value : any) =>
                                    <>{value.appointments.map((value : any) =>
                                        <SwiperSlide><RecordCard
                                            type={value.check as boolean}
                                            title={value.info}
                                            data={value.date.substring(0, 10)}
                                            doctor={value.fio.split(" ", 2)[0] + " " + value.fio.split(" ", 2)[1]}
                                            time={value.date.substring(11, 16)}
                                            click={() => openModal(value.id, String(value.doctor_id))}
                                        /></SwiperSlide>
                                    )}</>
                                )}
                            </Swiper>
                        </div>
                    }</>
                    : <>{ GET_ALL_APPOINTMENTS.isLoading
                        ? <>Загрузка...</>
                        : <>Ошибочка((</>
                    }</>
                }
                {/*<Swiper
                    spaceBetween={0}
                    slidesPerView={4}
                >
                    { appointments.isSuccess
                        ? <>{appointments.data.map((value : any) =>
                            <SwiperSlide><RecordCard
                                type={value.check as boolean}
                                title={value.info}
                                data={value.date.substring(0, 10)}
                                doctor={value.fio.split(" ", 2)[0] + " " + value.fio.split(" ", 2)[1]}
                                time={value.date.substring(11, 16)}
                                click={() => openModal(value.id, String(value.doctor_id))}
                            /></SwiperSlide>
                        )}</>
                        : <>{ appointments.isLoading
                            ? <>Загрузка...</>
                            : <>Записей нету</>
                        }</>
                    }
                </Swiper>*/}
            </div>
        </div>
    </main>
}