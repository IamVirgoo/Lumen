import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.sass'
import './styles/index.sass'
import './styles/header.sass'
import './styles/card.sass'
import './styles/authentication.sass'
import './styles/confirmation.sass'

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