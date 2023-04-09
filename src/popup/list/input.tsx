
import React, {useCallback, useState, PropsWithChildren, FunctionComponent} from 'react'
import { InputContent } from '../type/type'
import { capitalizeWord } from '../utils'

type InputType = <T = {}>(propType: PropsWithChildren<InputContent<T>>) => JSX.Element

const Input: InputType = ({inputContent, submitFunction, buttonName, buttonRef}) => {

  const [formData, setFormData] = useState({...inputContent})

  const onChangeFormData = useCallback((e) => {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }, [])


  const inputElements: Array<JSX.Element> = Object.keys(inputContent).map((name) => {
    return (
     <div 
      key={name} 
      className={"form"+ capitalizeWord(name)}
     >
       <label id={name}>{name.toUpperCase()}</label>
       <input 
        type="text" 
        name={name} 
        className={name} 
        placeholder={name} 
        value={formData[name]} 
        data-title="name" 
        onChange={onChangeFormData}/>
     </div>
    )
  })

  return (
    <div>
      <form 
        className="listForm" 
        onSubmit={submitFunction}
      >
        {inputElements}
        <button 
          type="submit" 
          className='listFormSubmit' 
          ref={buttonRef ? buttonRef : null}
        >
          {buttonName}
        </button>
      </form>
    </div>
  )
}

export default Input