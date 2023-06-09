import Header from "../components/landing/header";
import Card from "../components/landing/card";

export default function IndexPage() {
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
        <section className={"services"}>
            <div className={"services--container"}>
                <h2 className={"services--container--title"}>
                    Наши услуги
                </h2>
                <div className={"services--container--content"}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <div className={"services--container--line"}/>
            </div>
        </section>
        <section className={"personal"}>
            <div className={"personal--container"}>
                <h2 className={"personal--container--title"}>
                    Наши врачи
                </h2>
                <div className={"personal--container--content"}>
                    <Card serviceTitle={"Name"}/>
                    <Card serviceTitle={"Name"}/>
                    <Card serviceTitle={"Name"}/>
                    <Card serviceTitle={"Name"}/>
                    <Card serviceTitle={"Name"}/>
                </div>
                <div className={"personal--container--line"}/>
            </div>
        </section>
    </main>
}