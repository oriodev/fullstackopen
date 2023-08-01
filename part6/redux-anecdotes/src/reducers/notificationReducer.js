import { createSlice } from '@reduxjs/toolkit'

const initialState = 'THERE IS A FIRE GROOVE IT UP'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      console.log(initialState)
      return initialState
    },
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
}) 

export const { notify, setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer