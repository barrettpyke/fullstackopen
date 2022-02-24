import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return state = `${content.notification}`
    },
  }
})

export const notificationCall = (object) => {
  return async dispatch => {
    dispatch(setNotification(object))
    let timeoutId
    let timeout = false
    if (!timeout) {
      timeoutId = setTimeout(() => dispatch(setNotification({ notification: '', timeout: 0 })), object.timeout * 1000)
    } else {
      clearTimeout(timeoutId)
      setTimeout(() => dispatch(setNotification({ notification: '', timeout: 0 })), object.timeout * 1000)
      timeout = true
    }
  }
}

export const { setNotification } = notificationsSlice.actions

export default notificationsSlice.reducer