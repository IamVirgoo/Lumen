import Header from "../../components/landing/header";
import Modal from "react-modal";
import jwtDecode from "jwt-decode";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useGetUserQuery } from "../../services/authService";
import { decoded_token } from "../../models/IToken";
import { logIn } from "../../store/reducers/UserPatientSlice";
import { useGetDoctorQuery } from "../../services/dataService";
import {errorHandler} from "../../devtools/validationHandlers";
import {Notifications} from "react-push-notification";

export default function DoctorProfile() {
    const { id } = useParams()

    const dispatch = useAppDispatch()
    let subtitle

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [type, setType] = useState<boolean>(false)

    const ACCESS_TOKEN = localStorage.getItem("access_token");
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");

    const result = useGetUserQuery(ACCESS_TOKEN as string)
    const doctor = useGetDoctorQuery(id as string)

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false)

    const currentData = new Date()

    useEffect(() => {
        if (ACCESS_TOKEN != null) {
            const DECODED_ACCESS_TOKEN : decoded_token = jwtDecode(ACCESS_TOKEN as string)
            const DECODED_REFRESH_TOKEN : decoded_token = jwtDecode(REFRESH_TOKEN as string)

            console.log(DECODED_ACCESS_TOKEN)
            console.log(DECODED_REFRESH_TOKEN)

            if (DECODED_ACCESS_TOKEN.exp * 1000 < currentData.getTime()) {
                setType(false)
                console.log("token expired")
            } else {
                setType(true)
                if (result.isSuccess) {
                    dispatch(logIn({
                        name: result.data.name,
                        surname: result.data.surname,
                        patronymic: result.data.patronymic,
                        phone_number: result.data.phone_number,
                        authenticate: true,
                        access_token: localStorage.getItem("access_token") as string,
                        refresh_token: localStorage.getItem("refresh_token") as string
                    }))
                }
            }
        }
    }, [result])

    const handleRecord = () => {
        if (date == '') errorHandler('Выберите дату')
        if (time == '') errorHandler("Выберите время")
    }

    if (doctor.isSuccess) {
        return <main>
            <Notifications position={'top-right'}/>
            <Header/>
            <section className={'doctor'}>
                <div className={'doctor--container'}>
                    <div className={'doctor--container--title-wrapper'}>
                        <h1 className={'doctor--container--title-wrapper--name'}>{doctor.data.fio}</h1>
                        <a
                            href={'/#doctors'}
                            className={'doctor--container--title-wrapper--link'}
                        >
                            Все доктора
                        </a>
                    </div>
                    <div className={'doctor--container--content'}>
                        <div className={'doctor--container--content__left'}>
                            <img className={'doctor--container--content__left--image'} src={`http://localhost/lumen/photo/${doctor.data.photo}`} alt=""/>
                            <button
                                type={'button'}
                                className={'doctor--container--content__left--button'}
                                onClick={openModal}
                            >
                                Записаться
                            </button>
                        </div>
                        <div className={'doctor--container--content__right'}>
                            <p className={'doctor--container--content__right--info-title'}>Информация о враче</p>
                            <div className={'doctor--container--content__right--info'}>
                                <p className={'doctor--container--content__right--info--text'}>Стаж работы: <span>{doctor.data.work_experience}</span></p>
                                <p className={'doctor--container--content__right--info--text'}>
                                    Учёная степень / Категория / Ученое звание: <span>{doctor.data.category}</span>
                                </p>
                                <p className={'doctor--container--content__right--info--text'}>Специализация:</p>
                                <ul className={'doctor--container--content__right--info--spec'}>
                                    { doctor.data.specialization.map(value => <li className={'doctor--container--content__right--info--spec--text'}>
                                        { value }
                                    </li>) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                    <form className={'modal--container'}>
                        { type
                            ? <>
                                <div className={'modal--container--title-wrapper'}>
                                    <h1 className={'modal--container--title-wrapper__text'}
                                        ref={(_subtitle) => (subtitle = _subtitle)}
                                    >Запишитесь на приём</h1>
                                    <div className={'modal--container--title-wrapper__line'}></div>
                                </div>
                                <div className={'modal--container--content'}>
                                    <div className={'modal--container--content__dates'}>
                                        { doctor.data.day_appointments.map(value =>
                                            <div className={'modal--container--content__dates--date'}
                                                 onClick={() => {setDate(value.date)}}
                                            >
                                                <p className={'modal--container--content__dates--date__text'}
                                                >{value.day_of_the_week}</p>
                                                <p className={'modal--container--content__dates--date__time'}>
                                                    {value.date.substring(5)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className={'modal--container--content__line'}/>
                                    <div className={'modal--container--content__times'}>
                                        { doctor.data.day_appointments.map((value) => <>
                                            { value.date == date
                                                ? <>{
                                                    value.appointments.map((value) =>
                                                        <div className={'modal--container--content__times--time'}
                                                             onClick={() => { setTime(value.date.substring(11, 16)) }}
                                                        >
                                                            <p className={'modal--container--content__times--time__text'}>
                                                                {value.date.substring(11, 16)}
                                                            </p>
                                                        </div>
                                                    )
                                                }</>
                                                : <></>
                                            }
                                        </>) }
                                    </div>
                                </div>
                                <div className={'modal--container--content__line'}/>
                                <button type={'button'}
                                        className={'modal--container--content__button'}
                                        onClick={handleRecord}
                                >
                                    Записаться на <span>{date.substring(5)}</span> - <span>{time}</span>
                                </button>
                            </>
                            : <>
                                <div className={'modal--container--title-wrapper'}>
                                    <h1 className={'modal--container--title-wrapper__text'}
                                        ref={(_subtitle) => (subtitle = _subtitle)}
                                    >Запишитесь на приём</h1>
                                    <div className={'modal--container--title-wrapper__line'}></div>
                                </div>
                                <Link to={'/sign-in'} className={'modal--container--warning'}>
                                    Войдите в систему
                                </Link>
                            </>
                        }
                    </form>
                </div>
            </Modal>
        </main>
    }
    if (doctor.isLoading) {
        return <main>
            <Header/>
            <section className={'doctor'}>
                <div className={'doctor--container'}>
                    <h1>Загузка...</h1>
                </div>
            </section>
        </main>
    }
    return <main>
        <Header/>
        <section className={'doctor'}>
            <div className={'doctor--container'}>
                <h1>Ошибочка</h1>
            </div>
        </section>
    </main>
}