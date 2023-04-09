
import React, { useEffect } from 'react'
import List from '../list/list'
import { Nav } from '../nav/nav'
import { Bookmark } from '../type/type'
import { createMemoryHistory } from 'history'
import {
  Router,
  Link,
} from 'react-chrome-extension-router'
import { useAppDispatch, useAppSelector } from '../redux/config'
import { fetchAllShortcut } from '../redux/thunk/getall'
import { keyToBookmark } from '../redux/shortcut'

const history = createMemoryHistory()



const Root: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllShortcut())
  }, [])

  const shortcutData: keyToBookmark = useAppSelector(state => state.shortcut.data)

  const listMap = Object.keys(shortcutData).map((shortcut) => {
    return <List key={shortcutData[shortcut].name} bookmark={shortcutData[shortcut]} />
  })

  return (
    <div className='_body'>
      <Nav />

      <Router>
        {listMap}
      </Router>
    </div>
  )
}

export default Root