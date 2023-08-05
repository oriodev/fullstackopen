import { createSlice } from '@reduxjs/toolkit'

const initialState = 'THERE IS A FIRE GROOVE IT UP'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      console.log(action.payload)
      return action.payload
    },

    removeNotification(state, action) {
      return ''
    }
  }
}) 

export const { notify, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notify(content))

    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)

  }
}

export default notificationSlice.reducer