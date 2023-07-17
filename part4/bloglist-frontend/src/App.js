import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import loginForm from './components/loginForm'
// import logoutBtn from './components/logoutBtn'

import blogService from './services/blogs'
import loginService from './services/login'
import logoutBtn from './components/logoutBtn'

const App = () => {

  // set useState variables
  const [blogs, setBlogs] = useState([])
  
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
      blogService.setToken(user.token)      
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

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)      
    }

  }

  // handles logout

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // creates the main page
  return (

    <div>

      {/* displays login form */}

      {!user && loginForm(handleLogin, username, setUsername, password, setPassword)} 

      {user && <div>
          <p>{user.name} logged in </p> {logoutBtn(logout)}
          {blogDisplay()}
        </div>
      }

    </div>
  
   )
}

export default App