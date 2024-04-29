import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import bridge from "@vkontakte/vk-bridge";
import {createBrowserRouter, createHashRouter, RouterProvider} from "@vkontakte/vk-mini-apps-router";
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";


bridge.send('VKWebAppInit')

const router = createHashRouter([
    {
        path: '/',
        panel: 'home_panel',
        view: 'default_view'
    },
    {
        path: '/:id',
        panel: 'post_panel',
        view: 'default_view'
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider>
        <AdaptivityProvider>
            <AppRoot>
                <RouterProvider router={router}>
                    <App/>
                </RouterProvider>
            </AppRoot>
        </AdaptivityProvider>
    </ConfigProvider>
)
