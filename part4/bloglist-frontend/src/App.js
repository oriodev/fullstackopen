import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import loginForm from './components/loginForm'
import logoutBtn from './components/logoutBtn'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  // set useState variables
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setnewURL] = useState('')
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // get all initial blogs and set them to useState variable
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // keeps a user logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // display all the blogs
  const blogDisplay = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  // creates the blog form

  const blogForm = () => (
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

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    blogService
    .create(newBlog)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setnewURL('')
    })

    setErrorMessage('blog added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  // handles login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage('logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch(exception) {
      setUsername('')
      setPassword('')
      setErrorMessage('failed to login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)    
    }

  }

  // handles logout

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setErrorMessage('logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  // creates the main page
  return (

    <div>

      <Notification message={errorMessage} />

      {/* displays login form */}

      {!user && loginForm(handleLogin, username, setUsername, password, setPassword)} 

      {user && <div>
          <p>{user.name} logged in </p> {logoutBtn(logout)}
          {blogForm()}
          {blogDisplay()}
        </div>
      }

    </div>
  
   )
}

export default App