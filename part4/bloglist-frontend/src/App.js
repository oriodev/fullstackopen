import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import loginForm from './components/loginForm'

import blogService from './services/blogs'

const App = () => {

  // set useState variables
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // get all initial blogs and set them to useState variable
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    console.log('logging in with', username, password)
  }

  // creates the main page
  return (

    <div>

      {/* displays login form */}
      {loginForm(handleLogin, username, setUsername, password, setPassword)}

      {/* // displays the blogs */}
      {blogDisplay()}

    </div>
  
   )
}

export default App