import {useParams} from "react-router-dom";

export default function PatientProfile() {
    const { id } = useParams()
    return <>{id}</>
}