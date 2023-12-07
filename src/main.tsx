import React from 'react';
import ReactDOM from 'react-dom/client';
import {StyleProvider} from '@ant-design/cssinjs';
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import esES from "antd/es/locale/es_ES";
import './index.css';
import {AuthProvider} from "./providers";
import {router} from "./routes";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={esES}>
            <StyleProvider hashPriority="high">
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </StyleProvider>
        </ConfigProvider>

    </React.StrictMode>,
)
