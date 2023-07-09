import Modal from "react-modal";
import AppHeader from "../../components/admin/header";
import HealthCard from "../../components/admin/user-patient/healthCard";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetUserQuery } from "../../services/authService";
import { useEffect, useState } from "react";
import { logIn } from "../../store/reducers/UserPatientSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { updateHealth } from "../../store/reducers/UserHealthSlice";
import { Notifications } from "react-push-notification";
import {
    useGetAppointmentQuery,
    useGetAppointmentsQuery,
    useGetDoctorQuery,
    useGetHealthQuery, useSetHealthMutation
} from "../../services/dataService";
import {
    errorHandler,
    metricValidation,
    parameterValidation,
    submissionHandler
} from "../../devtools/validationHandlers";

export default function PatientPanel() {
    const dispatch = useAppDispatch()

    const HEALTH = useAppSelector((state) => state.userHealth)

    let subtitle;
    let currentData = new Date().toISOString().substring(0, 10)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalFormIsOpen, setModalFormIsOpen] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<number>()
    const [doctorId, setDoctorId] = useState<string>()
    const [selectedItem, setSelectedItem] = useState<string>()

    const [pressure, setPressure] = useState<string | null>(null)
    const [temperature, setTemperature] = useState<number | null>(null)
    const [pulse, setPulse] = useState<number | null>(null)
    const [saturation, setSaturation] = useState<number | null>(null)
    const [sugar, setSugar] = useState<number | null>(null)
    const [patientState, setPatientState] = useState<string | null>('Плохое')

    const [selectedDate, setSelectedDate] = useState<string>(currentData);

    const USER = useAppSelector((state : RootState) => state.userPatient)

    const GET_USER =
        useGetUserQuery(localStorage.getItem("access_token") as string)
    const GET_APPOINTMENTS =
        useGetAppointmentsQuery(localStorage.getItem("access_token") as string)
    const GET_DOCTOR =
        useGetDoctorQuery(doctorId as string)
    const GET_APPOINTMENT =
        useGetAppointmentQuery({
            token : localStorage.getItem("access_token") as string,
            id : Number(recordId)
        })
    const GET_HEALTH = useGetHealthQuery({
        user_id : GET_USER.data.id,
        date : selectedDate
    })

    const [setHealth,
        { isLoading, isError, isSuccess}] = useSetHealthMutation()

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

    const openModal = (record_Id : number, doctor_Id : string) => {
        setDoctorId(doctor_Id)
        setRecordId(record_Id)
        setModalIsOpen(true)
    }
    const closeModal = () => setModalIsOpen(false)

    const openModalForm = () => {
        setModalFormIsOpen(true)
    }
    const closeModalForm = () => {
        setModalFormIsOpen(false)
    }

    const handleSave = async () => {
        if (!pressure || !temperature || !pulse || !saturation || !sugar || !patientState) {
            errorHandler("Пожалуйста заполните все поля"); return
        }
        try {
            await setHealth({
                token : localStorage.getItem("access_token") as string,
                obj : {
                    pressure : pressure,
                    temperature : temperature,
                    pulse : pulse,
                    saturation : saturation,
                    sugar : sugar,
                    state : patientState
                }
            }).then((result : any) => {
                console.log(result)
                submissionHandler("Показания успешно обновлены")
                setTimeout(function() {
                    window.location.reload()
                }, 1500)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        { localStorage.getItem("authenticate") == "true"
            ?  <main className={'app-main'}>
                <Notifications position={'top-right'}/>
                <AppHeader name={USER.name} surname={USER.surname} patronymic={USER.patronymic}/>
                <div className={'app-main--container'}>
                    <div className={'app-main--container--content'}>
                        <p className={'app-main--container--content--title'}>Мои записи</p>
                        { GET_APPOINTMENTS.isSuccess
                            ? <>{ GET_APPOINTMENTS.data.length == 0
                                ? <p className={'app-main--container--content__warning'}>Записей нет</p>
                                : <div className={'app-main--container--content--swiper'}>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={4}
                                    >
                                        { GET_APPOINTMENTS.data.map((value : any) =>
                                            <SwiperSlide><RecordCard
                                                type={value.check as boolean}
                                                title={value.info}
                                                data={value.date.substring(0, 10)}
                                                doctor={value.fio}
                                                time={value.date.substring(11, 16)}
                                                click={() => openModal(value.id, String(value.doctor_id))}
                                                profile={'user'}
                                            /></SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                            }</>
                            : <>{ GET_APPOINTMENTS.isLoading
                                ? <>Загрузка...</>
                                : <>Ошибочка</>
                            }</>
                        }
                        <div className={'app-main--container--content__line'}/>
                        <div className={'app-main--container--content--title-wrapper'}>
                            <div className={'app-main--container--content--title-wrapper--title'}>
                                <p className={'app-main--container--content--title-wrapper--title__text'}>Моё здоровье</p>
                                <input className={'app-main--container--content--title-wrapper--title__act'}
                                       type={'date'}
                                       value={selectedDate}
                                       onChange={(event) => setSelectedDate(event.target.value)}
                                />
                            </div>
                            <input className={'app-main--container--content--title-wrapper__button'}
                                   type="button"
                                   value={'Записать показания'}
                                   onClick={openModalForm}
                            />
                        </div>
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
                        { GET_DOCTOR.isSuccess && GET_APPOINTMENT.isSuccess
                            ? <div className={'modal--container'}>
                                <div className={'modal--container--title-wrapper'}>
                                    <h1 className={'modal--container--title-wrapper__text'}
                                        ref={(_subtitle) => (subtitle = _subtitle)}
                                    >Подробности о записи</h1>
                                    <div className={'modal--container--title-wrapper__line'}></div>
                                    <div className={'modal--container--content'}>
                                        <p className={'modal--container--content--card-text'}>Врач-специалист: <Link className={'modal--container--content--card-text__link'} to={`/doctor/${GET_DOCTOR.data.id}`}>{GET_DOCTOR.data.fio}</Link></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Короткая информация о враче: <span>{GET_APPOINTMENT.data.info}</span></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Дата и время приёма: <span>{GET_APPOINTMENT.data.date.substring(0, 10)} - {GET_APPOINTMENT.data.date.substring(11, 16)}</span></p>
                                        <div className={'modal--container--content__line'}/>
                                        <p className={'modal--container--content--card-text'}>Итоговый отчёт врача: <span>{GET_APPOINTMENT.data.anamnesis as string}</span></p>
                                    </div>
                                </div>
                            </div>
                            : <>{ GET_DOCTOR.isLoading && GET_APPOINTMENT.isLoading
                                ? <>Загрузка...</>
                                : <>Ошибочка(((</>
                            }</>
                        }

                    </div>
                </Modal>
                <Modal
                    isOpen={modalFormIsOpen}
                    onRequestClose={closeModalForm}
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
                        <div className={'modal--container'}>
                            <div className={'modal--container--title-wrapper'}>
                                <h1 className={'modal--container--title-wrapper__text'}
                                    ref={(_subtitle) => (subtitle = _subtitle)}
                                >Обновите или Измените ваши показания</h1>
                                <div className={'modal--container--title-wrapper__line'}/>
                            </div>
                            <form className={'modal--container--form'}>
                                <input className={'modal--container--form__input'}
                                       type="text"
                                       placeholder={"Пульс уд/м"}
                                       onChange={(event) =>
                                           setPulse(Number(event.target.value))}
                                />
                                <input className={'modal--container--form__input'}
                                       type="text"
                                       placeholder={"Давление"}
                                       onChange={(event) =>
                                           setPressure(event.target.value)}
                                />
                                <input className={'modal--container--form__input'}
                                       type="text"
                                       placeholder={"Температура °"}
                                       onChange={(event) =>
                                           setTemperature(Number(event.target.value))}
                                />
                                <input className={'modal--container--form__input'}
                                       type="text"
                                       placeholder={"Сатурация %"}
                                       onChange={(event) =>
                                           setSaturation(Number(event.target.value))}
                                />
                                <input className={'modal--container--form__input'}
                                       type="text"
                                       placeholder={"Сахар"}
                                       onChange={(event) =>
                                           setSugar(Number(event.target.value))}
                                />
                                <select className={'modal--container--form__input__choose'}
                                    value={selectedItem} onChange={(event) => setPatientState(event.target.value)}>
                                    <option value="Плохое">Плохое</option>
                                    <option value="Нормальное">Нормальное</option>
                                    <option value="Хорошее">Хорошее</option>
                                    <option value="Отличное">Отличное</option>
                                </select>
                                <input className={'modal--container--form__button'}
                                       type="button"
                                       value={"Сохранить"}
                                       onClick={handleSave}
                                />
                            </form>
                        </div>
                    </div>
                </Modal>
            </main>
            : <main className={'app-main'}>
                <p>Not authenticated</p>
            </main>
        }
    </>
}