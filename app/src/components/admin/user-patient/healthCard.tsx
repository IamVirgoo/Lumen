interface Props {
    type : string;
    value : string;
    state : string;
    metric : string
}

export default function HealthCard(props : Props) {
    return <div className={'health-card'}>
        <div className={'health-card--content'}>
            <p className={'health-card--content--title'}>{props.type}</p>
            <div className={'health-card--content__line'}/>
            <p className={'health-card--content--title'}>{props.value} {props.metric}</p>
            <div className={'health-card--content__line'}/>
            <p className={'health-card--content--title'}>{props.state}</p>
        </div>
    </div>
}