import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { selectPostById } from './PostsSlice'
import ReactionButtons from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
  //According to the route's postId, render the component
  //Step 1, go to the route, get the path
  //step 2, update the component according to the path of the route
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  } else {
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <PostAuthor userId={post.user} />
          <ReactionButtons post={post} />
          <Link className="button" to={`/editPost/${post.id}`}>
            edit
          </Link>
        </article>
      </section>
    )
  }
}
