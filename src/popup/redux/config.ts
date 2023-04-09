import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import shortcutSlice from './shortcut'


const store = configureStore({
  reducer: {
    shortcut: shortcutSlice
  }
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store