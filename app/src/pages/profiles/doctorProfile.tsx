import Header from "../../components/landing/header";

import { useParams } from "react-router-dom";
import { Doctors } from "../../devtools/test-info";

export default function DoctorProfile() {
    const { id } = useParams()
    const doctor = Doctors[Number(id)]

    return <main>
        <Header/>
        <section className={'doctor'}>
            <div className={'doctor--container'}>
                <div className={'doctor--container--title-wrapper'}>
                    <h1 className={'doctor--container--title-wrapper--name'}>{doctor.title}</h1>
                    <a
                        href={''}
                        className={'doctor--container--title-wrapper--link'}
                        onClick={() => window.location.href = '/#doctors'}
                    >
                        Все доктора
                    </a>
                </div>
                <div className={'doctor--container--content'}>
                    <div className={'doctor--container--content__left'}>
                        <img className={'doctor--container--content__left--image'} src="https://medsi.ru/upload/iblock/466/4667cbfe0f08d26709a033f8f966ab95.jpg" alt=""/>
                        <button
                            type={'button'}
                            className={'doctor--container--content__left--button'}
                        >
                            Записаться
                        </button>
                    </div>
                    <div className={'doctor--container--content__right'}>
                        <p className={'doctor--container--content__right--info-title'}>Информация о враче</p>
                        <div className={'doctor--container--content__right--info'}>
                            <p className={'doctor--container--content__right--info--text'}>Стаж работы: <span>{doctor.devInfo.experience}</span></p>
                            <p className={'doctor--container--content__right--info--text'}>
                                Учёная степень / Категория / Ученое звание: <span>{doctor.devInfo.category}</span>
                            </p>
                            <p className={'doctor--container--content__right--info--text'}>Специализация:</p>
                            <ul className={'doctor--container--content__right--info--spec'}>
                                { doctor.devInfo.specialize.map(value => <li className={'doctor--container--content__right--info--spec--text'}>
                                    { value }
                                </li>) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
}