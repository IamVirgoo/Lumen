import Modal from "react-modal";
import jwtDecode from "jwt-decode";

import { Notifications } from "react-push-notification";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../services/authService";
import { useAppDispatch } from "../hooks/redux";
import { logIn } from "../store/reducers/UserPatientSlice";
import { decoded_token } from "../models/IToken";
import { errorHandler } from "../devtools/validationHandlers";

export default function RegistrationPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    let subtitle;

    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null)
    const [patronymic, setPatronymic] = useState<string | null>(null)
    const [telephoneNumber, setTelephoneNumber] = useState<string>('')
    const [password, setPassword] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null)
    const [confirmCode, setConfirmCode] = useState<string | null>(null)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [registrationUser, { isLoading, isError, isSuccess}] = useSignUpMutation()

    const [flag, setFlag] = useState<string>("")
    const [confirmStatus, setConfirmStatus] = useState<boolean>(false)

    const ACCESS_TOKEN = localStorage.getItem("access_token");
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");

    const currentDate = new Date()

    useEffect(() => {
        if (ACCESS_TOKEN != null) {
            const DECODED_ACCESS_TOKEN : decoded_token = jwtDecode(ACCESS_TOKEN as string)
            const DECODED_REFRESH_TOKEN : decoded_token = jwtDecode(REFRESH_TOKEN as string)

            console.log(DECODED_ACCESS_TOKEN)
            console.log(DECODED_REFRESH_TOKEN)

            DECODED_ACCESS_TOKEN.exp * 1000 < currentDate.getTime()
                ? console.log("Token expired")
                : navigator('/sign-in')
        }
    }, [])

    const open = async (e : any) => {
        e.preventDefault()
        try {
            const result = await fetch(`http://localhost:8888/send_confirm_sms?number=${telephoneNumber}`, {
                method : "GET"
            })
            if (result.ok) {
                setModalIsOpen(true)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const close = () => setModalIsOpen(false)

    const checkCode = async () => {
        try {
            const result = await fetch(`http://localhost:8888/confirm_code?number=${telephoneNumber}&code=${confirmCode}`, {
                method : "GET"
            })
            if (result.ok) {
                console.log("okk")
                setFlag("0, 255, 0")
                setConfirmStatus(true)
            } else {
                setFlag("255, 0, 0")
                setConfirmStatus(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const confirmPasswordValidation = (confirmPassword : string) => {
        return confirmPassword === password
    }

    const handleSubmit = async () => {
        if (!confirmStatus) { errorHandler("Пожалуйста подтвердите телефон"); return; }
        if (!name || !surname || !patronymic || !password || !confirmPassword) { errorHandler("ожалуйста заполните все поля"); return; }
        if (!confirmPasswordValidation(confirmPassword)) { errorHandler("Пароли не совпадают"); return; }
        try {
            await registrationUser({
                name: name,
                surname: surname,
                patronymic: patronymic,
                phone_number: telephoneNumber,
                password: password,
            }).then((result : any) => {
                console.log(result)
                dispatch(logIn({
                    name : result.data.name,
                    surname : result.data.surname,
                    patronymic : result.data.patronymic,
                    phone_number : result.data.phone_number,
                    authenticate : true,
                    access_token : result.data.access_token.token,
                    refresh_token : result.data.refresh_token.token
                }))
                localStorage.setItem("authenticate", "true")
                localStorage.setItem("access_token", result.data.access_token.token)
                localStorage.setItem("refresh_token", result.data.refresh_token.token)
                navigator('/sign-in')
            })
        } catch (error : any) {
            console.log(error.error)
            errorHandler(error.error.data.detail as string)
        }
    }

    return <main>
        <Notifications position={'top-right'}/>
        <section className={"sign-up"}>
            <div className={"sign-up--container"}>
                <h1 className={"sign-up--container--title"}>
                    Зарегистрироваться в системе
                </h1>
                <form className={"sign-up--container--form"}>
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Имя"}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Фамилия"}
                           onChange={(e) => setSurname(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Отчество"}
                           onChange={(e) => setPatronymic(e.target.value)}
                    />
                    <form className={'sign-up--container--form__phone'}>
                        { confirmStatus
                            ? <input className={"sign-up--container--form__phone--input"}
                                     type="tel"
                                     pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                     placeholder={telephoneNumber}
                                     readOnly={true}
                            />
                            : <input className={"sign-up--container--form__phone--input"}
                                     type="tel"
                                     pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                     placeholder={"Номер телефона"}
                                     onChange={(e) => setTelephoneNumber(e.target.value)}
                            />
                        }
                        { confirmStatus
                            ? <input className={'sign-up--container--form__phone--code'}
                                     type='button'
                                     value={'Подтверждено'}
                                     style={{
                                         backgroundColor : "#407468",
                                         border: "1px solid #D9D9D9",
                                     }}
                            />
                            : <input className={'sign-up--container--form__phone--code'}
                                     type='button'
                                     value={'Подтвердить'}
                                     onClick={open}
                            />
                        }
                    </form>
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Пароль"}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Повторно введите пароль"}
                           onChange={(e) => {
                               if (!confirmPasswordValidation(e.target.value)) {
                                   e.target.style.boxShadow = "0 0 15px rgb(225, 0, 0)"
                               }
                               else {
                                   setConfirmPassword(e.target.value)
                                   e.target.style.boxShadow = "0 0 15px rgb(0, 225, 0)"
                               }
                           }}
                    />
                    <div className={"sign-up--container--form--button-wrapper"}>
                        <input className={"sign-up--container--form--button-wrapper--button"}
                               type="button"
                               value={"Зарегистрироваться"}
                               onClick={handleSubmit}
                        />
                        <p className={"sign-up--container--form--button-wrapper--text"}>
                            уже зарегистрированы? <Link
                            to={"/sign-in"}
                            className={"sign-up--container--form--button-wrapper--text__link"}>
                            войдите в систему
                        </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={close}
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
                    <div className={'modal--container--title-wrapper'}>
                        <h1 className={'modal--container--title-wrapper__text'}
                            ref={(_subtitle) => (subtitle = _subtitle)}
                        >Подтвердите номер телефона</h1>
                        <div className={'modal--container--title-wrapper__line'}></div>
                    </div>
                    <form className={'modal--container--content-confirm'}>
                        <input className={'modal--container--content-confirm--input'}
                               type="text"
                               placeholder={"Введите код подтверждения"}
                               onChange={(e) => setConfirmCode(e.target.value)}
                               style={{
                                   boxShadow: `0 0 15px 0 rgba(${flag}, .5)`
                               }}
                        />
                        <input className={'modal--container--content-confirm--button'}
                               type="button"
                               value={'Отправить'}
                               onClick={checkCode}
                        />
                    </form>
                    <div className={'modal--container--content__line'}/>
                </form>
            </div>
        </Modal>
    </main>
}
