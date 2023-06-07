import {createBrowserRouter} from "react-router-dom";
import IndexPage from "./pages/indexPage";
import AppOutlet from "./layout/AppOutlet";
import AppIndex from "./pages/application/appIndex";
import SecondPage from "./pages/application/secondPage";

export const Router = createBrowserRouter([
    {
        path : '/',
        index : true,
        element : <IndexPage/>
    },
    {
        path : '/app',
        element : <AppOutlet/>,
        children : [
            {
                index : true,
                element : <AppIndex/>
            },
            {
                path : 'second',
                element : <SecondPage/>
            }
        ]
    }
])