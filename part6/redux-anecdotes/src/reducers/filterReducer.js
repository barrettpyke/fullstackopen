import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      return state = filter
    }
  }
})

export const { filterChange } = filtersSlice.actions
export default filtersSlice.reducer