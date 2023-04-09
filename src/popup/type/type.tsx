import React from "react"

export type Bookmark = {
  name: string,
  shortcut: string,
  url: string
}

export type BookmarkStore = {
  [name: string] : Bookmark
}

type key = string

export type InputContent<T> = {
  inputContent: T
  submitFunction: (e: React.FormEvent<HTMLFormElement>) => void,
  buttonName: string
  buttonRef?: React.RefObject<any>
}

export type ActionType<P> = {
  payload: P,
  type: string,
  [actionProps: string]: any
} 
