import {configureStore} from '@reduxjs/toolkit'
import CourseReducer from './Reducers/CourseReducer'

export const store = configureStore({
    reducer:{
        CourseReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;