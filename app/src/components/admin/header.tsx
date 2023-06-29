interface Props {
    name : string;
    surname : string;
    patronymic : string
}

export default function AppHeader(props : Props) {
    return <header className={'app-header'}>
        <div className={'app-header--container'}>
            <div className={'app-header--container--info-wrapper'}>
                <p className={'app-header--container--info-wrapper__text'}>
                    {props.name + " " + props.surname + " " + props.patronymic}
                </p>
                <div className={'app-header--container--info-wrapper__image'} >
                    <p>{props.name.at(0)}</p>
                </div>
            </div>
        </div>
    </header>
}