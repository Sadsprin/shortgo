import { createAsyncThunk } from "@reduxjs/toolkit";
import { Bookmark } from "../../type/type";


// const removeShortcut = async (shortcut: string): Promise<void> => {
//     try {
//       await chrome.storage.sync.remove(shortcut)
//     } catch (err) {
//       throw err
//     }
// }
const removeShortcut = (shortcut: string): Promise<string> => new Promise((resolve, reject) => {
    chrome.storage.sync.remove(shortcut, () => {
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      resolve(shortcut)
    })
  })


const storageRemove = createAsyncThunk<
  string, 
  string, {
    rejectValue: string
  }
> ('shortcut/remove', async (shortcut: string, {rejectWithValue}) => {
    try {
      await removeShortcut(shortcut)
      return shortcut 
    } catch(err) {
      return rejectWithValue(err.message as string) 
    }
})

export default storageRemove



