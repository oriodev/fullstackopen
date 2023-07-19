import { useState, useEffect } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [viewBlogState, setViewBlogState] = useState('')
  const [deleteVisible, setDeleteVisible] = useState(true)

  useEffect(() => {
    const blogUser = blog.user.username.toString()
    const currentUser = props.user.username.toString()
  
    if (blogUser === currentUser) {
      setDeleteVisible(true)
    } else {
      setDeleteVisible(false)
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: viewBlogState ? '' : 'none'
  }

  const deleteBtnStyle = {
    display: deleteVisible ? '' : 'none'
  }

  const handleView = () => {
    setViewBlogState(!viewBlogState)
  }

  const updateLikes = async () => {

      const updatedBlog = ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })
      
      props.updateBlog(updatedBlog, blog.id)
  }

  const deleteBlog = async () => {
    props.deleteBlog(blog.id)
  }

  const deleteBtn = () => {

    return (
      <div style={deleteBtnStyle}>
        <button onClick={deleteBlog}>delete</button><br />
      </div>
    )
  }


  const FullBlogView = () => {
    return (
      <div style={blogStyle}> 
        {blog.url} <br />
        likes {blog.likes} <button onClick={updateLikes}>like</button> <br />
        {blog.user.name}<br />
        {deleteBtn()}
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