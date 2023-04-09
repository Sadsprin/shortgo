
import React from 'react'
import { Link } from 'react-chrome-extension-router'

import AddShortcut from '../addshortcut/addshortcut'

import './nav.scss'



export const Nav = () => {
  return (
    <div className="navigation">
      <h1 className="mainWord">
        shortGo
      </h1>
      <Link component={AddShortcut} className="addButton" />
    </div>
  )
}