import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [viewBlogState, setViewBlogState] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: viewBlogState ? '' : 'none'
  }

  const handleView = () => {
    setViewBlogState(!viewBlogState)
  }

  const updateLikes = async () => {

    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes++,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.update(blog.id, changedBlog)

    // await blogService.update(blog.id, changedBlog)
 
  }

  // console.log('blog', blog.user.name)

  const FullBlogView = () => {
    return (
      <div style={blogStyle}> 
        {blog.url} <br />
        likes {blog.likes} <button onClick={updateLikes}>like</button> <br />
        {blog.user.name}<br />
      </div>
    )
  }

  return (
    <div>
      <b>{blog.title} by {blog.author}</b> <button onClick={handleView}>{viewBlogState === true ? 'hide' : 'view'}</button>
      <FullBlogView />
    </div>  
  )
}

export default Blog