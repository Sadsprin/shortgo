
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Bookmark } from "../../type/type";
import { keyToBookmark, shortcutInitialState} from '../shortcut'

const storageGetAll = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (data) => {
      if(chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError)
      }
      resolve(data as keyToBookmark)
    })
  })
} 




export const _fetchAllShortcut = createAsyncThunk<
  keyToBookmark, string, {
    rejectValue: string
  }
>('shortcut/fetchshortcut', async ( _: string , thunkApi) => {
    try {
      const allShortcut = await storageGetAll()
      return allShortcut as keyToBookmark
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const fetchAllShortcut = (virtualArg: string = '') => _fetchAllShortcut(virtualArg)


