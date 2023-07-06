import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/reducers/UserPatientSlice";

export default function AppSidebar() {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    return <div className={'sidebar'}>
        <Link to={'/'} className={'sidebar--heading'}>Lumen</Link>
        <div className={'sidebar--body'}></div>
        <div className={'sidebar--lower'}>
            <p onClick={() => {
                dispatch(logOut)
                localStorage.clear()
                navigator('/')
            }}>Выйти</p>
        </div>
    </div>
}