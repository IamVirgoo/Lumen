import Header from "../components/landing/header";
import Card from "../components/landing/card";

import { devDoctors, Services } from "../devtools/test-info";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useGetDoctorsQuery } from "../services/dataService";

import 'swiper/css';

export default function IndexPage() {
    const doctors = useGetDoctorsQuery('')

    return <main>
        <Header/>
        <section className={"hero"}>
            <div className={"hero--container"}>
                <h1 className={"hero--container--title"}>
                    Заботимся о вашем здоровье с любовью и профессионализмом
                </h1>
                <div className={"hero--container--line"}/>
            </div>
        </section>
        <section className={"services"} id={"services"}>
            <div className={"services--container"}>
                <h2 className={"services--container--title"}>
                    Наши услуги
                </h2>
                <div className={"services--container--content"}>
                    <Swiper
                        spaceBetween={-100}
                        slidesPerView={3}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        { Services.map(value =>
                            <SwiperSlide><Card title={value.title}
                                               description={value.description}
                                               link={''}
                                               image={''}
                            />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className={"services--container--line"}/>
            </div>
        </section>
        <section className={"personal"} id='doctors'>
            <div className={"personal--container"}>
                <h2 className={"personal--container--title"}>
                    Наши врачи
                </h2>
                <div className={"personal--container--content"}>
                    { doctors.isSuccess
                        ? <Swiper
                            spaceBetween={-100}
                            slidesPerView={3}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            { doctors.data.map((value) =>
                                <SwiperSlide>
                                    <Card title={value.fio}
                                          description={value.info}
                                          link={`/doctor/${value.id}`}
                                          image={`lumen/photo/${value.photo}`}
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>
                        : <Swiper
                            spaceBetween={-100}
                            slidesPerView={3}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            { devDoctors.map((value, index) =>
                                <SwiperSlide><Card title={''}
                                                   description={''}
                                                   link={''}
                                                   image={''}
                                />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    }
                </div>
                <div className={"personal--container--line"}/>
            </div>
        </section>
    </main>
}