import { createBrowserRouter } from "react-router-dom";

import IndexPage from "./pages/indexPage";
import AppOutlet from "./layout/AppOutlet";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import DoctorProfile from "./pages/profiles/doctorProfile";
import PatientProfile from "./pages/profiles/patientProfile";
import ApplicationPage from "./pages/application/applicationPage";

export const Router = createBrowserRouter([
    {
        path : '/',
        index : true,
        element : <IndexPage/>
    },
    {
        path : '/sign-in',
        element : <LoginPage/>
    },
    {
        path : '/sign-up',
        element : <RegistrationPage/>
    },
    {
        path : '/doctor/:id',
        element : <DoctorProfile/>
    },
    {
        path : '/patient/:id',
        element : <PatientProfile/>
    },
    {
        path : "/application",
        element : <AppOutlet/>,
        children : [
            {
                index : true,
                element : <ApplicationPage/>
            }
        ]
    }
])

/*
* +79737337274
* 5898
* */

/*
* +79009859434
* 5898
* */