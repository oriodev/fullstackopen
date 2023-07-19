import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import loginForm from './components/loginForm'
import logoutBtn from './components/logoutBtn'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import refreshDisplay from './utilities/refreshDisplay'

const App = () => {

  // set useState variables
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState('')
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogVisible, setBlogVisible] = useState('')

  // get all initial blogs and set them to useState variable
  useEffect(() => {
    refreshDisplay(setBlogs)
  }, [])

  // display all the blogs
  const blogDisplay = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}
      </div>
    )
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

  // keeps a user logged in

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // handles login visibility

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm 
              setBlogs={setBlogs}
              blogs={blogs}
              setBlogVisible={setBlogVisible}
              setErrorMessage={setErrorMessage}
            />
            <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // handle blog update

  const updateBlog = async (blogToUpdate, id) => {
    console.log(blogToUpdate)
    try {
      
      await blogService.update(id, blogToUpdate)

      refreshDisplay(setBlogs)

      setErrorMessage('updated blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch(error) {
      console.log('error')
      setErrorMessage('could not update blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

    // handle blog delete

    const deleteBlog = async (id) => {

      try {
        
        await blogService.remove(id)
  
        refreshDisplay(setBlogs)
  
        setErrorMessage('deleted blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  
      } catch(error) {
        setErrorMessage('could not delete blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
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