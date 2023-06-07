import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { Provider } from 'react-redux';
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const store = setupStore()

const App = () => {
    return <>
        <Provider store={store}>
            <React.StrictMode>
                <RouterProvider router={Router}/>
            </React.StrictMode>
        </Provider>
    </>
};

root.render(<App />);