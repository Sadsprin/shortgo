import { createAsyncThunk } from '@reduxjs/toolkit'
import { Bookmark } from '../../type/type'

/**
 * 
 * @param key find data in chrome storage using key
 * @returns ReturnValue Generic type
 * 
 * example 
 * 
 *  function storageGet<ReturnType>(key: string): Promise<ReturnType>
 * 
 *  async () => {
 *    const data = await storageGet<ReturnType>(key)
 *    return data
 *  }
 */
export const storageGet = <ReturnValue,>(key: string): Promise<ReturnValue> => {
  return new Promise<ReturnValue>((resolve, reject) => {
    chrome.storage.sync.get([key], (data: ReturnValue) => {
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      if(Object.keys(data).length === 0) {
        reject("data is not exist!")
      }
      console.log("storage GEt", data)
      resolve(data)

      
    })
  })
} 

const shortcutGetByName = createAsyncThunk<
  Bookmark, string, {
    rejectValue: string
  }
>('shortcut/getbyname', async (name: string, {rejectWithValue}) => {
  try {
    const shortcut = await storageGet<Bookmark>(name) 
    return shortcut as Bookmark
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export default shortcutGetByName