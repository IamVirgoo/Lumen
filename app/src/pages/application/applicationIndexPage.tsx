import AppHeader from "../../components/admin/header";
import RecordCard from "../../components/admin/user-patient/recordCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useGetUserQuery } from "../../services/authService";
import { logIn } from "../../store/reducers/UserPatientSlice";
import { useNavigate } from "react-router-dom";

import 'swiper/css';
import {Records} from "../../devtools/test-info";

export default function ApplicationIndexPage() {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const USER = useAppSelector((state : RootState) => state.userPatient)

    const result = useGetUserQuery(localStorage.getItem("access_token") as string)

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
                            spaceBetween={250}
                            slidesPerView={4}
                        >
                            { Records.map(value=>
                                <SwiperSlide><RecordCard
                                    type={value.type}
                                    title={value.title}
                                    data={value.data}
                                    doctor={value.doctor}
                                    time={value.time}
                                /></SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                    <div className={'app-main--container--content'} style={{
                        paddingTop: "20px"
                    }}>
                        <p className={'app-main--container--content--title'}>История посещений</p>
                        <Swiper
                            spaceBetween={250}
                            slidesPerView={4}
                        >
                            { Records.map(value=>
                                <SwiperSlide><RecordCard
                                    type={value.type}
                                    title={value.title}
                                    data={value.data}
                                    doctor={value.doctor}
                                    time={value.time}
                                /></SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </main>
            : <main className={'app-main'}>
                <p>Not authenticated</p>
            </main>
        }
    </>
}
