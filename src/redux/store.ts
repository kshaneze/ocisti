import { configureStore } from '@reduxjs/toolkit'
import usersReducers from './usersSlice'
import loadersReducers from './loadersSlice'

const store = configureStore({
  reducer: {
    users: usersReducers,
    loaders: loadersReducers,
  },
})

export default store
