import { createBrowserRouter } from "react-router-dom";

import IndexPage from "./pages/indexPage";
import AppOutlet from "./layout/AppOutlet";
import LoginPage from "./pages/loginPage";
import RegistrationPage from "./pages/registrationPage";
import ConfirmationPage from "./pages/confirmationPage";
import ApplicationIndexPage from "./pages/application/applicationIndexPage";

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
        path : "/confirmation",
        element : <ConfirmationPage/>
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