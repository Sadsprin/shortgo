import 'react-devtools'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import Root from './root'
import store from '../redux/config' 
import './popup.scss'


const HtmlRootElement = document.getElementById('popupRoot')

if(!HtmlRootElement) throw new Error('this element is not exist')

const root = createRoot(HtmlRootElement)

root.render(
        <Provider store={store}>
            <Root />
        </Provider>
)

