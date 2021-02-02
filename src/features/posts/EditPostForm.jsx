import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated } from './PostsSlice'

const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onSaveEditClicked = () => {
    if ((title, content)) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Form</h2>
      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="enter a title"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postContent">Post title:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          placeholder="enter content"
          value={content}
          onChange={onContentChanged}
        />
      </form>

      <button onClick={onSaveEditClicked}>save edit</button>
    </section>
  )
}

export default EditPostForm
