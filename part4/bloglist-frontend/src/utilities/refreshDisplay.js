import blogService from '../services/blogs'

const refreshDisplay = async (setBlogs) => {
  const blogs = await blogService.getAll()
  
  blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
  setBlogs( blogs )

}

export default refreshDisplay