import {useAppSelector} from "../../hooks/redux";
import {RootState} from "../../store/store";

export default function ApplicationIndexPage() {
    const USER = useAppSelector((state : RootState) => state.userPatient)
    return <main>
        {USER.name}
    </main>
}