import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  console.log(posts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <PostAuthor userId={post.user} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        view post
      </Link>
    </article>
  ))
  return (
    <section>
      <h1>Posts Page</h1>
      {renderedPosts}
    </section>
  )
}

export default PostsList
