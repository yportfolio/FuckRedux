import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns/esm'

const initialState = [
  {
    id: '1',
    title: 'first post',
    content: 'fuck redux',
    user: 0,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'second post',
    content: 'fuck redux again',
    user: 1,
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '3',
    title: 'third post',
    content: 'fuck redux again and again',
    user: 2,
    date: sub(new Date(), { minutes: 1 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
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
            //action payload is divided into two section:
            //1.default payload
            //2.user defined payload, added by dispatch func at where the action happen.
            title,
            content,
            user: Number(userId),
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
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
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export default postsSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
