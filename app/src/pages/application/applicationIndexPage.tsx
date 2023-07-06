import AppHeader from "../../components/admin/header";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../services/authService";
import { logIn } from "../../store/reducers/UserPatientSlice";
import { useNavigate } from "react-router-dom";
import { Records } from "../../devtools/test-info";

import 'swiper/css';
import Modal from "react-modal";

export default function ApplicationIndexPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()
    let subtitle;

    const USER = useAppSelector((state : RootState) => state.userPatient)

    const result =
        useGetUserQuery(localStorage.getItem("access_token") as string)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [recordId, setRecordId] = useState<string>('')

    const openModal = (id : string) => {
        setRecordId(id)
        setModalIsOpen(true)
    }
    const closeModal = () => setModalIsOpen(false)

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(logIn({
                name : result.data.name,
                surname : result.data.surname,
                patronymic : result.data.patronymic,
                phone_number : result.data.phone_number,
                authenticate : true,
                access_token : localStorage.getItem("access_token") as string,
                refresh_token : localStorage.getItem("refresh_token") as string
            }))
        }
        if (result.isError) navigator('/sign-in')
    }, [result])

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
                            { Records.map(value=>
                                <SwiperSlide><RecordCard
                                    type={value.type}
                                    title={value.title}
                                    data={value.data}
                                    doctor={value.doctor}
                                    time={value.time}
                                    click={() => openModal(String(value.id))}
                                /></SwiperSlide>
                            )}
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
                        <div className={'modal--container'}>
                            <div className={'modal--container--title-wrapper'}>
                                <h1 className={'modal--container--title-wrapper__text'}
                                    ref={(_subtitle) => (subtitle = _subtitle)}
                                >{recordId}</h1>
                                <div className={'modal--container--title-wrapper__line'}></div>
                            </div>
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
