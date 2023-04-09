
import React, { useCallback, useRef} from 'react'
import { goBack } from 'react-chrome-extension-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import Input from '../list/input'
import {Bookmark} from '../type/type'

import './addshortcut.scss'
import { useAppDispatch } from '../redux/config'
import shortcutSet from '../redux/thunk/set'

const AddShortcut: React.FunctionComponent = () => {
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const dispatch = useAppDispatch()

  const inputInfo = {
    name: '',
    shortcut: '',
    url: ''
  }

  const addShortcut = useCallback((e) => {
    e.preventDefault()
    dispatch(shortcutSet({
      name: e.target[0].value,
      shortcut: e.target[1].value,
      url: e.target[2].value
    }))

    goBack()
  }, [])

  const submitAddForm = useCallback(() => {
    addButtonRef.current?.click()
  }, [addButtonRef])

  return (
    <>
      <FontAwesomeIcon className="backward" icon={faBackward as IconProp} onClick={() => goBack()} />
      <h1 className="addPageTitle">Add shortcut</h1>
      <Input<Bookmark> 
        inputContent={inputInfo} 
        submitFunction={addShortcut} 
        buttonName="추가"
        buttonRef={addButtonRef}
      />
      <button className="addButton" onClick={submitAddForm}>add</button>
    </>
  )
}

export default AddShortcut

