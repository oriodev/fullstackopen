import { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
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
    console.log('update likes', )

      const updatedBlog = ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })
      
      props.updateBlog(updatedBlog, blog.id)
    }


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