
import React, { useCallback, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/config'
import shortcutRemove from '../redux/thunk/remove'
import shortcutSet from '../redux/thunk/set'
import { Bookmark } from '../type/type'

import './form.scss'

import Input from './input'

type FormType = Pick<Bookmark, "shortcut" | "url"> & {listName: string} 

/**
 * 
 * this component is used for Form Component 
 */
const Form: React.FunctionComponent<FormType> = ({listName, shortcut, url}) => {

  const dispatch = useAppDispatch()

  const {isRemoveLoading, isRemoveError} = useAppSelector(state => state.shortcut)

  const inputInfo = useMemo(() => ({
    name: listName,
    shortcut,
    url,
  }), [shortcut, listName, url])

  const listFormRef: React.RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null)
  const listFormSubmitRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
  const editButtonRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)

  const listFormSubmit = useCallback((e) => {

    dispatch(shortcutSet({
      name: e.target[0].value,
      shortcut: e.target[1].value,
      url: e.target[2].value
    }))
  }, [])

  const onEditButtonClicked = useCallback((e) => {
    listFormSubmitRef.current?.click()  
  }, [])

  const onDeleteShortcut = useCallback((e) => {
    dispatch(shortcutRemove(shortcut))
  }, [])


  return (
    <div className="formWrap">
      {
        isRemoveLoading  
          ? <h1>Loading...</h1>
          : isRemoveError
            ?  <h6>{isRemoveError}</h6>
            :  (
            <>
              <Input inputContent={inputInfo} submitFunction={listFormSubmit} buttonName="수정" buttonRef={listFormSubmitRef}/>
              <div className="buttons">
                <button className="editButton" onClick={onEditButtonClicked} ref={editButtonRef}>수정</button>
                <button className="deleteButton" onClick={onDeleteShortcut}>삭제</button>
              </div>
            </> )
      }
    </div>
  )
}

export default Form