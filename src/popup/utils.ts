import React from 'react'

export const isClassExist = (elementRef: React.RefObject<any>, className: string): boolean => {
  console.log(`is ref contains className ${className}? ${elementRef.current?.classList.contains(className)}`)
  return elementRef.current?.classList.contains(className) 
}

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}