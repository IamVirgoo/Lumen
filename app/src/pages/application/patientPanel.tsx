import Modal from "react-modal";
import AppHeader from "../../components/admin/header";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetUserQuery } from "../../services/authService";
import { useEffect, useState } from "react";
import { logIn } from "../../store/reducers/UserPatientSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate} from "react-router-dom";
import { RootState } from "../../store/store";
import { useGetAppointmentQuery, useGetAppointmentsQuery, useGetDoctorQuery } from "../../services/dataService";

export default function PatientPanel() {
    const dispatch = useAppDispatch()

    let subtitle;

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<number>()
    const [doctorId, setDoctorId] = useState<string>()

    const USER = useAppSelector((state : RootState) => state.userPatient)

    const GET_USER =
        useGetUserQuery(localStorage.getItem("access_token") as string)
    const appointments =
        useGetAppointmentsQuery(localStorage.getItem("access_token") as string)
    const doctor =
        useGetDoctorQuery(doctorId as string)
    const appointment =
        useGetAppointmentQuery({
            token : localStorage.getItem("access_token") as string,
            id : Number(recordId)
        })

    useEffect(() => {
        if (GET_USER.isSuccess) {
            dispatch(logIn({
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
        console.log(doctor)
        console.log(appointment)
        setModalIsOpen(true)
    }
    const closeModal = () => setModalIsOpen(false)

    return <>
        { localStorage.getItem("authenticate") == "true"
            ?  <main className={'app-main'}>
                <AppHeader name={USER.name} surname={USER.surname} patronymic={USER.patronymic}/>
                <div className={'app-main--container'}>
                    <div className={'app-main--container--content'}>
                        <p className={'app-main--container--content--title'}>Мои записи</p>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={4}
                        >
                            { appointments.isSuccess
                                ? <>{appointments.data.map((value : any) =>
                                    <SwiperSlide><RecordCard
                                        type={value.check as boolean}
                                        title={value.info}
                                        data={value.date.substring(0, 10)}
                                        doctor={value.fio}
                                        time={value.date.substring(11, 16)}
                                        click={() => openModal(value.id, String(value.doctor_id))}
                                        profile={'user'}
                                    /></SwiperSlide>
                                )}</>
                                : <>{ appointments.isLoading
                                    ? <>Загрузка...</>
                                    : <>Записей нету</>
                                }</>
                            }
                        </Swiper>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '5px',
                            backgroundColor: '#407468',
                            border: '1px solid #FFFF',
                            zIndex: 9999
                        }
                    }}
                    contentLabel="Example Modal"
                    overlayClassName='modal--overlay'
                >
                    <div className={'modal'}>
                        { doctor.isSuccess
                            ? <div className={'modal--container'}>
                                <div className={'modal--container--title-wrapper'}>
                                    <h1 className={'modal--container--title-wrapper__text'}
                                        ref={(_subtitle) => (subtitle = _subtitle)}
                                    >Подробности о записи</h1>
                                    <div className={'modal--container--title-wrapper__line'}></div>
                                    <div className={'modal--container--content'}>
                                        <p className={'modal--container--content--card-text'}>Врач-специалист: <Link className={'modal--container--content--card-text__link'} to={`/doctor/${doctor.data.id}`}>{doctor.data.fio}</Link></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Короткая информация о враче: <span>{appointment.data.info}</span></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Дата и время приёма: <span>{appointment.data.date.substring(0, 10)} - {appointment.data.date.substring(11, 16)}</span></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Итоговый отчёт врача: <span>{appointment.data.anamnesis as string}</span></p>
                                    </div>
                                </div>
                            </div>
                            : <>{ doctor.isLoading
                                ? <>Загрузка...</>
                                : <>Ошибочка(((</>
                            }</>
                        }

                    </div>
                </Modal>
            </main>
            : <main className={'app-main'}>
                <p>Not authenticated</p>
            </main>
        }
    </>
}