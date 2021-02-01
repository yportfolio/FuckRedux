import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 0, name: 'Tina' },
  { id: 1, name: 'July' },
  { id: 2, name: 'Nancy' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
