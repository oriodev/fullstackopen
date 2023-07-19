import blogService from '../services/blogs'

const refreshDisplay = (setBlogs) => {
  blogService.getAll().then(blogs =>
    setBlogs( blogs ),
  )  
}

export default refreshDisplay