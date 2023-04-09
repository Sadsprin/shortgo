import { createSlice } from "@reduxjs/toolkit"
import { Bookmark } from "../type/type"
import { _fetchAllShortcut } from "./thunk/getall"
import shortcutGetByName from "./thunk/getbyid"
import shortcutSet from "./thunk/set"
import storageRemove from "./thunk/remove"

export interface keyToBookmark {
  [key: string]: Bookmark
}

export interface shortcutInitialState {
  isFetchAllLoading: boolean
  isFetchAllError: null | string,
  isGetByIdLoading: boolean
  isGetByIdError: null | string,
  isSetLoading: boolean
  isSetError: null | string,
  isRemoveLoading: boolean
  isRemoveError: null | string,
  data: keyToBookmark 
}

const initialState: shortcutInitialState = {
  isFetchAllLoading: false,
  isFetchAllError: null,
  isGetByIdLoading: false,
  isGetByIdError: null,
  isSetLoading: false,
  isSetError: null,
  isRemoveLoading: false,
  isRemoveError: null,
  data: {}
}

const shortcutSlice = createSlice({
  name: 'shortcut',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchAllShortcut.pending, (state) => {
        state.isFetchAllLoading = true
        state.isFetchAllError = null
      })
      .addCase(_fetchAllShortcut.fulfilled, (state, action) => {
        state.isFetchAllLoading = false
        state.data = action.payload
      })
      .addCase(_fetchAllShortcut.rejected, (state, action) => {
        state.isFetchAllError = action.payload || "Error Caused!"
      })
      .addCase(shortcutGetByName.pending, (state) => {
        state.isGetByIdLoading = true,
        state.isGetByIdError = null
      })
      .addCase(shortcutGetByName.fulfilled, (state, action) => {
        state.isGetByIdLoading = false,
        state.data[action.payload.shortcut] = action.payload
      })
      .addCase(shortcutGetByName.rejected, (state, action) => {
        state.isGetByIdError = action.payload || "Error Caused!"
      })
      .addCase(shortcutSet.pending, (state) => {
        state.isSetLoading = true,
        state.isSetError = null
      })
      .addCase(shortcutSet.fulfilled, (state, action) => {
        state.isSetLoading = false,
        state.data[action.payload.shortcut] = action.payload
      })
      .addCase(shortcutSet.rejected, (state, action) => {
        state.isSetError = action.payload || "Error Caused!"
      })
      .addCase(storageRemove.pending, (state) => {
        state.isRemoveLoading = true,
        state.isRemoveError = null
      })
      .addCase(storageRemove.fulfilled, (state, action) => {
        state.isRemoveLoading = false,
        state.data = Object.fromEntries(Object.entries(state.data).filter(([shortcut]) => shortcut !== action.payload))
      })
      .addCase(storageRemove.rejected, (state, action) => {
        state.isSetError = action.payload || "Error Caused!"
      })
  },
  

})

export default shortcutSlice.reducer
