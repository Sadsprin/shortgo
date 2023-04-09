
import React, { useRef, useCallback, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook, faL, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import './list.scss'

import Form from './form'
import { Bookmark } from '../type/type'
import { isClassExist } from '../utils'

const List: React.FunctionComponent<any> = ({bookmark}) => {

  const {name, shortcut, url}: Bookmark = bookmark

  const [listRootActive , setListRootActive] = useState(false)

  const ListRoot: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const onListClick = useCallback((e) => {
      const isExistListRootActive = ListRoot.current?.classList.toggle('listRootActive')

      setListRootActive(!!isExistListRootActive)

  }, [ListRoot])
  
  return (
    <div className="ListRoot" ref={ListRoot}>
      <div className="ListContentWrap">
        <div className="ListContent">
          <div className="bookmarkName" onClick={onListClick}>
            {name}
          </div>
          <div className="bookmarkShortcut">
            <FontAwesomeIcon className="awesomeFont" icon={ faAddressBook as IconProp} />
            &nbsp;
            {shortcut}
          </div>
          <div className="bookmarkUrl">
            <FontAwesomeIcon className="awesomeFont" icon={ faLocationArrow as IconProp} />
            &nbsp;
            {url.length > 25 ? url.slice(0, 25) + '...': url}
          </div>
        </div>
        <div className="FormCenter">
          {
            listRootActive
            ? <Form listName={name} shortcut={shortcut} url={url}/> 
            : null
          }
        </div>
      </div>
    </div>
  )

}

export default List