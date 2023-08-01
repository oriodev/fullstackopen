import { createSlice } from '@reduxjs/toolkit'

const initialState = 'THERE IS A FIRE GROOVE IT UP'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      console.log(initialState)
      return initialState
    }
  }
}) 

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer