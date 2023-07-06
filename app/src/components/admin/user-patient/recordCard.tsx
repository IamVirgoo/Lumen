interface Props {
    type : string;
    title : string;
    data : string;
    time : string;
    doctor : string;
    click : () => void
}

export default function RecordCard(props : Props) {
    return <div className={'record-card'} onClick={props.click}>
        <div className={'record-card--content'}>
            <p className={'record-card--content--text'}>{props.title || "Title"}</p>
            <div className={'separator'}/>
            <p className={'record-card--content--text'}>{props.data + " - " + props.time || "Data"}</p>
            <div className={'separator'}/>
            <p className={'record-card--content--text'}>{props.doctor || "Doctor"}</p>
        </div>
    </div>
}