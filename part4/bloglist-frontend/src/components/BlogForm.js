import { useState } from 'react'
import blogService from '../services/blogs'
import refreshDisplay from '../utilities/refreshDisplay'

const BlogForm = ({ setBlogs, blogs, setBlogVisible, setErrorMessage }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setnewURL] = useState('')

  // handles changes in the form

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setnewURL(event.target.value)
  }

  // handles adding a new blog

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    try {

      await blogService
        .create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setnewURL('')
        })


      setBlogVisible(false)

      refreshDisplay(setBlogs)

      setErrorMessage('blog added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch(error) {
      console.log('error', error)
      setErrorMessage('blog could not be added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (

    <form onSubmit={addBlog}>
      <h2>add new blog</h2>
      <p>
        <label>title: </label> <input value={newTitle} onChange={handleTitleChange}/>
      </p>
      <p>
        <label>author: </label> <input value={newAuthor} onChange={handleAuthorChange}/>
      </p>
      <p>
        <label>url: </label> <input value={newURL} onChange={handleURLChange}/>
      </p>

      <button type="submit">add</button>
    </form>

  )
}

export default BlogForm