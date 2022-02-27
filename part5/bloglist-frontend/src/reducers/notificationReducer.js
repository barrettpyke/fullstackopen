import { createSlice } from '@reduxjs/toolkit'

const initialState = {message: '', messageClass: ''}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload.message
      const messageClass = action.payload.messageClass
      return state = {message: `${message}`, messageClass: `${messageClass}`}
    }
  }
})

export const { setMessage } = notificationsSlice.actions
export default notificationsSlice.reducer