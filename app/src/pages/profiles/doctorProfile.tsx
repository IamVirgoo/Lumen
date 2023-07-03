import Header from "../../components/landing/header";
import Modal from "react-modal";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { devDoctors } from "../../devtools/test-info";

/*const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        backgroundColor: '#21232E',
        border: 'none'
    }
};*/

export default function DoctorProfile() {
    const { id } = useParams()

    const doctor = devDoctors[Number(id)]
    let subtitle

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(true)

    const open = () => setModalIsOpen(true);
    const close = () => setModalIsOpen(false)

    return <main>
        <Header/>
        <section className={'doctor'}>
            <div className={'doctor--container'}>
                <div className={'doctor--container--title-wrapper'}>
                    <h1 className={'doctor--container--title-wrapper--name'}>{doctor.title}</h1>
                    <a
                        href={'/#doctors'}
                        className={'doctor--container--title-wrapper--link'}
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
                            onClick={open}
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
                        >Запишитесь на приём</h1>
                        <div className={'modal--container--title-wrapper__line'}></div>
                    </div>
                    <div className={'modal--container--content'}>
                        <div className={'modal--container--content__dates'}>
                            { doctor.devInfo.dates.map(value =>
                                <div className={'modal--container--content__dates--date'}>
                                    <p className={'modal--container--content__dates--date__text'}
                                    >{value.data}</p>
                                    <p className={'modal--container--content__dates--date__time'}>04.07</p>
                                </div>
                            )}
                        </div>
                        <div className={'modal--container--content__line'}/>
                        <div className={'modal--container--content__times'}>
                            { doctor.devInfo.dates.map(value => <>
                                { value.times.map(value => <div className={'modal--container--content__times--time'}>
                                    <p className={'modal--container--content__times--time__text'}>{value}</p>
                                </div>)}
                                {/*TODO : сделать так, чтобы время выводилось конркетно для выбранной даты*/}
                            </>)}
                        </div>
                    </div>
                    <div className={'modal--container--content__line'}/>
                    <button type={'button'}
                            className={'modal--container--content__button'}
                    >
                        Записаться
                    </button>
                </form>
            </div>
        </Modal>
    </main>
}