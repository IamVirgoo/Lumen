import Modal from "react-modal";
import AppHeader from "../../components/admin/header";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { useGetUserQuery } from "../../services/authService";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { doctor_logIn } from "../../store/reducers/UserDoctorSlice";
import { RootState } from "../../store/store";
import {metricValidation, parameterValidation, submissionHandler} from "../../devtools/validationHandlers";
import { Notifications } from "react-push-notification";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetDoctorAllAppointmentsQuery,
    useGetDoctorAppointmentQuery,
    useGetDoctorTodayAppointmentsQuery, useGetHealthQuery,
    useSetDoctorAnamnesisMutation
} from "../../services/dataService";
import HealthCard from "../../components/admin/user-patient/healthCard";
import {updateHealth} from "../../store/reducers/UserHealthSlice";

export default function DoctorPanel() {
    const dispatch = useAppDispatch()

    let subtitle;
    let currentData = new Date().toISOString().substring(0, 10)

    const HEALTH = useAppSelector((state) => state.userHealth)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<number>()
    const [anamnesisText, setAnamnesisText] = useState<string>('')
    const [userId, setUserId] = useState<number>()

    const USER = useAppSelector((state : RootState) => state.userDoctor)

    const [setAnamnesis,
        { isLoading, isError, isSuccess}] = useSetDoctorAnamnesisMutation()

    const GET_USER =
        useGetUserQuery(localStorage.getItem("access_token") as string)
    const GET_TODAY_APPOINTMENTS =
        useGetDoctorTodayAppointmentsQuery(localStorage.getItem("access_token") as string)
    const GET_ALL_APPOINTMENTS =
        useGetDoctorAllAppointmentsQuery(localStorage.getItem("access_token") as string)
    const GET_APPOINTMENT =
        useGetDoctorAppointmentQuery({
            token : localStorage.getItem("access_token") as string,
            id : Number(recordId)
        })

    const GET_HEALTH = useGetHealthQuery({
        user_id : Number(userId),
        date : currentData
    })

    useEffect(() => {
        if (GET_APPOINTMENT.isSuccess) {
            setUserId(GET_APPOINTMENT.data.user_id)
        }
        if (GET_APPOINTMENT.isLoading) {
            console.log("Загрузка")
        }
    }, [GET_APPOINTMENT])

    useEffect(() => {
        if (GET_HEALTH.isSuccess) {
            if (GET_HEALTH.data.length != 0) {
                dispatch(updateHealth({
                    pressure : GET_HEALTH.data[GET_HEALTH.data.length - 1].pressure,
                    temperature : GET_HEALTH.data[GET_HEALTH.data.length - 1].temperature,
                    pulse : GET_HEALTH.data[GET_HEALTH.data.length - 1].pulse,
                    saturation : GET_HEALTH.data[GET_HEALTH.data.length - 1].saturation,
                    sugar : GET_HEALTH.data[GET_HEALTH.data.length - 1].sugar,
                    state : GET_HEALTH.data[GET_HEALTH.data.length - 1].state
                }))
            }
        }
        if (GET_HEALTH.isLoading) {
            console.log("загрузка")
        }
        if (GET_HEALTH.isError) {
            console.log(GET_HEALTH.error)
        }
    }, [GET_HEALTH])

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

    const handleSubmit = async () => {
        try {
            await setAnamnesis({
                token : localStorage.getItem("access_token") as string,
                id : Number(recordId),
                text : {
                    anamnesis : anamnesisText
                }
            }).then((result : any) => {
                console.log(result)
                submissionHandler("Отчёт успешно добавлен")
                setTimeout(function() {
                    window.location.reload()
                }, 1500)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const openModal = (record_Id : number) => {
        setRecordId(record_Id)
        setModalIsOpen(true)
    }
    const closeModal = () => setModalIsOpen(false)

    return <main className={'app-main'}>
        <Notifications position={'top-right'}/>
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
                                    <SwiperSlide><RecordCard
                                        type={value.check as boolean}
                                        title={""}
                                        data={value.date.substring(0, 10)}
                                        doctor={value.fio}
                                        time={value.date.substring(11, 16)}
                                        click={() => openModal(value.id)}
                                        profile={'doctor'}
                                    /></SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    }</>
                    : <>{ GET_TODAY_APPOINTMENTS.isLoading
                        ? <>Загрузка...</>
                        : <>Ошибочка</>
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
                                            title={""}
                                            data={value.date.substring(0, 10)}
                                            doctor={value.fio}
                                            time={value.date.substring(11, 16)}
                                            click={() => openModal(value.id)}
                                            profile={'doctor'}
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
                { GET_APPOINTMENT.isSuccess
                    ? <div className={'modal--container'}>
                        <h1 className={'modal--container--title-wrapper__text'}
                            ref={(_subtitle) => (subtitle = _subtitle)}
                        >Подробности о записи</h1>
                        <div className={'modal--container--title-wrapper__line'}/>
                        <div className={'modal--container--content'}>
                            <p className={'modal--container--content--card-text'}>Больной: <span>{GET_APPOINTMENT.data.fio}</span></p>
                            <div className={'modal--container--content__line'}/>
                            <p className={'modal--container--content--card-text'}>Дата и время приёма: <span>{GET_APPOINTMENT.data.date.substring(0, 10)} - {GET_APPOINTMENT.data.date.substring(11, 16)}</span></p>
                            <div className={'modal--container--content__line'}/>
                            { GET_APPOINTMENT.data.anamnesis == null
                                ? <div className={'modal--container--content--anamnesis'}>
                                    <p className={'modal--container--content--anamnesis--title'}>Добавьте итоговый отчёт</p>
                                    <div className={'modal--container--content--anamnesis__line'}/>
                                    <form className={'modal--container--content--anamnesis--input-wrapper'}>
                                        <input className={'modal--container--content--anamnesis--input-wrapper--input'}
                                               type={"text"}
                                               placeholder={"Введите текст"}
                                               onChange={(e) => setAnamnesisText(e.target.value)}
                                        />
                                        <input className={'modal--container--content--anamnesis--input-wrapper--submit'}
                                               type={"button"}
                                               value={"Сохранить"}
                                               onClick={handleSubmit}
                                        />
                                    </form>
                                </div>
                                : <p className={'modal--container--content--card-text'}>Итоговый отчёт врача: <span>{GET_APPOINTMENT.data.anamnesis as string}</span></p>
                            }
                            <div className={'modal--container--content__line'}/>
                            <div className={'modal--container--content--patient-health'}>
                                <p className={'modal--container--content--patient-health--title'}>Актуальные показатели больного</p>
                                <div className={'app-main--container--content--health'}>
                                    { GET_HEALTH.isSuccess
                                        ? <>{ GET_HEALTH.data.length == 0
                                            ? <p className={'app-main--container--content--health__warning'}>Данных нет</p>
                                            : <>
                                                <HealthCard
                                                    type={"Пульс в покое"}
                                                    value={String(HEALTH.pulse)}
                                                    state={parameterValidation("Пульс", HEALTH.pulse) as string}
                                                    metric={metricValidation("Пульс")}
                                                />
                                                <HealthCard
                                                    type={"Давление"}
                                                    value={HEALTH.pressure}
                                                    state={parameterValidation("Давление",
                                                        Number(HEALTH.pressure.substring(0, 3))) as string}
                                                    metric={metricValidation("Давление")}
                                                />
                                                <HealthCard
                                                    type={"Температура"}
                                                    value={String(HEALTH.temperature)}
                                                    state={parameterValidation("Температура",
                                                        HEALTH.temperature) as string}
                                                    metric={metricValidation("Температура")}
                                                />
                                                <HealthCard
                                                    type={"Сатурация"}
                                                    value={String(HEALTH.saturation)}
                                                    state={parameterValidation("Сатурация",
                                                        HEALTH.saturation) as string}
                                                    metric={metricValidation("Сатурация")}
                                                />
                                                <HealthCard
                                                    type={"Сахар"}
                                                    value={String(HEALTH.sugar)}
                                                    state={parameterValidation("Сахар", HEALTH.sugar) as string}
                                                    metric={metricValidation("Сахар")}
                                                />
                                            </>
                                        }</>
                                        : <>{ GET_HEALTH.isLoading
                                            ? <>Загрузка</>
                                            : <>Ошибочка</>
                                        }</>
                                    }
                                </div>
                            </div>
                            { GET_HEALTH.isSuccess
                                ? <>
                                    <div className={'modal--container--content__line'}/>
                                    <p className={'modal--container--content--card-text'}>Комментарий больного о самочувствии: <span>{HEALTH.state}</span></p>
                                </>
                                : <>{ GET_HEALTH.isLoading
                                    ? <></>
                                    : <></>
                                }</>
                            }
                        </div>
                    </div>
                    : <>{ GET_APPOINTMENT.isLoading
                        ? <>Загрузка...</>
                        : <>Ошибошка((</>
                    }</>
                }
            </div>
        </Modal>
    </main>
}