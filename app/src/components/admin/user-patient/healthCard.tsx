import {useEffect, useState} from "react";

interface Props {
    type : string;
    value : string;
    state : string
}

export default function HealthCard(props : Props) {
    const [color, setColor] = useState<string>('#D9D9D9')

    useEffect(() => {
        switch (props.state) {
            case "Плохое" : { setColor('#4B0082'); break }
            case "Нормальное" : { setColor('#FFFF99'); break }
            case "Хорошее" : { setColor('#FFD700'); break }
            case "Отличное" : { setColor('#0C22B8'); break }
        }
    }, [])

    return <div className={'health-card'} style={{boxShadow: `0 0 15px 0 rgba(${color}, .5)`}}>
        <div className={'health-card--content'}>
            <p className={'health-card--content--title'}>{props.type || "Title"}</p>
            <div className={'health-card--content__line'}/>
            <p className={'health-card--content--title'}>{props.value || "Value"}</p>
            <div className={'health-card--content__line'}/>
            <p className={'health-card--content--title'}>{props.state || "State"}</p>
        </div>
    </div>
}