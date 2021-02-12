import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../posts/PostsSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  //Only when there is data and the status is idle, the button can be clicked
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClick = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        unwrapResult(resultAction)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.log('fail to save the post', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postAuthor">Author: </label>
        <select
          id="postAuthor"
          value={userId}
          name="postAuthor"
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Post content: </label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          rows="10"
          onChange={onContentChange}
          value={content}
        />

        <button type="button" onClick={onSavePostClick} disabled={!canSave}>
          save post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
