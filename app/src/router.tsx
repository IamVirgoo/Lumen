import {createBrowserRouter} from "react-router-dom";
import IndexPage from "./pages/indexPage";
import AppOutlet from "./layout/AppOutlet";

export const Router = createBrowserRouter([
    {
        path : '/',
        index : true,
        element : <IndexPage/>
    }
])