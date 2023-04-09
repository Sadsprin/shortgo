import { createAsyncThunk } from "@reduxjs/toolkit"
import { Bookmark } from "../../type/type"

// promisify chrome.storage.sync.set function
const storageSet = (bookmark: Bookmark) => {
  return new Promise((resolve, reject) => {

    const urlValidatorRegex = /http(s)?\:\/\/[a-z]+\.[a-z]+\.[a-z]+(\/.*)?/

    if(!urlValidatorRegex.exec(bookmark.url)) {
      reject(new Error(`
        url form is not valid
        please enter the specified format
        "http(s is optional)://(any word).(any word).(any word)/(any word)"
        example: "https://www.naver.com"
     `))
    } 

    chrome.storage.sync.set({
      [bookmark.shortcut]: bookmark
    }, () => {
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      resolve(bookmark)
    })
  })
}

const shortcutSet = createAsyncThunk<
  Bookmark, Bookmark, {
    rejectValue: string
  } 
>('shortcut/shortcutset', async (bookmark, {rejectWithValue} ) => {
  try {
    await storageSet(bookmark)
    return bookmark
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export default shortcutSet