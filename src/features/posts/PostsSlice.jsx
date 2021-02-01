import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '1',
    title: 'first post',
    content: 'fuck redux',
    user: 0,
  },
  {
    id: '2',
    title: 'second post',
    content: 'fuck redux again',
    user: 1,
  },
  {
    id: '3',
    title: 'third post',
    content: 'fuck redux again and again',
    user: 2,
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      //prepare goes first
      //then, reducer take the returned result of prepare as the second argument
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString,
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export default postsSlice.reducer
export const { postAdded, postUpdated } = postsSlice.actions
