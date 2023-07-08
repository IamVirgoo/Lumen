interface Props {
    type : boolean;
    title : string;
    data : string;
    time : string;
    doctor : string;
    click : () => void;
    profile : string
}

export default function RecordCard(props : Props) {
    return <>{ props.profile == "user"
        ? <div className={'record-card'} onClick={props.click}>
            <div className={'record-card--content'}>
                <p className={'record-card--content--text'}>{props.title || "Title"}</p>
                <div className={'separator'}/>
                <p className={'record-card--content--text'}>{props.data + " - " + props.time || "Data"}</p>
                <div className={'separator'}/>
                <p className={'record-card--content--text'}>{props.doctor || "Doctor"}</p>
            </div>
        </div>
        : <div className={'record-card__doctor'} onClick={props.click}>
            <div className={'record-card__doctor--content'}>
                <p className={'record-card__doctor--content--text'}>{props.data + " - " + props.time || "Data"}</p>
                <div className={'separator'}/>
                <p className={'record-card__doctor--content--text'}>{props.doctor || "Doctor"}</p>
            </div>
        </div>
    }</>
}