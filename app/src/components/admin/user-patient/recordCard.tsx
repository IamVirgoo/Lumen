import { Link } from "react-router-dom";

interface Props {
    type : string;
    title : string;
    data : string;
    time : string;
    doctor : string
}

export default function RecordCard(props : Props) {
    return <>{props.type == "current"
        ? <div  className={'record-card'}>
            <div className={'record-card--content'}>
                <p className={'record-card--content--text'}>{props.title || "Title"}</p>
                <div className={'separator'}/>
                <p className={'record-card--content--text'}>{props.data + " - " + props.time || "Data"}</p>
                <div className={'separator'}/>
                <Link to={''} className={'record-card--content--text'}>{props.doctor || "Doctor"}</Link>
            </div>
        </div>
        : <></>
    }</>
}