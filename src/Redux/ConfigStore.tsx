import {configureStore} from '@reduxjs/toolkit'
import CourseReducer from './Reducers/CourseReducer'
import UserReducer from './Reducers/UserReducer'

export const store = configureStore({
    reducer:{
        CourseReducer,
        UserReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;



