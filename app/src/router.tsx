import { createBrowserRouter } from "react-router-dom";

import IndexPage from "./pages/indexPage";
import AppOutlet from "./layout/AppOutlet";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import ConfirmationPage from "./pages/confirmationPage";
import ApplicationIndexPage from "./pages/application/applicationIndexPage";
import DoctorProfile from "./pages/profiles/doctorProfile";
import PatientProfile from "./pages/profiles/patientProfile";

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
        path : '/confirmation',
        element : <ConfirmationPage/>
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
                element : <ApplicationIndexPage/>
            }
        ]
    }
])